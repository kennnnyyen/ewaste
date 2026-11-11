import assert from "node:assert/strict";
import { test, mock } from "node:test";
import nodemailer from "nodemailer";
import { gmailConfiguration, sendEnquiry } from "../app/enquiry-delivery.ts";

test("Gmail configuration requires sender, credential and recipient", () => {
  assert.equal(gmailConfiguration({}), null);
  assert.equal(gmailConfiguration({ GMAIL_USER: "invalid", GMAIL_APP_PASSWORD: "secret", ENQUIRY_TO_EMAIL: "test@example.com" }), null);
  assert.equal(gmailConfiguration({ GMAIL_USER: "sender@gmail.com", GMAIL_APP_PASSWORD: "secret" }), null);
  assert.deepEqual(gmailConfiguration({
    GMAIL_USER: " sender@gmail.com ",
    GMAIL_APP_PASSWORD: " abcd efgh ijkl mnop ",
    ENQUIRY_TO_EMAIL: " receiver@gmail.com ",
  }), { user: "sender@gmail.com", password: "abcdefghijklmnop", recipient: "receiver@gmail.com" });
});

const config = { user: "sender@gmail.com", password: "test-only", recipient: "receiver@gmail.com" };

test("SMTP sends to the server-configured receiver and preserves replies and photos", async () => {
  let options;
  let sent;
  let closed = false;
  const stub = mock.method(nodemailer, "createTransport", (value) => {
    options = value;
    return {
      sendMail: async (message) => { sent = message; return { accepted: [config.recipient] }; },
      close: () => { closed = true; },
    };
  });
  try {
    const attachments = [{ filename: "equipment.png", content: Buffer.from("fixture") }];
    await sendEnquiry(config, { replyTo: "customer@example.com", subject: "Enquiry", text: "Details", attachments });
    assert.equal(options.host, "smtp.gmail.com");
    assert.equal(options.secure, true);
    assert.equal(options.port, 465);
    assert.equal(options.pool, false);
    assert.equal(options.disableFileAccess, true);
    assert.equal(options.disableUrlAccess, true);
    assert.ok(options.socketTimeout <= 20_000);
    assert.equal(sent.to, config.recipient);
    assert.equal(sent.from.address, config.user);
    assert.equal(sent.replyTo, "customer@example.com");
    assert.equal(sent.attachments, attachments);
    assert.equal(closed, true);
  } finally { stub.mock.restore(); }
});

for (const scenario of ["authentication failure", "timeout", "rejected recipient"]) {
  test(`SMTP propagates ${scenario} and closes the transport`, async () => {
    let closed = false;
    const stub = mock.method(nodemailer, "createTransport", () => ({
      sendMail: async () => {
        if (scenario === "rejected recipient") return { accepted: [] };
        throw Object.assign(new Error(scenario), { code: scenario === "timeout" ? "ETIMEDOUT" : "EAUTH" });
      },
      close: () => { closed = true; },
    }));
    try {
      await assert.rejects(sendEnquiry(config, { text: "Test" }));
      assert.equal(closed, true);
    } finally { stub.mock.restore(); }
  });
}
