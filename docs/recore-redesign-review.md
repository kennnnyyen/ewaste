# Recore redesign review

Status: local draft, not committed or deployed. Prepared 7 November 2026.

## Review

Run `npm run build`, then `npm start -- --hostname 127.0.0.1 --port 3107` and open http://127.0.0.1:3107/.

The redesign introduces a light ivory, deep navy and copper visual system, a responsive menu, an equipment/component filter, eight category guides and a WhatsApp enquiry composer. The page covers computers/laptops, printers/office IT, monitors, servers/networking, circuit boards, CPUs/RAM/GPUs, storage media, and cables/peripherals. Category acceptance and commercial terms remain subject to assessment.

Reference: https://www.theboardguy.com.au/ (retrieved 7 November 2026). The reference explicitly lists PCBs, CPUs, RAM, GPUs, hard drives and whole IT units including desktops, laptops, mobiles, servers and switches. Recore's supplied warehouse image shows desktops, all-in-one computers, printers and mixed IT equipment. This informed the expanded range; the reference business's prices, payment promises, address and coverage have not been copied. Firecrawl retrieval failed; direct source retrieval succeeded.

## SEO and generative-engine discoverability

- Dedicated, server-rendered content for eight categories, unique titles and descriptions, one H1 per page, related links and breadcrumbs.
- Organisation, Service and FAQPage JSON-LD using the same visible content. No unverified certification, address, ratings or service-area claims.
- Open Graph image and social metadata, robots.txt, sitemap.xml and llms.txt.
- Canonical URLs and sitemap entries activate when a verified HTTPS origin is set in `NEXT_PUBLIC_SITE_URL`. With no origin, sitemap.xml is intentionally empty. Local social-image URLs use the preview origin until configured.
- Provisional domain suggested by the user: `recore-cycle.com`. Ownership and final selection remain unconfirmed. Do not publish it as the canonical domain yet.
- These changes improve content clarity and machine readability. Search rankings, indexing and AI citations have not been measured. FAQ markup does not guarantee a search rich result; llms.txt does not guarantee AI discovery.

## Contact flow

The old form returned HTTP 202 without sending an email. The current form supports email and WhatsApp from the same enquiry details. Email submissions accept up to 10 JPEG, PNG or WebP equipment photos, limited to 2 MB each and 3 MB combined so the multipart request stays below Vercel's 4.5 MB Function request limit. The server validates MIME type, actual file signatures, count and size, sanitizes attachment names, and reports success only after Resend returns an email ID. WhatsApp receives a prepared text enquiry and asks the visitor to attach any selected photos again inside WhatsApp. The API key, verified-domain sender and business recipient remain server-only environment variables; when any are missing, the API returns HTTP 503 rather than falsely acknowledging receipt. A hidden honeypot reduces basic form spam. Confirm the business contact number, recipient address and verified sending domain before public launch.

## Native image generation

Built-in ChatGPT image generation was used; no API-key or third-party paid generation fallback was invoked. Billing/free entitlement is controlled by the ChatGPT account and was not independently verified.

Final web asset: `public/recycling-equipment-hero.webp` (1440 × 960; about 122 KB). The visible image caption is “Tomorrow, recovered.” The warehouse attachment informed product selection but its original file was not accessible in the workspace, so it has not been embedded or replaced with a fabricated warehouse photograph.

Final generation prompt:

> Create a premium editorial product photograph for Recore, an Australian electronics recycling business website. Landscape 3:2 composition. A carefully arranged selection of retired IT equipment on a warm off-white studio floor: two unbranded desktop computer towers, an aluminium all-in-one desktop monitor, a closed laptop, a compact laser printer, a network switch, coiled cables and a few circuit boards and RAM modules in the foreground. Realistic used but clean equipment, subtle natural signs of wear, accurate electronics geometry, soft daylight from upper left, refined architectural shadows, muted charcoal and aluminium with tiny copper and green circuit details. Elevated three-quarter view, equipment grouped centrally with breathing room around it. No people, no writing, no logos, no recycling symbols, no plants, no claims, no text. This is illustrative product artwork, not a photograph of Recore's actual premises.

## Verification and review items

Run `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build`, then `node scripts/verify-review.mjs` against the running preview.

Verification passed on Next.js 16.4.5: lint, TypeScript, production build, nine content-page HTTP/metadata checks, SEO/social/image endpoints, real HTTP 404 for an unknown category, and the API validation/unconfigured-delivery cases. Mobile checks at 390px confirmed menu opening, closing on navigation and the component filter changing from eight to three categories. Desktop and mobile screenshots are in `output/recore-review/`. The browser's DOM inspection API was unavailable, so visual and interaction checks used native browser controls. The verification environment runs Node 22.22.3; repeat the build on the declared Node 24.x runtime before deployment.

Before publication, confirm the final domain, business contact details, warehouse suburb/service area, accepted/restricted categories, service methods and handover terms. Confirm whether the original warehouse photo should appear publicly and provide it as a project file if so. The previous Next.js 16.4.5 security update is included in this uncommitted draft; its original committed branch is preserved.
