import type { Metadata } from "next";
import Link from "next/link";
import {
  dataDestructionFaqs,
  dataDestructionMethods,
  dataDestructionPath,
  dataDestructionSteps,
} from "../data-destruction-content";
import { organization, serviceArea, siteUrl } from "../site-config";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";

const title = "Secure Data Destruction & Drive Erasure Melbourne";
const description =
  "Arrange hard drive destruction or verified erasure for suitable drives with Recore in Melbourne. Discuss HDDs, SSDs and job documentation.";
const url = `${siteUrl}${dataDestructionPath}`;
const image = {
  url: `${siteUrl}/data-destruction-machine-art.webp`,
  width: 1024,
  height: 1024,
  alt: "Illustration of a physical data destruction machine",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | Recore`,
    description,
    url,
    siteName: "Recore",
    locale: "en_AU",
    type: "website",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Recore`,
    description,
    images: [image.url],
  },
};

export default function DataDestructionPage() {
  const serviceId = `${siteUrl}/#data-destruction-service`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: title,
        description,
        mainEntity: { "@id": serviceId },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Secure data destruction",
        serviceType: "Secure data destruction and drive erasure",
        url,
        description,
        areaServed: serviceArea,
        provider: { "@id": organization["@id"] },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Data destruction", item: url },
        ],
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Data destruction</span>
          </nav>
        </div>
        <section className="category-hero">
          <div className="container">
            <h1>Secure data destruction in Melbourne</h1>
            <p>
              Recore helps businesses across {serviceArea} arrange secure data destruction
              for loose drives and storage inside retired laptops, desktops and servers.
              From Oakleigh South, we help you plan what to erase for reuse, what to destroy
              and which records to request before handover.
            </p>
            <Link className="button" href="/#contact">
              Request a data destruction quote <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="section services-section" aria-labelledby="methods-heading">
          <div className="container">
            <div className="section-heading">
              <h2 id="methods-heading">Which method suits your storage?</h2>
              <p>The choice depends on the media type, drive condition, reuse plans and your organisation’s data handling policy.</p>
            </div>
            <div className="service-grid">
              {dataDestructionMethods.map(({ title, description }) => (
                <article className="service-card" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container category-layout">
            <div>
              <h2>Before you hand over your drives</h2>
              <ol className="category-list">
                {dataDestructionSteps.map(([title, description]) => (
                  <li key={title}><strong>{title}.</strong> {description}</li>
                ))}
              </ol>
              <p>For a quote, include your postcode, target date and any requirements for collection, on-site work or witnessed destruction so Recore can confirm availability.</p>
            </div>
            <aside className="category-aside">
              <h2>Planning IT reuse or recycling?</h2>
              <p>List working drives you want to reuse separately from failed drives and those your policy requires you to destroy.</p>
              <Link className="text-link" href="/recycling/hard-drives-and-storage">
                Explore hard drive and storage recycling <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/blogs/hard-drive-destruction-vs-software-erasure">
                Read the hard drive erasure guide <span aria-hidden="true">↗</span>
              </Link>
              <a className="text-link" href="https://csrc.nist.gov/pubs/sp/800/88/r2/final" target="_blank" rel="noopener noreferrer">
                NIST media sanitisation guidance <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </section>
        <section className="section services-section">
          <div className="container faq-layout">
            <div>
              <h2>Data destruction FAQs</h2>
              <Link className="text-link" href="/#contact">
                Discuss your job with Recore <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="faq-list">
              {dataDestructionFaqs.map(({ question, answer }) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }} />
    </>
  );
}
