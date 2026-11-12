import assert from "node:assert/strict";

// Read-only checks: safe to run against a local preview or the public site.
const base = process.env.REVIEW_BASE_URL ?? "http://127.0.0.1:3107";
const origin = process.env.REVIEW_SITE_ORIGIN ?? "https://www.recore-cycle.com";
const pages = new Map();
async function read(path) {
  if (pages.has(path)) return pages.get(path);
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15_000) });
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  const html = await response.text();
  pages.set(path, html);
  return html;
}

const home = await read("/");
const categoryPaths = [...new Set([...home.matchAll(/href="(\/recycling\/[a-z-]+)"/g)].map((m) => m[1]))];
assert.equal(categoryPaths.length, 8, "Eight server-rendered guide links");
const dataDestructionPath = "/data-destruction";
assert.ok(home.includes(`href="${dataDestructionPath}"`), "Homepage links to data destruction");
const descriptions = new Set();
const titles = new Set();
for (const path of ["/", dataDestructionPath, ...categoryPaths]) {
  const html = await read(path);
  const canonical = path === "/" ? origin : `${origin}${path}`;
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${path}: canonical`);
  assert.ok(html.includes(`<meta property="og:url" content="${canonical}"`), `${path}: social URL`);
  assert.doesNotMatch(html, /(?:content|href)="https?:\/\/(?:localhost|127\.0\.0\.1)/, `${path}: no local metadata URLs`);
  assert.doesNotMatch(html, /(?:content|href)="https:\/\/ewaste-nine-kohl\.vercel\.app/, `${path}: no old deployment metadata URLs`);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/, `${path}: indexable`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: one H1`);
  for (const [pattern, values, label] of [
    [/<title>(.*?)<\/title>/s, titles, "title"],
    [/<meta name="description" content="([^"]+)"/, descriptions, "description"],
  ]) {
    const value = html.match(pattern)?.[1];
    assert.ok(value && !values.has(value), `${path}: unique ${label}`);
    values.add(value);
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
  const graph = schemas.flatMap((schema) => schema["@graph"] ?? [schema]);
  assert.ok(graph.some((node) => node["@type"] === "LocalBusiness" && node["@id"] === `${origin}/#organisation`), `${path}: consistent business identity`);
  const business = graph.find((node) => node["@type"] === "LocalBusiness");
  assert.equal(business.telephone, "+61406406016", `${path}: confirmed telephone`);
  assert.equal(business.email, "info@recore-cycle.com", `${path}: branded email`);
  assert.equal(business.contactPoint.email, "sales.recore@gmail.com", `${path}: alternative email`);
  assert.equal(business.address.streetAddress, "2 Price St", `${path}: confirmed street address`);
  assert.equal(business.address.addressLocality, "Oakleigh South", `${path}: confirmed locality`);
  const socialImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(socialImage?.startsWith(`${origin}/`), `${path}: public social image`);
  if (path === "/") {
    for (const address of ["info@recore-cycle.com", "sales.recore@gmail.com"]) {
      assert.ok(html.includes(`href="mailto:${address}"`), `${path}: visible email ${address}`);
    }
    assert.ok(html.includes("2 Price St, Oakleigh South"), `${path}: business address is visible`);
    assert.ok(html.includes("Recore | E-waste Recycling &amp; Data Destruction Melbourne"), "Local service title");
    assert.ok(html.includes("Where is Recore based?"), "Visible location FAQ");
    assert.ok(graph.some((node) => node["@type"] === "WebSite"), "Website identity");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, [...html.matchAll(/<details(?:\s|>)/g)].length, "FAQ markup matches visible question count");
    assert.match(html, /<a[^>]+href="#contact"[^>]*>\s*Send us a photo/, "Photo CTA goes to contact");
    assert.doesNotMatch(html, /<h1[^>]*>\s*<span class="sr-only">/, "Main topic is visible");
  } else if (path === dataDestructionPath) {
    assert.match(html, /<a[^>]+href="\/#contact"[^>]*>\s*Request a data destruction quote/, "Data destruction enquiry goes to contact");
    assert.ok(graph.some((node) => node["@type"] === "Service" && node.url === canonical), "Data destruction service points to its canonical URL");
    for (const method of ["Verified software erasure", "Physical destruction", "Degaussing for magnetic media"]) {
      assert.ok(html.includes(`<h3>${method}</h3>`), `Visible data destruction method: ${method}`);
    }
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList"), "Data destruction breadcrumbs");
  } else {
    assert.match(html, /<a[^>]+href="\/#contact"[^>]*>Ask about/, `${path}: enquiry goes to contact`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList"), `${path}: breadcrumbs`);
  }
  // Verify every rendered navigation and CTA destination, including cross-page anchors.
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)) {
    const href = match[1].replaceAll("&amp;", "&");
    const url = new URL(href, new URL(path, base));
    if (url.origin !== new URL(base).origin) {
      if (url.protocol === "tel:") {
        assert.equal(href, "tel:+61406406016", `${path}: confirmed phone link`);
      } else if (url.protocol === "mailto:") {
        assert.ok(["mailto:info@recore-cycle.com", "mailto:sales.recore@gmail.com"].includes(href), `${path}: confirmed email link`);
      } else if (url.hostname === "wa.me") {
        assert.equal(url.pathname, "/61406406016", `${path}: current messaging number`);
        assert.match(match[2], /WhatsApp|0406 406 016/, `${path}: external messaging action labelled`);
      } else if (["www.linkedin.com", "www.facebook.com", "www.instagram.com", "ypecycle.com.au"].includes(url.hostname)) {
        const expectedUrl = {
          "www.linkedin.com": "https://www.linkedin.com/company/recore-cycle",
          "www.facebook.com": "https://www.facebook.com/recorecycle/",
          "www.instagram.com": "https://www.instagram.com/recorecycle/",
          "ypecycle.com.au": "https://ypecycle.com.au/about-yp-1",
        }[url.hostname];
        assert.equal(url.href, expectedUrl, `${path}: official external link`);
        assert.match(match[0], /target="_blank"/, `${path}: external link opens in a new tab`);
      } else if (url.hostname === "csrc.nist.gov" && path === dataDestructionPath) {
        assert.equal(url.href, "https://csrc.nist.gov/pubs/sp/800/88/r2/final", "Current NIST media sanitisation guidance");
      } else {
        assert.equal(url.origin, "https://www.google.com", `${path}: known map destination`);
        assert.equal(url.pathname, "/maps/search/", `${path}: maps search link`);
        assert.equal(url.searchParams.get("query"), "2 Price St, Oakleigh South, VIC, Australia", `${path}: confirmed map address`);
      }
      continue;
    }
    const target = await read(url.pathname);
    if (url.hash) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `${path}: ${href} anchor exists`);
  }
}
const robots = await read("/robots.txt");
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "Robots advertises public sitemap");
const sitemap = await read("/sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const blogPaths = [...new Set([...home.matchAll(/href="(\/blogs\/[a-z-]+)"/g)].map((match) => match[1]))];
assert.ok(blogPaths.length >= 2, "Homepage links to the published articles");
assert.deepEqual(
  new Set(locations),
  new Set([origin, ...[dataDestructionPath, ...categoryPaths, "/blogs", ...blogPaths].map((path) => `${origin}${path}`)]),
  "Sitemap includes the blog and its articles",
);
for (const path of blogPaths) {
  const article = await read(path);
  assert.ok(article.includes(`rel="canonical" href="${origin}${path}"`), `${path}: canonical`);
  assert.ok(article.includes('"@type":"BlogPosting"'), `${path}: article structured data`);
}
const llms = await read("/llms.txt");
assert.ok(llms.includes(origin), "AI reference identifies the canonical site");
assert.ok(llms.includes("2 Price St, Oakleigh South"), "AI reference uses the visible business address");
for (const path of [dataDestructionPath, ...categoryPaths]) assert.ok(llms.includes(`${origin}${path}`), `${path}: absolute guide reference`);
assert.equal((await fetch(new URL("/recycling/unknown-category", base))).status, 404, "Unknown category is a real 404");
console.log(`Verified ${titles.size} pages: metadata, structured data, sitemap, all rendered navigation links and CTA anchors.`);
