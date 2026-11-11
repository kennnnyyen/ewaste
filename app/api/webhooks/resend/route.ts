import { Resend } from "resend";
import PostalMime from "postal-mime";

export const maxDuration = 60;

const inbox = "info@recore-cycle.com";
const loopHeader = "x-recore-forwarded";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  const recipient = process.env.RECORE_FORWARD_TO_EMAIL?.trim();

  if (!apiKey || !webhookSecret || !recipient || !/^[^\s@<>]+@gmail\.com$/i.test(recipient)) {
    return Response.json({ error: "Email forwarding is not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  let event;
  try {
    event = resend.webhooks.verify({
      payload: await request.text(),
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret,
    });
  } catch {
    return Response.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type !== "email.received") return new Response(null, { status: 204 });
  if (!event.data || typeof event.data.email_id !== "string") {
    return Response.json({ error: "Invalid received email event" }, { status: 400 });
  }

  try {
    const signal = AbortSignal.timeout(35_000);
    const received = await resend.emails.receiving.get(event.data.email_id, {}, { signal });
    if (received.error || !received.data) throw new Error("Received email unavailable");
    const email = received.data;

    // Prefer envelope recipients so a forged To header cannot select this inbox.
    const recipients = email.received_for?.length ? email.received_for : email.to;
    if (!recipients.some((address) => address.trim().toLowerCase() === inbox)) {
      return new Response(null, { status: 204 });
    }

    const downloadUrl = email.raw?.download_url;
    if (!downloadUrl || new URL(downloadUrl).protocol !== "https:") {
      throw new Error("Original email unavailable");
    }
    const raw = await fetch(downloadUrl, { signal });
    if (!raw.ok) throw new Error("Original email download failed");
    const parsed = await PostalMime.parse(await raw.arrayBuffer(), { attachmentEncoding: "base64" });
    if (parsed.headers.some((header) => header.key.toLowerCase() === loopHeader)) {
      return new Response(null, { status: 204 });
    }

    const replyTo = parsed.replyTo?.flatMap((address) => address.address ? [address.address] : []);
    const result = await resend.emails.send({
      from: `Recore enquiries <${inbox}>`,
      to: recipient,
      replyTo: replyTo?.length ? replyTo : parsed.from?.address,
      subject: email.subject || "(no subject)",
      text: parsed.text || "",
      html: parsed.html || undefined,
      headers: { "X-Recore-Forwarded": "1" },
      attachments: parsed.attachments.map((attachment) => ({
        filename: attachment.filename || "attachment",
        content: attachment.content as string,
        contentType: attachment.mimeType,
        contentId: attachment.contentId?.replace(/^<|>$/g, ""),
      })),
    }, {
      // Resend retains idempotency keys for 24 hours, covering normal webhook retries.
      idempotencyKey: `recore-forward/${email.id}`,
      signal,
    });

    if (result.error || !result.data?.id) throw new Error("Forwarding was not accepted");
    return new Response(null, { status: 204 });
  } catch {
    // A failed delivery stays retryable without exposing message content or credentials.
    console.error("Recore inbound email forwarding failed", { emailId: event.data.email_id });
    return Response.json({ error: "Email forwarding failed" }, { status: 502 });
  }
}
