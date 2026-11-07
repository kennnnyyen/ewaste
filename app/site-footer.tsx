import Link from "next/link";
import Wordmark from "./recore-wordmark";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Link className="brand" href="/" aria-label="Recore home">
            <Wordmark />
          </Link>
          <p>A better future for yesterday’s technology.</p>
        </div>
        <div className="footer-links">
          <Link href="/#products">What we recycle</Link>
          <Link href="/#security">Data destruction</Link>
          <Link href="/#contact">Contact Recore</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© Recore. E-waste recycling & component recovery.</small>
        <span>Assess. Recover. Reimagine.</span>
      </div>
    </footer>
  );
}
