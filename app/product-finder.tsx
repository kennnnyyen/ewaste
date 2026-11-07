"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  const visible = categories.filter(
    (category) => filter === "All products" || category.group === filter,
  );

  useEffect(() => {
    const element = dialog.current;
    if (!selected || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (window.location.hash !== "#contact") trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);

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
          {visible.length} categories to explore
        </span>
      </div>
      <div className="product-grid">
        {visible.map((category) => (
          <Link
            className="product-card"
            href={`/recycling/${category.slug}`}
            key={category.slug}
            aria-haspopup="dialog"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              trigger.current = event.currentTarget;
              window.history.pushState(
                { ...window.history.state, recoreProduct: true },
                "",
                `#recycle-${category.slug}`,
              );
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }}
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
      </div>
      <dialog
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
        {selected && (
          <>
            <div className="product-modal-header">
              <span className="eyebrow">{selected.group} recycling</span>
              <button type="button" className="product-modal-close" onClick={closeProduct} autoFocus>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="product-modal-body">
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
              <a className="button product-modal-enquiry" href="#contact" onClick={(event) => {
                event.preventDefault();
                window.history.replaceState({ ...window.history.state, recoreProduct: false }, "", "#contact");
                window.dispatchEvent(new HashChangeEvent("hashchange"));
                dialog.current?.close();
                const contact = document.getElementById("contact");
                contact?.focus({ preventScroll: true });
                contact?.scrollIntoView();
              }}>
                Ask about {selected.shortTitle.toLowerCase()} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
