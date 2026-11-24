"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Wordmark from "./recore-wordmark";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  function closeAndFocus(href: string) {
    setOpen(false);
    if (pathname === "/" && href.startsWith("/#")) {
      // Keep the normal fragment navigation but move keyboard focus out of
      // the collapsing disclosure and onto the destination.
      const target = document.getElementById(href.slice(2));
      window.requestAnimationFrame(() => target?.focus({ preventScroll: true }));
    }
  }
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="container nav">
        <Link
          className="brand"
          href="/"
          aria-label="Recore home"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>
        <Link
          className="button small nav-cta nav-cta-mobile"
          href="/#contact"
          onClick={() => closeAndFocus("/#contact")}
        >
          Get a quote <span aria-hidden="true">↗</span>
        </Link>
        <button
          type="button"
          ref={button}
          className="menu-button"
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"} <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Primary navigation"
        >
          {[
            ["What we recycle", "/#products"],
            ["Our services", "/#services"],
            ["How it works", "/#process"],
            ["FAQs", "/#faq"],
            ["Blogs", "/blogs"],
            ["Contact us", "/#contact"],
          ].map(([label, href]) => (
            <Link href={href} key={href} onClick={() => closeAndFocus(href)}>
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="button small nav-cta nav-cta-desktop"
          href="/#contact"
          onClick={() => closeAndFocus("/#contact")}
        >
          Get a quote <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
