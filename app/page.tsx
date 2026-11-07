import Image from "next/image";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import ProductFinder from "./product-finder";
import EnquiryComposer from "./enquiry-composer";
import { categories, enquiryUrl, faqs } from "./recycling-content";
import { siteUrl } from "./site-config";

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
      {
        "@type": "Organization",
        name: "Recore",
        description:
          "E-waste recycling, computer component recovery and data destruction enquiries.",
        ...(siteUrl ? { url: siteUrl, "@id": `${siteUrl}/#organisation` } : {}),
      },
      {
        "@type": "Service",
        name: "E-waste recycling and computer component recovery",
        provider: { "@type": "Organization", name: "Recore" },
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
      <main id="main-content">
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                E-WASTE RECYCLING & RESOURCE RECOVERY
              </span>
              <h1>
                <span className="sr-only">E-waste recycling. </span>Old
                technology.
                <br />
                <span>New possibilities.</span>
              </h1>
              <p>
                From a box of circuit boards to a warehouse of retired IT.
                Recore helps you find a better way forward for computers, office
                equipment and electronic components.
              </p>
              <div className="hero-actions">
                <a className="button" href="#products">
                  Find what you can recycle <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#contact">
                  Ask about your equipment <span aria-hidden="true">↗</span>
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
              <figcaption>
                <span>Tomorrow, recovered.</span>
              </figcaption>
              <span className="visual-index" aria-hidden="true">
                RE / 01
              </span>
            </figure>
          </div>
        </section>
        <div className="intro-strip">
          <div className="container">
            <p>A clearer path for your retired technology.</p>
            <span>Equipment recycling</span>
            <span>Component recovery</span>
            <span>Data destruction enquiries</span>
          </div>
        </div>

        <section className="section" id="products">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">01 / WHAT WE RECYCLE</span>
                <h2>More than computer scrap.</h2>
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
                href={enquiryUrl(
                  "Hi Recore, can you help identify the recycling options for my equipment? I can share some photos.",
                )}
                target="_blank"
                rel="noopener noreferrer"
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
                <span className="eyebrow">02 / THE RIGHT SERVICE</span>
                <h2>
                  One place to start.
                  <br />A considered next step.
                </h2>
              </div>
              <p>
                Clearing an office, managing business assets or sorting valuable
                components? Start with the service that fits.
              </p>
            </div>
            <div className="service-grid">
              {[
                {
                  num: "01",
                  title: "Equipment recycling",
                  text: "Desktops, laptops, printers, monitors and infrastructure. Share your equipment list to plan a suitable recycling handover.",
                  link: "Explore equipment",
                  href: "#products",
                },
                {
                  num: "02",
                  title: "Component & scrap recovery",
                  text: "PCBs, processors, memory and selected computer scrap assessed for material type, grade, quantity and recovery value.",
                  link: "Request a scrap quote",
                  href: enquiryUrl(
                    "Hi Recore, I'd like a quote for computer scrap and components.",
                  ),
                },
                {
                  num: "03",
                  title: "Data-aware IT retirement",
                  text: "Put data handling on the plan before equipment leaves your control. Discuss media, custody, destruction methods and required records.",
                  link: "Explore data destruction",
                  href: "#security",
                },
              ].map((service) => (
                <article className="service-card" key={service.num}>
                  <span className="service-number">{service.num} /</span>
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

        <section className="section security-section" id="security">
          <div className="container security-grid">
            <div>
              <span className="eyebrow">THE DATA MATTERS, TOO</span>
              <h2>
                Retire the equipment.
                <br />
                <span>Protect what’s on it.</span>
              </h2>
              <p>
                Computers, servers and even office printers can hold sensitive
                information. Plan data destruction before recycling, with a
                method suited to the media and the records your organisation
                needs.
              </p>
              <a
                className="button"
                href={enquiryUrl(
                  "Hi Recore, I'd like to discuss data destruction before recycling equipment.",
                )}
              >
                Discuss data destruction <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="security-checklist">
              <span className="security-label">BEFORE THE HANDOVER</span>
              {[
                [
                  "01",
                  "Identify the media",
                  "Separate hard drives, SSDs and other storage. Flag any devices that may contain data.",
                ],
                [
                  "02",
                  "Agree the handling",
                  "Confirm the service method, custody arrangements and the location of the work.",
                ],
                [
                  "03",
                  "Define the evidence",
                  "Agree any asset records, reports or certificates your job requires before work begins.",
                ],
              ].map(([n, title, text]) => (
                <div className="security-step" key={n}>
                  <span>{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">03 / HOW IT WORKS</span>
                <h2>
                  Less uncertainty.
                  <br />
                  More room to move.
                </h2>
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
              <span className="eyebrow">04 / GOOD QUESTIONS</span>
              <h2>
                A little clarity,
                <br />
                before you start.
              </h2>
              <p>
                Can’t see your item listed? A photo is a good place to start.
              </p>
              <a className="text-link" href={enquiryUrl()}>
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

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-intro">
              <span className="eyebrow">LET’S CLEAR THE WAY</span>
              <h2>
                A few items.
                <br />
                An entire IT refresh.
                <br />
                <span>Let’s talk.</span>
              </h2>
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
                  <small>Send the full enquiry by email or continue in WhatsApp.</small>
                </div>
                <div>
                  <span>03</span>
                  <strong>Keep data private</strong>
                  <small>Share equipment views, never passwords or personal records.</small>
                </div>
              </div>
              <div className="contact-direct">
                <span>DIRECT WHATSAPP</span>
                <a
                  href={enquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +61 491 570 006 <span aria-hidden="true">↗</span>
                </a>
              </div>
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
