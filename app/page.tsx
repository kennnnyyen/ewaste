"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const materials = [
  { number: "01", label: "PCBs & motherboards", image: "/materials/pcbs-art.webp" },
  { number: "02", label: "CPUs & processors", image: "/materials/cpus-art.webp" },
  { number: "03", label: "RAM & memory", image: "/materials/ram-art.webp" },
  { number: "04", label: "GPUs & expansion cards", image: "/materials/gpus-art.webp" },
];

const certifications = [
  { title: "ISO 9001", copy: "Quality management", href: "https://www.iso.org/standard/9001" },
  { title: "ISO 14001", copy: "Environmental management", href: "https://www.iso.org/standard/14001" },
  { title: "ISO 45001", copy: "Occupational health & safety", href: "https://www.iso.org/standard/45001" },
  { title: "AS/NZS 5377", copy: "E-waste collection, storage and treatment", href: "https://store.standards.org.au/product/as-nzs-5377-2013" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 8.5 12 5l6 3.5v7L12 19l-6-3.5v-7Z" />
        <path d="m6.3 8.7 5.7 3.4 5.7-3.4M12 12.1V19" />
      </svg>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Unable to submit");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="site-shell">
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#top" aria-label="[Business Name] home"><Mark /><span>[Business Name]</span></a>
          <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
            <a href="#materials" onClick={() => setMenuOpen(false)}>Materials</a>
            <a href="#security" onClick={() => setMenuOpen(false)}>Data destruction</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <a className="nav-cta" href="#contact">Start an enquiry <Arrow /></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow mono">Recovery, handled properly</span>
            <h1>Computer scrap recycling. <em>Secure data destruction.</em></h1>
            <p className="hero-intro">Recover value from your PCBs, CPUs and selected computer components, or give retired business IT a secure, documented exit.</p>
            <div className="hero-actions">
              <a className="button" href="#contact">Get a scrap quote <Arrow /></a>
              <a className="button secondary" href="#security">Enquire about data destruction <Arrow /></a>
            </div>
            <div className="micro-proof"><div className="proof-dots"><span /><span /><span /></div><span>A practical sister-company pathway to YP ECYCLE</span></div>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Trust markers">
        <div className="container trust-inner">
          <p><strong>Certified, secure, sustainable.</strong>Evidence-led handling for businesses and component sellers.</p>
          <div className="cert"><strong>ISO 9001</strong><p>Quality</p></div>
          <div className="cert"><strong>ISO 14001</strong><p>Environment</p></div>
          <div className="cert"><strong>ISO 45001</strong><p>Safety</p></div>
          <div className="cert"><strong>AS/NZS 5377</strong><p>E-waste</p></div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow mono">Choose your route</span><h2>One team. Two clear ways forward.</h2></div><p>Whether you have a box of processors or a room of retired devices, start with the outcome you need.</p></div>
          <div className="service-grid">
            <article className="service-card"><div><div className="service-card-top"><span className="service-number">01 / MATERIALS</span><span className="service-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 5h16v14H4zM8 9h8M8 13h5" /></svg></span></div><h3>Sell your computer scrap with confidence.</h3><p>PCBs, CPUs, RAM, GPUs and selected whole units assessed clearly, with a straightforward next step.</p></div><a href="#contact" className="text-link">Request a component quote <Arrow /></a></article>
            <article className="service-card dark"><div><div className="service-card-top"><span className="service-number">02 / SECURITY</span><span className="service-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m8 12 2.5 2.5L16 9" /></svg></span></div><h3>Retire business IT without the doubt.</h3><p>Build a documented chain of custody around hard drives, devices and sensitive media before they leave your control.</p></div><a href="#contact" className="text-link">Plan data destruction <Arrow /></a></article>
          </div>
        </div>
      </section>

      <section className="section materials" id="materials">
        <div className="container"><div className="section-heading"><div><span className="eyebrow mono">What we assess</span><h2>Components with a second life.</h2></div><p>Send a photo if you are unsure. We will help identify what you have and what happens next.</p></div>
          <div className="materials-grid">
            {materials.map(({ number, label, image }) => (
              <article className="material" key={number}>
                <div className="material-graphic">
                  <Image
                    className="material-image"
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 85vw, (max-width: 900px) 42vw, 240px"
                  />
                </div>
                <div className="material-caption">
                  <span className="mono">{number}</span>
                  <h3>{label}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" id="process"><div className="container"><div className="section-heading"><div><span className="eyebrow mono">How it works</span><h2>Clear from first message to final outcome.</h2></div><p>We keep the process legible, so you know what we need and what you will receive.</p></div><div className="process-grid">{[['01','Describe it','Tell us what you have, where it is and which service you need.'],['02','Assess it','We clarify categories, media types, quantities and the right handling path.'],['03','Handle it','Arrange the approved handover, collection or service appointment.'],['04','Close the loop','Receive confirmed next steps, payment terms or destruction documentation.']].map(([num,title,copy]) => <article className="process-step" key={num}><span className="mono">{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section security" id="security">
        <div className="container security-inner">
          <div>
            <span className="eyebrow mono">Business data destruction</span>
            <h2>Security you can explain to your team.</h2>
            <p>From the first handover to the final record, agree the media, method and evidence before work begins.</p>
            <div className="security-list">
              <div className="security-item"><strong>Media-aware</strong><p>Hard drives, SSDs, tapes and devices need the right treatment.</p></div>
              <div className="security-item"><strong>Documented</strong><p>Confirm the report or certificate your business needs.</p></div>
              <div className="security-item"><strong>Controlled</strong><p>Clarify custody, access and approved handling locations.</p></div>
              <div className="security-item"><strong>Transparent</strong><p>Use a service path your stakeholders can understand.</p></div>
            </div>
            <a className="button" href="#contact" style={{marginTop: 30}}>Talk through your requirements <Arrow /></a>
          </div>
          <figure className="security-visual">
            <div className="security-machine">
              <Image
                src="/data-destruction-machine-art.webp"
                alt="Artistic illustration of a cabinet-style data destruction machine with control buttons, a collection drawer and caster wheels."
                fill
                sizes="(max-width: 600px) 260px, 296px"
                className="security-machine-image"
              />
            </div>
            <figcaption className="security-machine-caption">
              <span className="mono">Data destruction equipment</span>
              <p>Secure handling. Responsible recovery.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section"><div className="container proof-section"><div><span className="eyebrow mono">Our standards</span><h2>Trust needs details.</h2><p style={{marginTop: 22}}>The certification references below are associated with YP ECYCLE. We will publish the exact scope, holder and current documents once the new business relationship is confirmed.</p><a className="text-link" href="https://ypecycle.com.au/certifications" target="_blank" rel="noopener noreferrer">View YP ECYCLE certifications <Arrow /></a></div><div><div className="cert-list">{certifications.map(({ title, copy, href }) => <a className="cert-row" href={href} target="_blank" rel="noopener noreferrer" key={title}><div><strong>{title}</strong><p>{copy}</p></div><span>REFERENCE</span></a>)}</div><p className="cert-note">Certification marks and claims should be used only for the legal entity, sites and activities covered by current documentation.</p></div></div></section>

      <section className="section" id="faq"><div className="container"><div className="section-heading"><div><span className="eyebrow mono">Questions, answered</span><h2>Before you send a message.</h2></div><p>We will tailor the live answers to confirmed terms, service area and operating details.</p></div><div className="faq-grid"><details><summary>What components can I send?</summary><p>We are preparing to assess PCBs, CPUs, RAM, GPUs and selected computer equipment. Send a description or photo and we will confirm suitability.</p></details><details><summary>Do you publish fixed prices?</summary><p>Values depend on category, grade, quantity and current buying rates. The launch experience is an assessed quote rather than a static price table.</p></details><details><summary>Can you handle data-bearing devices?</summary><p>Yes, the data-destruction enquiry is designed to clarify media types, handling requirements, service location and the documentation you need.</p></details><details><summary>What happens after I enquire?</summary><p>We will review the details, clarify anything missing and confirm the next practical step. Response timing will be set by the operating team.</p></details></div></div></section>

      <section className="section contact" id="contact"><div className="container contact-grid"><div className="contact-copy"><span className="eyebrow mono">Start a conversation</span><h2>Tell us what needs a better exit.</h2><p>Choose a service and share enough detail for a useful first response. A photo is welcome, but never required to get started.</p><div className="contact-details"><a href="mailto:hello@example.com">hello@example.com <Arrow /></a><a href="tel:+61000000000">+61 00 0000 0000 <Arrow /></a><span className="mono">[Service area to be confirmed]</span></div></div><form className="form-card" onSubmit={handleSubmit}><div className="form-grid"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" required type="email" placeholder="you@company.com" /></div><div className="field"><label htmlFor="company">Business (optional)</label><input id="company" name="company" placeholder="Company name" /></div><div className="field"><label htmlFor="service">I need help with</label><select id="service" name="service" defaultValue="scrap"><option value="scrap">Selling computer scrap</option><option value="destruction">Data destruction</option><option value="both">Both services</option></select></div><div className="field full"><label htmlFor="message">What can you tell us?</label><textarea id="message" name="message" required placeholder="Components, media types, approximate quantity, location…" /></div></div><div className="form-foot"><small>By submitting, you agree to be contacted about this enquiry. See our privacy notice.</small><button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"} <Arrow /></button></div>{status === "success" && <p className="form-message" role="status">Thanks — your enquiry has been received. We will be in touch after the operating details are confirmed.</p>}{status === "error" && <p className="form-message" role="alert">We could not send that just now. Please try again or call us directly.</p>}</form></div></section>

      <footer className="footer"><div className="container footer-inner"><a className="brand" href="#top"><Mark /><span>[Business Name]</span></a><small>Computer component recovery &amp; secure data destruction</small><div className="footer-links"><a href="#privacy">Privacy</a><a href="#contact">Contact</a></div></div></footer>
    </main>
  );
}
