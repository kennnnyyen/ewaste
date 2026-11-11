import nodemailer, { type SendMailOptions } from "nodemailer";

export function gmailConfiguration(env: NodeJS.ProcessEnv, recipient = env.ENQUIRY_TO_EMAIL?.trim() ?? "") {
  const user = env.GMAIL_USER?.trim() ?? "";
  const password = env.GMAIL_APP_PASSWORD?.replace(/\s/g, "") ?? "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(user) || !password || !emailPattern.test(recipient)) {
    return null;
  }
  return { user, password, recipient };
}

export async function sendEnquiry(
  config: NonNullable<ReturnType<typeof gmailConfiguration>>,
  message: Pick<SendMailOptions, "replyTo" | "subject" | "text" | "html" | "attachments" | "messageId">,
) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: config.user, pass: config.password },
    pool: false,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    dnsTimeout: 10_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      ...message,
      from: { name: "Recore website", address: config.user },
      to: config.recipient,
    });
    if (!result.accepted.some((address) =>
      address.toLowerCase() === config.recipient.toLowerCase(),
    )) {
      throw new Error("Enquiry recipient was not accepted by SMTP");
    }
  } finally {
    transport.close();
  }
}
