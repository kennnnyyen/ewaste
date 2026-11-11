import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, beforeEach, mock, test } from "node:test";
import { POST } from "../app/api/webhooks/resend/route.ts";

const secret = Buffer.from("recore-webhook-test-secret").toString("base64");
const envNames = ["RESEND_API_KEY", "RESEND_WEBHOOK_SECRET", "RECORE_FORWARD_TO_EMAIL"];
let previousEnv;
beforeEach(() => {
  previousEnv = envNames.map((name) => process.env[name]);
  process.env.RESEND_API_KEY = "re_test_only";
  process.env.RESEND_WEBHOOK_SECRET = `whsec_${secret}`;
  process.env.RECORE_FORWARD_TO_EMAIL = "sales.recore@gmail.com";
});
afterEach(() => {
  mock.restoreAll();
  envNames.forEach((name, index) => {
    if (previousEnv[index] === undefined) delete process.env[name];
    else process.env[name] = previousEnv[index];
  });
});

function request(type = "email.received", valid = true) {
  const payload = JSON.stringify({ type, data: { email_id: "incoming-123" } });
  const id = "msg_test";
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac("sha256", Buffer.from(secret, "base64"))
    .update(`${id}.${timestamp}.${payload}`).digest("base64");
  return new Request("https://example.com/api/webhooks/resend", {
    method: "POST",
    headers: {
      "svix-id": id,
      "svix-timestamp": timestamp,
      "svix-signature": `v1,${valid ? signature : "invalid"}`,
    },
    body: payload,
  });
}

const rawEmail = [
  "From: Customer <customer@example.com>",
  "To: info@recore-cycle.com",
  "Reply-To: enquiries@example.com",
  "Subject: Equipment collection",
  "MIME-Version: 1.0",
  'Content-Type: multipart/related; boundary="parts"',
  "", "--parts", 'Content-Type: text/html; charset="utf-8"', "",
  '<p>Equipment photo <img src="cid:photo1"></p>',
  "--parts", "Content-Type: image/png", "Content-Transfer-Encoding: base64",
  'Content-Disposition: inline; filename="photo.png"', "Content-ID: <photo1>", "",
  Buffer.from("photo-fixture").toString("base64"), "--parts--", "",
].join("\r\n");

function provider({ envelope = ["info@recore-cycle.com"], raw = rawEmail, failSend = false } = {}) {
  const sends = [];
  const fetchMock = mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).includes("/emails/receiving/")) {
      return Response.json({
        id: "incoming-123", received_for: envelope, to: ["info@recore-cycle.com"],
        subject: "Equipment collection", raw: { download_url: "https://storage.example.com/message.eml" },
      });
    }
    if (String(url) === "https://storage.example.com/message.eml") return new Response(raw);
    assert.equal(String(url), "https://api.resend.com/emails");
    sends.push({ body: JSON.parse(options.body), headers: new Headers(options.headers) });
    return failSend
      ? Response.json({ name: "application_error", message: "Temporary failure" }, { status: 503 })
      : Response.json({ id: "forwarded-456" });
  });
  return { sends, fetchMock };
}

test("missing configuration fails closed", async () => {
  delete process.env.RESEND_WEBHOOK_SECRET;
  assert.equal((await POST(request())).status, 503);
});

test("invalid signatures cannot call the email API", async () => {
  const { fetchMock } = provider();
  assert.equal((await POST(request("email.received", false))).status, 400);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("unrelated signed events are acknowledged without forwarding", async () => {
  const { fetchMock } = provider();
  assert.equal((await POST(request("email.sent"))).status, 204);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("envelope recipients override a forged To header", async () => {
  const { sends } = provider({ envelope: ["other@recore-cycle.com"] });
  assert.equal((await POST(request())).status, 204);
  assert.equal(sends.length, 0);
});

test("forwarding preserves reply address, HTML and inline attachments with a stable retry key", async () => {
  const { sends } = provider();
  assert.equal((await POST(request())).status, 204);
  assert.equal((await POST(request())).status, 204);
  assert.equal(sends[0].body.to, "sales.recore@gmail.com");
  assert.equal(sends[0].body.from, "Recore enquiries <info@recore-cycle.com>");
  assert.deepEqual(sends[0].body.reply_to, ["enquiries@example.com"]);
  assert.equal(sends[0].body.subject, "Equipment collection");
  assert.match(sends[0].body.html, /cid:photo1/);
  assert.equal(sends[0].body.attachments[0].content_id, "photo1");
  assert.equal(sends[0].body.attachments[0].content, Buffer.from("photo-fixture").toString("base64"));
  assert.equal(sends[0].headers.get("idempotency-key"), "recore-forward/incoming-123");
  assert.equal(sends[1].headers.get("idempotency-key"), sends[0].headers.get("idempotency-key"));
});

test("sender becomes reply address when Reply-To is absent", async () => {
  const { sends } = provider({ raw: rawEmail.replace("Reply-To: enquiries@example.com\r\n", "") });
  assert.equal((await POST(request())).status, 204);
  assert.equal(sends[0].body.reply_to, "customer@example.com");
});

test("forwarded-message loops are acknowledged without sending", async () => {
  const { sends } = provider({ raw: `X-Recore-Forwarded: 1\r\n${rawEmail}` });
  assert.equal((await POST(request())).status, 204);
  assert.equal(sends.length, 0);
});

test("provider errors leave the webhook retryable without exposing provider details", async () => {
  provider({ failSend: true });
  mock.method(console, "error", () => {});
  const response = await POST(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "Email forwarding failed" });
});
