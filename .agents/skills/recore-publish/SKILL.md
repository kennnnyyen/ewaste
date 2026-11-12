---
name: recore-publish
description: Release approved Recore website content and publish Recore business posts on Facebook, LinkedIn and Instagram. Use when asked to publish, deploy, push live, or share a Recore article or approved social post, and verify the resulting links.
---

# Publish Recore content

1. Identify the approved article, artwork and requested channels. Use the existing local Recore landing page repository. Review the staged diff and include only the approved website content and its referenced assets.
2. For a website release, use the established GitHub `main` deployment for `kennnnyyen/ewaste` and verify the public page on `https://www.recore-cycle.com`. Check the article title, cover and any inline artwork. If terminal network access is unavailable, use the GitHub connector with the verified remote base and a single commit containing the reviewed changes. Use a fast-forward update. Resolve any stale base against current remote changes before retrying.
3. For posts that refer to a new article, confirm its public URL before sharing. Use the approved artwork and a compatible upload format, such as JPEG, if needed. Verify the sender and selected channels before submitting. Use an authorised publishing connector when available, or the signed-in business interfaces.
   - **Facebook and Instagram:** Use Meta Business Suite for the Recore E-Waste Recycling Facebook Page and `@recorecycle` Instagram account. Select the requested channels and customise the captions by platform. Use the Facebook caption for a clickable article link and Instagram for an image-led caption with a clear way to find the article.
   - **LinkedIn:** Use the Recore E-Waste Recycling company Page at `https://www.linkedin.com/company/recore-cycle/`. Publish as the company. Include the article link, artwork and descriptive image alt text when available.
4. Confirm the exact post on each requested channel using the publication result or published-content list, and capture the direct public links. If submission times out or the state is unclear, check the published list before retrying. Report each channel's result and any unresolved blocker.
5. Verify that each social caption includes Recore’s public phone number and primary email from `app/contact-details.ts`. When asked to add or correct contact details on an existing post, edit its caption in place and confirm the saved contact line on each requested channel.

Use existing authorised access. Keep credentials out of content, files, commits and responses. Only submit to the channels authorised for the current item.
