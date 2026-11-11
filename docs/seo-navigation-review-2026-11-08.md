# Recore SEO and navigation review

## 11 November 2026 follow-up

The public homepage and all eight recycling guides returned HTTP 200. Their
current production markup lacks canonical tags. The homepage also advertises
localhost social-image URLs. These corrections are included in the review draft.

The draft displays `info@recore-cycle.com` and `sales.recore@gmail.com` in Contact
Us and the shared footer. LocalBusiness structured data uses the branded address
and an alternative contact point, matching visible business information. The
machine-readable business summary also includes both public addresses.

The email button was exercised in Chrome against the draft. Resend confirmed
delivery to `info@recore-cycle.com` and the private Gmail destination. Desktop
1440 px and mobile 390 px checks found both mail links visible without horizontal
overflow. The personal forwarding destination stays in private server settings.

The final production build, lint, 13 existing email checks and nine-page
SEO/navigation verification passed. Googlebot, OAI-SearchBot and PerplexityBot
user-agent requests received server-rendered business details in the draft.

The draft is available for Kenny's review before publication. Google Search
Console indexing, search impressions, Core Web Vitals and AI citations have not
been measured. Follow Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)
when assessing visibility after publication.

## Original 8 November review

Reviewed 8 November 2026. Changes are local and have not been deployed.

## Evidence and changes

The public homepage at https://ewaste-nine-kohl.vercel.app/ returned HTTP 200 in a fresh Firecrawl retrieval. Its HTML advertised `http://localhost:3107/opengraph-image`, omitted a canonical URL and exposed general enquiry links as WhatsApp actions. The source configuration also returned an empty sitemap whenever `NEXT_PUBLIC_SITE_URL` was absent.

| Finding | Implemented change |
| --- | --- |
| “Send us a photo” opened WhatsApp | Links to the contact section containing the photo upload form, without a new window. |
| General scrap quotes, data destruction discussions, FAQ enquiries and category enquiries opened WhatsApp | Route to the contact section; explicitly labelled WhatsApp actions remain available there. |
| No direct “Contact us” menu entry | Added to desktop and mobile navigation. |
| Product cards intercepted navigation to show a popup | Kept the popup and its crawlable card URL; added an explicit full-guide link inside it. |
| Missing origin broke public metadata and sitemap generation | Uses the verified current public Vercel URL when the final-domain environment variable is absent. Preview deployment hostnames do not determine canonical URLs. |
| Category social metadata omitted images | Added explicit public Open Graph and Twitter image URLs to all eight guides. |
| Primary service keyword was visually hidden in the H1 | Made “E-waste recycling” visible and clarified the hero paragraph's equipment coverage. |
| Answer coverage omitted quote preparation and pricing expectations | Added two visible FAQs using existing form limits and assessment terms; the same content supplies FAQ structured data. |
| Organisation identity was repeated without a connected website entity | Added WebSite/WebPage relationships and consistent organisation identity across homepage and guides. |

## Verification

- Lint, TypeScript and production build passed; build used Node 24.9.0.
- `node scripts/verify-seo-navigation.mjs` passed against the local production preview: nine content pages, unique titles/descriptions, one H1, canonical and social URLs, public social images, JSON-LD, all rendered internal navigation/CTA links and their fragment targets, nine sitemap entries, robots sitemap declaration and category 404.
- Existing `scripts/verify-review.mjs` passed: content endpoints, enquiry-form rendering, invalid payload/image rejection and unconfigured delivery handling. The local environment lacks sender/recipient settings; this does not establish the production email configuration or delivery status.
- Native Chrome checks confirmed photo CTA → contact form, product popup → full guide, guide enquiry → contact, and the mobile menu at 390 × 844. Selecting mobile “Contact us” returned from a category guide and closed the menu.

The read-only SEO/navigation check supports `REVIEW_BASE_URL` and `REVIEW_SITE_ORIGIN` for future deployment verification. The older review script also exercises the enquiry API and should only run in an intentionally unconfigured test environment.

## Next exposure priorities

1. Confirm the final domain, warehouse suburb, actual coverage, operating hours, public business identity and contact details. Set `NEXT_PUBLIC_SITE_URL` to the verified final HTTPS domain, redirect the previous host and verify each canonical, sitemap and social URL after deployment. Do not invent suburb pages, nationwide coverage or certifications.
2. Once those facts are confirmed, publish service-area and handover details as visible content. Add matching LocalBusiness data where appropriate and establish/update an eligible Google Business Profile and Bing Places listing with consistent details. An address or collection promise must reflect actual operations.
3. Verify the correct domain property in Google Search Console and Bing Webmaster Tools, submit the sitemap and inspect all nine URLs. Record indexing, actual query impressions/clicks and enquiries by landing page. Search volume, ranking, backlinks, AI citations and conversion attribution were not measured in this review.
4. Add original evidence as it becomes available: actual equipment/job photos used with permission, documented processes, representative quote factors, and substantiated case studies. Extend service pages when there is enough distinct operational information to answer customer questions accurately.
5. Measure mobile Core Web Vitals before prioritising further performance work. The CSS still imports Google Fonts externally; self-hosting with `next/font` is a candidate improvement, but no performance gain was measured here.

Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) prioritises indexable pages, crawlable internal links, textual content and structured data matching visible content. It does not require special AI files or special schema. Existing `llms.txt` and FAQ schema are supplementary; neither guarantees indexing, rich results or AI citations. These changes improve eligibility and clarity, not a guaranteed exposure level.
