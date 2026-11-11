# Gmail enquiry delivery on Vercel

The local review checkout's `/api/enquiry` function uses Gmail SMTP when its
credentials are configured, otherwise it uses Resend. Both transports use
`info@recore-cycle.com` for the recipient and Reply-To. The customer's contact
email stays in the message body and photo attachments are preserved.
The current production deployment uses the published Resend enquiry handler,
which reads `RESEND_TO_EMAIL=info@recore-cycle.com` and
`RESEND_FROM_EMAIL=Recore website <info@recore-cycle.com>`.
Production also has `ENQUIRY_TO_EMAIL=info@recore-cycle.com` for compatibility
with the local review checkout. The review checkout's email button was tested
through Chrome on 11 November 2026. Resend confirmed delivery to the branded
address and the privately configured Gmail destination.

## Incoming domain email

The separate `/api/webhooks/resend` endpoint forwards incoming mail addressed to
`info@recore-cycle.com` into the Gmail address in `RECORE_FORWARD_TO_EMAIL`.
Set the final Gmail destination privately in the server's environment settings.
Keep personal routing addresses out of source files and configuration examples.
Forwarding preserves the subject, message, attachments, inline images and original
reply address.

To activate this flow, use the Resend team containing `recore-cycle.com`.

1. Enable receiving for that domain and add the exact receiving MX record
   supplied by Resend to the domain's Vercel DNS. Check for existing mail routing
   before changing MX records. Keep sending authentication records in place.
2. Register `https://www.recore-cycle.com/api/webhooks/resend` for `email.received`.
3. Set server-only `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET` and
   `RECORE_FORWARD_TO_EMAIL` in the intended deployment. Enter the final Gmail
   destination privately for the last variable.
   The API key must permit reading received emails and sending email.
4. Deploy the endpoint, then send an external test to `info@recore-cycle.com`.
   Check Gmail receipt, attachments and Reply targeting the original sender.
   Confirm the webhook returns success and replay once to check deduplication.

Unsigned requests are rejected. Other inboxes and forwarded-message loops are
ignored. Failed forwards return an error so Resend can retry. The stable
idempotency key deduplicates sends within Resend's 24-hour retention period.
Replays after that period can deliver another copy. Inbox delivery and sending
replies as `info@recore-cycle.com` require separate live verification and setup.

### Production verification on 11 November 2026

Resend verified the receiving MX record for `recore-cycle.com` with priority 10
and value `receive-apne1.forge.rmta.net`. The production `email.received` webhook
is enabled and its signing secret is stored privately in the deployment settings.

A live form submission to `info@recore-cycle.com` reached Resend and was forwarded
to the privately configured Gmail inbox. Resend reported delivery. The customer
reply address and test image were preserved. A signed retry returned success and
produced one forwarded copy. Unsigned webhook requests returned HTTP 400.

Eight earlier messages held in Resend were forwarded after activation, and Resend
reported all eight as delivered. Inbox placement still requires checking Gmail.
The public Contact Us address remains `sales.recore@gmail.com`.

## Configuration

In the Recore Vercel project's **Settings → Environment Variables**, set:

| Variable | Value |
| --- | --- |
| `GMAIL_USER` | The Gmail account authorized to send enquiries |
| `GMAIL_APP_PASSWORD` | That account's Google App Password, stored as sensitive |
| `ENQUIRY_TO_EMAIL` | `info@recore-cycle.com` |

The sender and receiver are independent. The public contact address remains
`sales.recore@gmail.com`. Do not expose credentials with `NEXT_PUBLIC_`, commit
them, or paste them into chat. Use `.env.local` for local testing.

Enable 2-Step Verification on the sending account, then create an App Password:
https://myaccount.google.com/apppasswords

Some Google accounts do not support App Passwords. Use Gmail OAuth instead if
that option is unavailable. A regular Google password will not work here.

Apply variables to the intended Vercel environment and redeploy. Test in a
preview deployment before changing production recipient routing.

## Verification

1. Run `node --experimental-strip-types --test scripts/enquiry-delivery.test.mjs`,
   `npm run lint`, and `npm run build`.
2. Submit a clearly labelled test enquiry through the deployed form, including
   one equipment photo and a reply email.
3. Confirm the message and attachment reach `info@recore-cycle.com` and its
   final configured inbox, checking spam if needed. Confirm Reply targets the
   supplied customer email. Domain receiving must be active for this test.

The function reports success only after Gmail accepts the receiver. SMTP
acceptance does not prove inbox delivery. SMTP has no provider idempotency key;
the stable Message-ID aids tracing but does not guarantee deduplication after
an ambiguous timeout. The server does not automatically retry sends.

References:
- https://vercel.com/kb/guide/sending-emails-from-an-application-on-vercel
- https://support.google.com/accounts/answer/185833
- https://nodemailer.com/smtp
