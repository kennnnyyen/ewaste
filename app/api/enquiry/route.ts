import { NextResponse } from "next/server";
import { Resend, type Attachment } from "resend";

const MAX_REQUEST_BYTES = 4 * 1024 * 1024;
const MAX_IMAGES = 10;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 3 * 1024 * 1024;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+() .-]{6,30}$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const serviceLabels = {
  recycling: "Equipment recycling",
  quote: "Computer scrap quote",
  destruction: "Data destruction",
  mixed: "A mixed load / not sure",
} as const;
const imageExtensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type Service = keyof typeof serviceLabels;
type SupportedImageType = keyof typeof imageExtensions;

function text(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength + 1) : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );
}

function configuredValue(value: string | undefined) {
  return value?.trim() ?? "";
}

function isSupportedImageType(value: string): value is SupportedImageType {
  return value in imageExtensions;
}

function hasValidImageSignature(bytes: Uint8Array, type: SupportedImageType) {
  if (type === "image/jpeg") {
    return (
      bytes.length >= 4 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff &&
      bytes.at(-2) === 0xff &&
      bytes.at(-1) === 0xd9
    );
  }
  if (type === "image/png") {
    return (
      bytes.length >= 20 &&
      [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
        (value, index) => bytes[index] === value,
      ) &&
      String.fromCharCode(...bytes.slice(-8, -4)) === "IEND"
    );
  }
  const declaredSize = bytes.length >= 12
    ? new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(4, true)
    : -1;
  return (
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" &&
    declaredSize === bytes.length - 8
  );
}

function safeAttachmentName(name: string, index: number, type: SupportedImageType) {
  const baseName = name
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `recore-photo-${String(index + 1).padStart(2, "0")}-${baseName || "equipment"}.${imageExtensions[type]}`;
}

function validationError(message = "Please check the required fields.") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "same-site") {
    return NextResponse.json({ error: "Cross-site submissions are not accepted." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content type must be multipart/form-data." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: "The enquiry and images are too large to send." },
      { status: 413 },
    );
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) return validationError();

  const name = text(formData.get("name"), 80);
  const email = text(formData.get("email"), 254).toLowerCase();
  const phone = text(formData.get("phone"), 30);
  const company = text(formData.get("company"), 120);
  const location = text(formData.get("location"), 120);
  const message = text(formData.get("message"), 4000);
  const service = text(formData.get("service"), 40) as Service;
  const submissionId = text(formData.get("submissionId"), 36);
  const phoneDigits = phone.replace(/\D/g, "");

  if (
    !name ||
    name.length > 80 ||
    (!email && !phone) ||
    (email && (!emailPattern.test(email) || email.length > 254)) ||
    (phone && (!phonePattern.test(phone) || phone.length > 30 || phoneDigits.length < 6)) ||
    company.length > 120 ||
    !location ||
    location.length > 120 ||
    !message ||
    message.length > 4000 ||
    !(service in serviceLabels) ||
    !uuidPattern.test(submissionId)
  ) {
    return validationError();
  }

  // Quietly accept bot-filled submissions without creating email noise.
  if (text(formData.get("website"), 200)) {
    return NextResponse.json({ ok: true });
  }

  const images = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (images.length > MAX_IMAGES) {
    return validationError(`Choose no more than ${MAX_IMAGES} images.`);
  }

  const totalImageBytes = images.reduce((total, image) => total + image.size, 0);
  if (totalImageBytes > MAX_TOTAL_IMAGE_BYTES) {
    return validationError("Images must be 3 MB or less combined.");
  }

  const attachments: Attachment[] = [];
  for (const [index, image] of images.entries()) {
    if (!isSupportedImageType(image.type)) {
      return validationError("Only JPEG, PNG and WebP images are accepted.");
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return validationError(`${image.name || "An image"} is larger than 2 MB.`);
    }

    const content = Buffer.from(await image.arrayBuffer());
    if (!hasValidImageSignature(content, image.type)) {
      return validationError(`${image.name || "An image"} is not a valid image file.`);
    }
    attachments.push({
      content,
      filename: safeAttachmentName(image.name, index, image.type),
      contentType: image.type,
    });
  }

  const apiKey = configuredValue(process.env.RESEND_API_KEY);
  const from = configuredValue(process.env.RESEND_FROM_EMAIL);
  const to = configuredValue(process.env.RESEND_TO_EMAIL);
  if (!apiKey || !from || !emailPattern.test(to)) {
    console.error("Enquiry email is not configured", {
      hasApiKey: Boolean(apiKey),
      hasFrom: Boolean(from),
      hasValidRecipient: emailPattern.test(to),
    });
    return NextResponse.json(
      { error: "Online enquiry delivery is temporarily unavailable." },
      { status: 503 },
    );
  }

  const serviceLabel = serviceLabels[service];
  const companyLabel = company || "Not provided";
  const emailLabel = email || "Not provided";
  const phoneLabel = phone || "Not provided";
  const plainText = [
    "New Recore website enquiry",
    "",
    `Name: ${name}`,
    `Contact number: ${phoneLabel}`,
    `Contact email: ${emailLabel}`,
    `Business: ${companyLabel}`,
    `Service: ${serviceLabel}`,
    `Location: ${location}`,
    `Photos attached: ${attachments.length}`,
    "",
    "Equipment and approximate quantity:",
    message,
  ].join("\n");
  const html = `
    <h1>New Recore website enquiry</h1>
    <table cellpadding="6" cellspacing="0" role="presentation">
      <tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr>
      <tr><th align="left">Contact number</th><td>${escapeHtml(phoneLabel)}</td></tr>
      <tr><th align="left">Contact email</th><td>${escapeHtml(emailLabel)}</td></tr>
      <tr><th align="left">Business</th><td>${escapeHtml(companyLabel)}</td></tr>
      <tr><th align="left">Service</th><td>${escapeHtml(serviceLabel)}</td></tr>
      <tr><th align="left">Location</th><td>${escapeHtml(location)}</td></tr>
      <tr><th align="left">Photos attached</th><td>${attachments.length}</td></tr>
    </table>
    <h2>Equipment and approximate quantity</h2>
    <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
  `;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(
    {
      from,
      to,
      ...(email ? { replyTo: email } : {}),
      subject: `Recore enquiry: ${serviceLabel} — ${name.replace(/[\r\n]/g, " ")}`,
      text: plainText,
      html,
      attachments,
      tags: [{ name: "source", value: "website-enquiry" }],
    },
    {
      signal: AbortSignal.timeout(15_000),
      idempotencyKey: `website-enquiry/${submissionId}`,
    },
  );

  if (error || !data?.id) {
    console.error("Resend rejected an enquiry email", {
      name: error?.name ?? "missing_email_id",
      statusCode: error?.statusCode ?? null,
    });
    return NextResponse.json(
      { error: "We could not send your enquiry right now." },
      { status: error?.statusCode === 429 ? 429 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
