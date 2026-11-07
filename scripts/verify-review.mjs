import assert from "node:assert/strict";

const base = process.env.REVIEW_BASE_URL ?? "http://127.0.0.1:3107";
const home = await fetch(base);
assert.equal(home.status, 200, "Homepage responds");
const html = await home.text();
assert.match(html, /<form[^>]+class="enquiry-form"/, "Online enquiry form rendered");
assert.match(html, /name="email"/, "Enquiry form collects a reply email");
assert.match(html, /name="phone"/, "Enquiry form collects a contact number");
assert.match(html, /id="images"[^>]+multiple/, "Enquiry form accepts multiple images");
assert.match(html, /Continue in WhatsApp/, "Enquiry form offers WhatsApp submission");
const categories = [
  ...new Set(
    [...html.matchAll(/href="(\/recycling\/[a-z-]+)"/g)].map(
      (match) => match[1],
    ),
  ),
];
assert.equal(categories.length, 8, "Eight crawlable recycling category links");

const titles = new Set();
for (const path of ["/", ...categories]) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  const page = await response.text();
  assert.equal([...page.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: one H1`);
  const title = page.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.match(
    page,
    /<meta name="description" content="[^"]+"/,
    `${path}: description`,
  );
  assert.doesNotMatch(
    page,
    /hello@example\.com|\+61 00 0000|Service area to be confirmed/,
  );
  const schemas = [
    ...page.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.length, `${path}: valid structured data`);
}

for (const path of [
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/opengraph-image",
  "/recycling-equipment-hero.webp",
]) {
  assert.equal(
    (await fetch(`${base}${path}`)).status,
    200,
    `${path}: HTTP 200`,
  );
}
assert.equal(
  (await fetch(`${base}/recycling/unknown-category`)).status,
  404,
  "Unknown category returns 404",
);
const invalid = await fetch(`${base}/api/enquiry`, {
  method: "POST",
  body: new FormData(),
});
assert.equal(invalid.status, 400, "Invalid form payload rejected");

const fakeImagePayload = new FormData();
fakeImagePayload.set("name", "Review test");
fakeImagePayload.set("submissionId", crypto.randomUUID());
fakeImagePayload.set("phone", "0400 000 000");
fakeImagePayload.set("service", "recycling");
fakeImagePayload.set("location", "Melbourne");
fakeImagePayload.set("message", "Local image validation check");
fakeImagePayload.set(
  "images",
  new File(["not an image"], "fake.jpg", { type: "image/jpeg" }),
);
const fakeImage = await fetch(`${base}/api/enquiry`, {
  method: "POST",
  body: fakeImagePayload,
});
assert.equal(fakeImage.status, 400, "Image content signature is validated");

const undeliveredPayload = new FormData();
undeliveredPayload.set("name", "Review test");
undeliveredPayload.set("submissionId", crypto.randomUUID());
undeliveredPayload.set("email", "review@example.com");
undeliveredPayload.set("service", "recycling");
undeliveredPayload.set("location", "Melbourne");
undeliveredPayload.set("message", "Local delivery-boundary check");
const undelivered = await fetch(`${base}/api/enquiry`, {
  method: "POST",
  body: undeliveredPayload,
});
assert.equal(
  undelivered.status,
  503,
  "Unconfigured Resend delivery never reports success",
);
console.log(
  `Verified ${titles.size} content pages, dual-channel enquiry form, image signature checks, crawl/social/image endpoints, category 404 and unconfigured delivery handling.`,
);
