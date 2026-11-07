"use client";

import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { enquiryUrl } from "./recycling-content";

const MAX_IMAGES = 10;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 3 * 1024 * 1024;
const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

type FormStatus = "idle" | "sending" | "success" | "error";

function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formContactIsValid(form: HTMLFormElement) {
  const email = form.elements.namedItem("email") as HTMLInputElement;
  const phone = form.elements.namedItem("phone") as HTMLInputElement;
  const hasContact = Boolean(email.value.trim() || phone.value.trim());
  const hasValidPhone = phone.value.replace(/\D/g, "").length >= 6;
  phone.setCustomValidity(!hasContact
    ? "Enter a contact number or an email address."
    : phone.value.trim() && !hasValidPhone
      ? "Enter a valid contact number."
      : "");
  return form.reportValidity();
}

export default function EnquiryComposer() {
  const formRef = useRef<HTMLFormElement>(null);
  const submissionIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const previewUrls = useMemo(
    () => images.map((file) => URL.createObjectURL(file)),
    [images],
  );

  useEffect(
    () => () => previewUrls.forEach((url) => URL.revokeObjectURL(url)),
    [previewUrls],
  );

  function addImages(files: File[]) {
    const uniqueFiles = [...images];
    for (const file of files) {
      const duplicate = uniqueFiles.some(
        (candidate) =>
          candidate.name === file.name &&
          candidate.size === file.size &&
          candidate.lastModified === file.lastModified,
      );
      if (!duplicate) uniqueFiles.push(file);
    }

    if (uniqueFiles.length > MAX_IMAGES) {
      setFileError(`Choose no more than ${MAX_IMAGES} images.`);
      return;
    }

    const invalidType = uniqueFiles.find(
      (file) => !acceptedImageTypes.has(file.type),
    );
    if (invalidType) {
      setFileError(
        `${invalidType.name} is not supported. Use JPEG, PNG or WebP images.`,
      );
      return;
    }

    const oversized = uniqueFiles.find((file) => file.size > MAX_IMAGE_BYTES);
    if (oversized) {
      setFileError(`${oversized.name} is larger than 2 MB.`);
      return;
    }

    const totalBytes = uniqueFiles.reduce((total, file) => total + file.size, 0);
    if (totalBytes > MAX_TOTAL_IMAGE_BYTES) {
      setFileError("The selected images are larger than 3 MB combined.");
      return;
    }

    setFileError("");
    setImages(uniqueFiles);
  }

  function chooseImages(event: ChangeEvent<HTMLInputElement>) {
    addImages(Array.from(event.currentTarget.files ?? []));
    event.currentTarget.value = "";
  }

  function dropImages(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    addImages(Array.from(event.dataTransfer.files));
  }

  function removeImage(index: number) {
    setImages((current) => current.filter((_, position) => position !== index));
    setFileError("");
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!formContactIsValid(form) || fileError) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const formData = new FormData(form);
      submissionIdRef.current ??= crypto.randomUUID();
      formData.set("submissionId", submissionIdRef.current);
      formData.delete("images");
      for (const image of images) formData.append("images", image);

      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error || "We could not send your enquiry.");
      }

      form.reset();
      setImages([]);
      submissionIdRef.current = null;
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry.",
      );
      setStatus("error");
    }
  }

  function continueInWhatsApp() {
    const form = formRef.current;
    if (!form || !formContactIsValid(form) || fileError) return;

    const values = new FormData(form);
    const serviceSelect = form.elements.namedItem("service") as HTMLSelectElement;
    const contact = [
      String(values.get("phone") ?? "").trim(),
      String(values.get("email") ?? "").trim(),
    ]
      .filter(Boolean)
      .join(" / ");
    const photoNote = images.length
      ? `\nPhotos: I have ${images.length} image${images.length === 1 ? "" : "s"} ready to attach in WhatsApp.`
      : "";
    const message = [
      "Hi Recore, I'd like to make an enquiry.",
      `Name: ${String(values.get("name") ?? "").trim()}`,
      `Contact: ${contact}`,
      `Business: ${String(values.get("company") ?? "").trim() || "Not provided"}`,
      `Service: ${serviceSelect.options[serviceSelect.selectedIndex]?.text ?? "Not sure"}`,
      `Location: ${String(values.get("location") ?? "").trim()}`,
      `Equipment and quantity: ${String(values.get("message") ?? "").trim()}${photoNote}`,
    ].join("\n");

    window.open(enquiryUrl(message), "_blank", "noopener,noreferrer");
  }

  const totalImageBytes = images.reduce((total, file) => total + file.size, 0);

  return (
    <form className="enquiry-form" onSubmit={submitEnquiry} ref={formRef}>
      <div className="enquiry-heading">
        <span>RECOVERY INTAKE / 01</span>
        <strong>{images.length ? `${images.length} PHOTO${images.length === 1 ? "" : "S"} READY` : "READY FOR DETAILS"}</strong>
      </div>
      <h3>Show us what needs a next step.</h3>
      <p>
        Add the basics and, if useful, a few clear photos. Choose email to send
        everything together or continue the conversation in WhatsApp.
      </p>

      <div className="enquiry-field-grid">
        <div>
          <label htmlFor="name">Contact name</label>
          <input
            id="name"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="company">Business (optional)</label>
          <input
            id="company"
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Company name"
          />
        </div>
      </div>

      <fieldset className="contact-methods">
        <legend>How can we contact you? <span>Provide at least one</span></legend>
        <div className="enquiry-field-grid">
          <div>
            <label htmlFor="phone">Contact number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              maxLength={30}
              autoComplete="tel"
              pattern="[0-9+() .-]{6,30}"
              placeholder="04xx xxx xxx"
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </div>
          <div>
            <label htmlFor="email">Contact email</label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={254}
              autoComplete="email"
              placeholder="you@company.com"
              onInput={(event) => {
                const phone = event.currentTarget.form?.elements.namedItem(
                  "phone",
                ) as HTMLInputElement | null;
                phone?.setCustomValidity("");
              }}
            />
          </div>
        </div>
      </fieldset>

      <div className="enquiry-field-grid enquiry-field-grid-lower">
        <div>
          <label htmlFor="service">What can we help with?</label>
          <select id="service" name="service" defaultValue="recycling">
            <option value="recycling">Equipment recycling</option>
            <option value="quote">Computer scrap quote</option>
            <option value="destruction">Data destruction</option>
            <option value="mixed">A mixed load / not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="location">Suburb or postcode</label>
          <input
            id="location"
            name="location"
            required
            maxLength={120}
            autoComplete="address-level2"
            placeholder="Where is the equipment?"
          />
        </div>
      </div>

      <label htmlFor="message">Equipment &amp; approximate quantity</label>
      <textarea
        id="message"
        name="message"
        required
        maxLength={4000}
        placeholder="For example: 12 desktop PCs, 3 printers and a box of cables…"
      />

      <div className="photo-field">
        <div className="photo-field-heading">
          <label htmlFor="images">Equipment photos (optional)</label>
          <span>{images.length}/{MAX_IMAGES} · {formatBytes(totalImageBytes)} / 3 MB</span>
        </div>
        <label
          className="upload-zone"
          htmlFor="images"
          onDragOver={(event) => event.preventDefault()}
          onDrop={dropImages}
        >
          <input
            className="upload-input"
            id="images"
            name="images"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            multiple
            onChange={chooseImages}
            aria-describedby="image-rules image-error"
          />
          <span className="upload-icon" aria-hidden="true">＋</span>
          <strong>Choose or drop equipment photos</strong>
          <small id="image-rules">
            JPEG, PNG or WebP · up to 10 · 2 MB each · 3 MB combined
          </small>
        </label>
        {fileError && (
          <p className="file-error" id="image-error" role="alert">
            {fileError}
          </p>
        )}
        {images.length > 0 && (
          <div className="photo-preview-grid" aria-label="Selected equipment photos">
            {images.map((file, index) => (
              <div className="photo-preview" key={`${file.name}-${file.lastModified}`}>
                {/* Browser-local preview only; the original file is submitted. */}
                <Image
                  src={previewUrls[index]}
                  alt=""
                  width={48}
                  height={42}
                  unoptimized
                />
                <div>
                  <span title={file.name}>{file.name}</span>
                  <small>{formatBytes(file.size)}</small>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="enquiry-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="submission-channels">
        <button
          className="button email-submit"
          type="submit"
          disabled={status === "sending"}
        >
          <span className="channel-label">EMAIL ENQUIRY</span>
          {status === "sending" ? "Sending…" : "Send details & photos"}
          <span aria-hidden="true">↗</span>
        </button>
        <button
          className="button whatsapp-submit"
          type="button"
          onClick={continueInWhatsApp}
          disabled={status === "sending"}
        >
          <span className="channel-label">WHATSAPP</span>
          Continue in WhatsApp
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <small className="submission-note">
        Email sends selected photos securely with the enquiry. WhatsApp opens a
        prepared message; attach the selected photos again inside WhatsApp.
        Please do not include passwords, personal records or sensitive data.
      </small>

      {status === "success" && (
        <p className="enquiry-status success" role="status">
          Thanks — your email enquiry has been sent. Recore will be in touch.
        </p>
      )}
      {status === "error" && (
        <p className="enquiry-status error" role="alert">
          {errorMessage} Please try again or use WhatsApp.
        </p>
      )}
    </form>
  );
}
