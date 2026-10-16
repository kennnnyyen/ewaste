"use client";

import Image from "next/image";
import { useState } from "react";

const components = [
  { name: "CPUs", title: "Small component. Real potential.", image: "cpus", category: "Processors & chips", detail: "Share the processor type, approximate quantity and clear photos. We will assess the category and confirm a quote.", code: "CPU" },
  { name: "PCBs", title: "A new chapter for every board.", image: "pcbs", category: "PCBs & motherboards", detail: "Show us the board types and an estimated weight or quantity. Clear photos help us identify the material grade.", code: "PCB" },
  { name: "RAM", title: "Old memory. New possibilities.", image: "ram", category: "RAM & memory modules", detail: "Tell us the memory type and approximate quantity. Include a photo of both sides so we can assess the modules.", code: "RAM" },
  { name: "GPUs", title: "Retired graphics. Recovered value.", image: "gpus", category: "GPUs & expansion cards", detail: "Include the card models, condition and quantity. We will confirm suitability and the right recovery pathway.", code: "GPU" },
];

export default function RecoveryExplorer() {
  const [selected, setSelected] = useState(0);
  const component = components[selected];

  return (
    <div className="recovery-explorer" aria-label="Explore computer component recovery">
      <div className="explorer-top mono"><span><i /> Material explorer</span><span>01 — 04</span></div>
      <div className="explorer-controls" role="group" aria-label="Choose a component">
        {components.map(({ name }, index) => <button type="button" key={name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{name}</button>)}
      </div>
      <div className="explorer-stage">
        <div className="orbit orbit-outer" aria-hidden="true" /><div className="orbit orbit-inner" aria-hidden="true" />
        <span className="stage-cross cross-top" aria-hidden="true">+</span><span className="stage-cross cross-bottom" aria-hidden="true">+</span>
        <span className="stage-code mono" aria-hidden="true">RC / {component.code}</span>
        <div className="explorer-art" key={component.image}>
          <Image src={`/materials/${component.image}-art.webp`} alt="" fill sizes="(max-width: 600px) 75vw, (max-width: 900px) 420px, 360px" loading="eager" />
        </div>
        <span className="recovery-tag mono"><span aria-hidden="true">↗</span> Potential, recovered</span>
      </div>
      <div className="explorer-description" aria-live="polite" aria-atomic="true">
        <span className="mono">{component.category}</span>
        <h2>{component.title}</h2>
        <p>{component.detail}</p>
      </div>
      <a className="explorer-link" href="#contact">Let’s assess your components <span aria-hidden="true">↗</span></a>
    </div>
  );
}
