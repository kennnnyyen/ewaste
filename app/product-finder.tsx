"use client";
import Link from "next/link";
import { useState } from "react";
import { categories } from "./recycling-content";
import RecyclingIcon from "./recycling-icon";

export default function ProductFinder() {
  const [filter, setFilter] = useState("All products");
  const visible = categories.filter(
    (category) => filter === "All products" || category.group === filter,
  );
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
    </>
  );
}
