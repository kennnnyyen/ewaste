import { socialProfiles } from "./site-config";
import Link from "next/link";
import Wordmark from "./recore-wordmark";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/" aria-label="Recore home">
            <Wordmark />
          </Link>
          <p>A better future for yesterday’s technology.</p>
          <div className="footer-socials" role="group" aria-label="Social media">
            <a
              className="footer-social footer-social-linkedin"
              href={socialProfiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Recore on LinkedIn (opens in a new tab)"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="1" fill="#fff" />
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 19H4.96V9.45h2.97V19ZM6.45 8.15a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM19.04 19h-2.96v-4.64c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45V19H9.8V9.45h2.84v1.3h.04a3.12 3.12 0 0 1 2.8-1.54c3 0 3.56 1.98 3.56 4.55V19Z" />
              </svg>
            </a>
            <a
              className="footer-social footer-social-facebook"
              href={socialProfiles.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Recore on Facebook (opens in a new tab)"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M14 21v-8h2.7l.4-3.1H14V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H8V13h2.6v8H14Z" />
              </svg>
            </a>
            <a
              className="footer-social footer-social-instagram"
              href={socialProfiles.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Recore on Instagram (opens in a new tab)"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <h2>Explore Recore</h2>
          <div>
            <Link href="/#products">What we recycle</Link>
            <Link href="/#certifications">Certifications</Link>
            <Link href="/#contact">Contact us</Link>
            <Link href="/blogs">Blogs</Link>
          </div>
        </nav>
      </div>
      <div className="container footer-bottom">
        <small>© 2026 Recore. All rights reserved.</small>
      </div>
    </footer>
  );
}
