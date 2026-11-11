"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Wordmark from "./recore-wordmark";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
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
        <button
          ref={button}
          className="menu-button"
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
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
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="button small nav-cta"
          href="/#contact"
          onClick={() => setOpen(false)}
        >
          Get a quote <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
