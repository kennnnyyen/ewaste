import Link from "next/link";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="section">
        <div className="container">
          <span className="eyebrow">404 / PAGE NOT FOUND</span>
          <h1>Let’s find the right path.</h1>
          <p style={{ margin: "24px 0" }}>
            This page could not be found. Explore the equipment and components
            Recore can assess for recycling.
          </p>
          <Link className="button" href="/#products">
            Explore recycling categories <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
