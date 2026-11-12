"use client";

import { useId, useRef } from "react";

const certifications = [
  {
    standard: "ISO 9001",
    scope: "Quality management",
    description: "ISO 9001 sets requirements for managing quality. It helps organisations define consistent processes, check that they meet customer requirements and improve how they work.",
    example: "For an e-waste operation, this could mean checking incoming equipment against a handover list, recording discrepancies and reviewing recurring errors so they can be addressed.",
  },
  {
    standard: "ISO 14001",
    scope: "Environmental management",
    description: "ISO 14001 sets requirements for managing environmental impacts. It helps organisations identify risks, manage issues such as waste and pollution, and track improvements in environmental performance.",
    example: "For an e-waste operation, this could mean identifying spill and contamination risks, setting waste reduction targets and tracking how much material is sent for reuse, recycling or disposal.",
  },
  {
    standard: "ISO 45001",
    scope: "Occupational health and safety",
    description: "ISO 45001 sets requirements for managing workplace health and safety. It helps organisations identify hazards, reduce risks and prevent work-related injuries and illness.",
    example: "For an e-waste operation, this could mean assessing manual handling risks, training workers to move heavy equipment safely and reviewing near misses to improve site procedures.",
  },
  {
    standard: "AS/NZS 5377",
    scope: "E-waste collection, storage, transport and treatment",
    description: "AS/NZS 5377 is an Australian and New Zealand standard for handling end-of-life electrical and electronic equipment. It sets minimum requirements for safe and environmentally responsible collection, storage, transport and treatment.",
    example: "In practice, this can include storing equipment to minimise damage, securing loads during transport and separating materials such as batteries from other e-waste so they can be handled appropriately.",
  },
];

function CertificationTile({ standard, scope, description, example }: (typeof certifications)[number]) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="certification-tile"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <strong>{standard}</strong>
        <span>{scope}</span>
        <span className="certification-tile-icon" aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className="product-modal certification-modal"
        aria-labelledby={titleId}
        onClose={() => trigger.current?.focus({ preventScroll: true })}
      >
        <div className="product-modal-header">
          <span>YP ECYCLE certifications</span>
          <form method="dialog">
            <button type="submit" className="product-modal-close">
              Close <span aria-hidden="true">×</span>
            </button>
          </form>
        </div>
        <div className="product-modal-body">
          <h3 id={titleId}>{standard} · {scope}</h3>
          <p className="certification-modal-description">{description}</p>
          <h4>How it applies to e-waste</h4>
          <p className="certification-modal-example">{example}</p>
          <a className="text-link" href="https://ypecycle.com.au/about-yp-1" target="_blank" rel="noopener noreferrer">
            View YP ECYCLE’s certificate documents <span aria-hidden="true">↗</span>
          </a>
        </div>
      </dialog>
    </>
  );
}

export default function CertificationGrid() {
  return (
    <div className="certification-grid">
      {certifications.map((certification) => (
        <CertificationTile key={certification.standard} {...certification} />
      ))}
    </div>
  );
}
