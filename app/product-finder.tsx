"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { dataDestructionSteps, dataDestructionSummary } from "./data-destruction-content";
import { categories } from "./recycling-content";
import RecyclingIcon from "./recycling-icon";

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function locationSnapshot() {
  return window.location.hash;
}

function serverSnapshot() {
  return "";
}

export default function ProductFinder() {
  const [filter, setFilter] = useState("All products");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const hash = useSyncExternalStore(subscribeToLocation, locationSnapshot, serverSnapshot);
  const selected = categories.find((category) => hash === `#recycle-${category.slug}`);
  const dataDestructionSelected = hash === "#security" || hash === "#service-data-destruction";
  const modalOpen = Boolean(selected) || dataDestructionSelected;
  const showDataDestruction = filter === "All products";
  const visible = categories.filter(
    (category) => filter === "All products" || category.group === filter,
  );

  useEffect(() => {
    const element = dialog.current;
    if (!modalOpen || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (window.location.hash !== "#contact") trigger.current?.focus({ preventScroll: true });
    };
  }, [modalOpen]);

  useEffect(() => {
    function openDataDestruction(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
          !(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href="#security"], a[href="/#security"]');
      if (!link) return;

      event.preventDefault();
      trigger.current = link;
      if (window.location.hash !== "#security") {
        window.history.pushState({ ...window.history.state, recoreProduct: true }, "", "#security");
      }
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    document.addEventListener("click", openDataDestruction);
    return () => document.removeEventListener("click", openDataDestruction);
  }, []);

  function openProduct(event: React.MouseEvent<HTMLAnchorElement>, target: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    window.history.pushState({ ...window.history.state, recoreProduct: true }, "", target);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function closeProduct() {
    if (window.history.state?.recoreProduct) {
      window.history.back();
    } else {
      window.history.replaceState(window.history.state, "", "#products");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  return (
    <>
      <div className="product-toolbar">
        <div
          className="filters"
          role="group"
          aria-label="Filter recycling products"
        >
          {["All products", "Equipment", "Components"].map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="product-count" role="status">
          {visible.length + Number(showDataDestruction)} options to explore
        </span>
      </div>
      <div className="product-grid">
        {visible.map((category) => (
          <Link
            className="product-card"
            href={`/recycling/${category.slug}`}
            key={category.slug}
            aria-haspopup="dialog"
            onClick={(event) => openProduct(event, `#recycle-${category.slug}`)}
          >
            <div className="product-card-top">
              <RecyclingIcon name={category.icon} />
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{category.shortTitle}</h3>
            <p>{category.examples.slice(0, 2).join(" · ")}</p>
            <span className="product-card-link">Explore recycling options</span>
          </Link>
        ))}
        {showDataDestruction && (
          <a
            className="product-card"
            href="#security"
            aria-haspopup="dialog"
          >
            <div className="product-card-top">
              <RecyclingIcon name="drive" />
              <span aria-hidden="true">↗</span>
            </div>
            <h3>Secure data destruction</h3>
            <p>Hard drives · SSDs · Data-bearing IT equipment</p>
            <span className="product-card-link">Explore data destruction</span>
          </a>
        )}
      </div>
      <dialog
        id="security"
        ref={dialog}
        className="product-modal"
        aria-labelledby="product-modal-title"
        onCancel={(event) => {
          event.preventDefault();
          closeProduct();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) closeProduct();
        }}
      >
        {modalOpen && (
          <>
            <div className="product-modal-header">
              <span className="eyebrow">{selected ? `${selected.group} recycling` : "IT retirement service"}</span>
              <button type="button" className="product-modal-close" onClick={closeProduct} autoFocus>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="product-modal-body">
              {selected ? (
                <>
                  <RecyclingIcon name={selected.icon} />
                  <h2 id="product-modal-title">{selected.title}</h2>
                  <p className="product-modal-summary">{selected.summary}</p>
                  <div className="product-modal-details">
                    <section aria-labelledby="product-modal-items">
                      <h3 id="product-modal-items">Items to enquire about</h3>
                      <ul className="category-list">
                        {selected.examples.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                      <h3>Before you arrange recycling</h3>
                      <ol className="category-list">
                        {selected.prepare.map((item) => <li key={item}>{item}</li>)}
                      </ol>
                    </section>
                    <aside className="category-aside">
                      <h3>Good to know</h3>
                      <p>{selected.consideration}</p>
                    </aside>
                  </div>
                  <p>Share photos, quantities and your location first. We’ll confirm acceptance,
                    any charges or recovery value, and suitable handover arrangements.</p>
                  <p>
                    <Link className="text-link" href={`/recycling/${selected.slug}`}>
                      Read the full {selected.shortTitle.toLowerCase()} recycling guide
                      <span aria-hidden="true"> ↗</span>
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <RecyclingIcon name="drive" />
                  <h2 id="product-modal-title">Secure data destruction for retired IT</h2>
                  <p className="product-modal-summary">{dataDestructionSummary}</p>
                  <div className="product-modal-details">
                    <section>
                      <h3>Choose a method for your drives</h3>
                      <ul className="category-list">
                        <li><strong>Physical destruction.</strong> The storage media is physically damaged and taken out of use. Ask about this option for damaged drives or where your policy requires destruction.</li>
                        <li><strong>Verified software erasure.</strong> Suitable working drives can be sanitised for reuse. For compatible hard drives, overwriting replaces stored data and a verification step checks the result. SSDs can require a different method, so share the drive type and model if you know them.</li>
                      </ul>
                      <p>Deleting files, quick-formatting a drive or resetting a device can leave data recoverable.</p>
                    </section>
                    <aside className="category-aside">
                      <h3>Before the handover</h3>
                      <ol className="category-list">
                        {dataDestructionSteps.map(([title, description]) => (
                          <li key={title}><strong>{title}.</strong> {description}</li>
                        ))}
                      </ol>
                    </aside>
                  </div>
                  <p>
                    <a className="text-link" href="https://ypecycle.com.au/data-erasure%2Foverwriting" target="_blank" rel="noopener noreferrer">
                      Read YP ECYCLE’s guide to software erasure <span aria-hidden="true">↗</span>
                    </a>
                  </p>
                </>
              )}
              <a className="button product-modal-enquiry" href="#contact" onClick={(event) => {
                event.preventDefault();
                window.history.replaceState({ ...window.history.state, recoreProduct: false }, "", "#contact");
                window.dispatchEvent(new HashChangeEvent("hashchange"));
                dialog.current?.close();
                const contact = document.getElementById("contact");
                if (dataDestructionSelected) {
                  const serviceField = contact?.querySelector<HTMLSelectElement>('select[name="service"]');
                  if (serviceField) serviceField.value = "destruction";
                }
                contact?.focus({ preventScroll: true });
                contact?.scrollIntoView();
              }}>
                {selected ? `Ask about ${selected.shortTitle.toLowerCase()}` : "Request a data destruction quote"} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
