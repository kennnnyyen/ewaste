import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import BlogPreview from "../blog-preview";
import { siteUrl } from "../site-config";

const title = "E-waste Recycling and Data Destruction Blogs";
const description = "Practical guides for Victorian businesses planning IT recycling, component recovery and secure data destruction.";
const url = `${siteUrl}/blogs`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", siteName: "Recore", locale: "en_AU" },
  twitter: { card: "summary_large_image", title, description },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="section container blog-index">
        <Link href="/#blog" className="text-link blog-back-link">
          <span aria-hidden="true">←</span> Back to home
        </Link>
        <span className="eyebrow">Recore Blogs</span>
        <h1>Guides for retiring business IT.</h1>
        <BlogPreview />
      </main>
      <SiteFooter />
    </>
  );
}
