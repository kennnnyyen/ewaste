import Link from "next/link";
import BlogPreview from "./blog-preview";
import Image from "next/image";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import ProductFinder from "./product-finder";
import EnquiryComposer from "./enquiry-composer";
import { categories, enquiryUrl, faqs } from "./recycling-content";
import { organization, siteDescription, siteTitle, siteUrl } from "./site-config";
import { contactDetails } from "./contact-details";

const dataDestructionDescription =
  "Arrange secure handling for hard drives, SSDs and other data-bearing equipment. Ask about physical destruction or verified software erasure for suitable drives, and confirm what records are available for your job.";

const steps = [
  [
    "Show us what you have",
    "Send an equipment list or a few clear photos, approximate quantities and your location.",
  ],
  [
    "Agree the right approach",
    "We assess the load and confirm acceptance, any recovery value or charges, data requirements and handover options.",
  ],
  [
    "Make room for what’s next",
    "Proceed with the agreed recycling or data service, with any job records and payment terms confirmed in advance.",
  ],
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      ...(siteUrl ? [
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: "Recore",
          publisher: { "@id": `${siteUrl}/#organisation` },
        },
        {
          "@type": "WebPage",
          "@id": `${siteUrl}/#webpage`,
          url: siteUrl,
          name: siteTitle,
          description: siteDescription,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: { "@id": `${siteUrl}/#organisation` },
          mainEntity: [
            { "@id": `${siteUrl}/#recycling-service` },
            { "@id": `${siteUrl}/#data-destruction-service` },
          ],
        },
      ] : []),
      {
        "@type": "Service",
        name: "E-waste recycling and computer component recovery",
        ...(siteUrl ? { "@id": `${siteUrl}/#recycling-service`, url: `${siteUrl}/#services` } : {}),
        provider: { "@id": organization["@id"] },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Recycling categories",
          itemListElement: categories.map((category) => ({
            "@type": "OfferCatalog",
            name: category.title,
            ...(siteUrl
              ? { url: `${siteUrl}/recycling/${category.slug}` }
              : {}),
          })),
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#data-destruction-service`,
        name: "Secure data destruction",
        url: `${siteUrl}/#security`,
        provider: { "@id": organization["@id"] },
        description: dataDestructionDescription,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="landing-page">
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                E-WASTE RECYCLING & RESOURCE RECOVERY
              </span>
              <h1>
                E-waste recycling.
                <br />
                <span>New possibilities.</span>
              </h1>
              <p>
                Clear out retired IT, recover value from eligible components
                and protect the data left on your drives. Based in Oakleigh
                South, Recore helps businesses across Melbourne and most of
                Victoria recycle retired equipment and arrange secure data
                destruction.
              </p>
              <div className="hero-actions">
                <a className="button" href="#products">
                  Find what you can recycle <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-note">
                <span className="dot" /> Whole equipment. Individual components.
                Mixed loads.
              </div>
            </div>
            <figure className="hero-visual">
              <div className="hero-image">
                <Image
                  src="/recycling-equipment-hero.webp"
                  alt="Illustrative arrangement of retired computers, a laptop, printer, networking equipment and electronic components."
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
            </figure>
          </div>
        </section>
        <div className="intro-strip">
          <div className="container">
            <p><a className="certification-link" href="#certifications">ISO certifications at YP ECYCLE</a></p>
            <span>Equipment recycling</span>
            <span>Component recovery</span>
            <span>Secure data destruction</span>
          </div>
        </div>

        <section className="section services-section certification-section" id="certifications">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>ISO and e-waste certifications</h2>
              </div>
              <div>
                <p>Our sister company, YP ECYCLE, lists certifications for quality, environmental management, workplace safety and e-waste handling.</p>
                <a
                  className="text-link"
                  href="https://ypecycle.com.au/about-yp-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View YP ECYCLE’s certificate documents <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <dl className="certification-grid">
              {[
                ["ISO 9001", "Quality management"],
                ["ISO 14001", "Environmental management"],
                ["ISO 45001", "Occupational health and safety"],
                ["AS/NZS 5377", "E-waste collection, storage, transport and treatment"],
              ].map(([standard, scope]) => (
                <div key={standard}>
                  <dt>{standard}</dt>
                  <dd>{scope}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="products">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">01 / WHAT WE RECYCLE</span>
                <h2>What can you recycle?</h2>
              </div>
              <p>
                Find your equipment below. Every load starts with an assessment,
                so you know what can be accepted and how to prepare it.
              </p>
            </div>
            <ProductFinder />
            <div className="help-note">
              <span>Not sure where your items fit?</span>
              <a
                href="#contact"
              >
                Send us a photo <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">02 / OUR SERVICES</span>
                <h2>Choose the right service.</h2>
              </div>
              <p>
                Clearing an office, managing business assets or sorting valuable
                components? Start with the service that fits.
              </p>
            </div>
            <div className="service-grid">
              {[
                {
                  title: "Equipment recycling",
                  text: "Desktops, laptops, printers, monitors and infrastructure. Share your equipment list to plan a suitable recycling handover.",
                  link: "Explore equipment",
                  href: "#products",
                },
                {
                  title: "Component & scrap recovery",
                  text: "PCBs, processors, memory and selected computer scrap assessed for material type, grade, quantity and recovery value.",
                  link: "Request a scrap quote",
                  href: "#contact",
                },
                {
                  title: "Secure data destruction",
                  text: dataDestructionDescription,
                  link: "Explore data destruction",
                  href: "#security",
                },
              ].map((service) => (
                <article className="service-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a className="text-link" href={service.href}>
                    {service.link}
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">03 / HOW IT WORKS</span>
                <h2>From assessment to handover.</h2>
              </div>
              <p>
                A useful first conversation makes the rest simpler. Here’s what
                to expect.
              </p>
            </div>
            <div className="process-grid">
              {steps.map(([title, text], i) => (
                <article key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="preparation">
              <strong>A little preparation goes a long way.</strong>
              <p>
                Keep loose batteries, toner and damaged screens separate.
                Confirm acceptance and handover arrangements before travelling
                or sending equipment.
              </p>
            </div>
          </div>
        </section>

        <section className="recovery-band">
          <div className="container recovery-band-inner">
            <span className="eyebrow">THE RECORE APPROACH</span>
            <h2>
              There’s more to old technology
              <br />
              than what’s been left behind.
            </h2>
            <p>
              Whole devices. Useful components. Recoverable materials.
              <br />
              We start by understanding what you have.
            </p>
            <a className="text-link" href="#contact">
              Let’s find the next step <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container faq-layout">
            <div>
              <span className="eyebrow">04 / FAQS</span>
              <h2>
                E-waste recycling:
                <br />
                your questions answered.
              </h2>
              <p>
                Can’t see your item listed? A photo is a good place to start.
              </p>
              <a className="text-link" href="#contact">
                Ask Recore <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(({ question, answer }) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section services-section" id="blog">
          <div className="container">
            <div className="section-heading">
              <h2>From the Recore Blogs</h2>
              <Link className="text-link" href="/blogs">View all articles ↗</Link>
            </div>
            <BlogPreview nested />
          </div>
        </section>

        <section className="section contact-section" id="contact" tabIndex={-1}>
          <div className="container contact-grid">
            <div className="contact-intro">
              <span className="eyebrow">CONTACT US</span>
              <h2>Tell us about your <span>retired IT.</span></h2>
              <p>
                Tell us what you have and where it is. We’ll help clarify
                suitability, the service you need and the next practical step.
              </p>
              <div className="contact-signals" aria-label="Helpful enquiry details">
                <div>
                  <span>01</span>
                  <strong>Show the load</strong>
                  <small>Photos help identify equipment and component categories.</small>
                </div>
                <div>
                  <span>02</span>
                  <strong>Choose your channel</strong>
                  <small>Email your details and photos through the form, or start a WhatsApp chat.</small>
                </div>
                <div>
                  <span>03</span>
                  <strong>Keep data private</strong>
                  <small>Share equipment views, never passwords or personal records.</small>
                </div>
              </div>
              <div className="contact-direct">
                <span>WHATSAPP</span>
                <a
                  href={enquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="contact-direct">
                <span>CALL US</span>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </div>
              <div className="contact-direct">
                <span>EMAIL</span>
                <div className="contact-emails">
                  <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                  <a href={`mailto:${contactDetails.alternateEmail}`}>{contactDetails.alternateEmail}</a>
                </div>
              </div>
              <div className="contact-direct">
                <span>ADDRESS</span>
                <a href={contactDetails.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {contactDetails.address} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <iframe
                className="contact-map"
                src={contactDetails.mapsEmbedUrl}
                title={`Google map of Recore at ${contactDetails.address}`}
                width={560}
                height={260}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <p className="contact-note">
                Please confirm an appointment before arranging delivery. Service
                availability and any charges are assessed for your location and
                load.
              </p>
            </div>
            <EnquiryComposer />
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
