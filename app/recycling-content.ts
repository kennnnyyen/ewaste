import { contactDetails } from "./contact-details";

export type RecyclingCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  group: "Equipment" | "Components";
  icon: string;
  summary: string;
  examples: string[];
  prepare: string[];
  consideration: string;
};

export const categories: RecyclingCategory[] = [
  {
    slug: "computers-and-laptops",
    title: "Computer & laptop recycling",
    shortTitle: "Computers & laptops",
    group: "Equipment",
    icon: "computer",
    summary:
      "Give retired desktop PCs, laptops and all-in-one computers a considered next step, whether you have a few devices or a mixed business load.",
    examples: [
      "Desktop PCs and workstations",
      "Laptops and notebooks",
      "All-in-one computers, including iMacs",
      "Computer chassis and selected parts",
    ],
    prepare: [
      "List the approximate number of devices and their condition.",
      "Keep laptops, chargers and loose batteries clearly identified.",
      "Tell us which devices contain hard drives or SSDs before handover.",
    ],
    consideration:
      "Computers can hold personal or business data even when they no longer start. Discuss storage removal or data destruction before releasing devices.",
  },
  {
    slug: "printers-and-office-equipment",
    title: "Printer & office equipment recycling",
    shortTitle: "Printers & office IT",
    group: "Equipment",
    icon: "printer",
    summary:
      "Make space for what comes next. Enquire about desktop printers, multifunction devices and retired electronic office equipment.",
    examples: [
      "Laser and inkjet printers",
      "Multifunction printers and scanners",
      "Desktop office electronics",
      "Mixed printer and computer loads",
    ],
    prepare: [
      "Share the make, model and approximate size, especially for large units.",
      "Identify loose toner, ink and consumables separately.",
      "Describe stairs, loading access and any lifting requirements.",
    ],
    consideration:
      "Some multifunction printers retain scans, address books or documents on internal storage. Flag any confidential use and confirm handling for toner and consumables before arranging a load.",
  },
  {
    slug: "monitors-and-displays",
    title: "Monitor & display recycling",
    shortTitle: "Monitors & displays",
    group: "Equipment",
    icon: "display",
    summary:
      "Find the right recycling path for retired computer monitors and displays, with the screen type and condition assessed first.",
    examples: [
      "LCD and LED computer monitors",
      "Desktop display panels",
      "Screens from office IT upgrades",
      "Mixed displays for assessment",
    ],
    prepare: [
      "Identify LCD, LED or older CRT screens where possible.",
      "Keep screens upright and protect glass from damage.",
      "Send a photo of any cracked or dismantled displays.",
    ],
    consideration:
      "Older CRT displays and damaged screens need separate assessment. Acceptance, handling requirements and any charges must be confirmed before delivery.",
  },
  {
    slug: "servers-and-networking",
    title: "Server & networking equipment recycling",
    shortTitle: "Servers & networking",
    group: "Equipment",
    icon: "server",
    summary:
      "Plan a clear exit for retired infrastructure, from individual network switches to server equipment from an IT refresh.",
    examples: [
      "Rack and tower servers",
      "Network switches and routers",
      "Server boards and expansion cards",
      "Selected telecom and network hardware",
    ],
    prepare: [
      "Prepare an asset list or approximate equipment count.",
      "Identify storage drives, configuration data and removable media.",
      "Discuss the equipment weight, rack removal and handover arrangements.",
    ],
    consideration:
      "Servers and networking hardware may contain business data, credentials and configuration records. Confirm sanitisation and custody requirements before equipment changes hands.",
  },
  {
    slug: "circuit-boards",
    title: "Circuit board & motherboard recycling",
    shortTitle: "Circuit boards",
    group: "Components",
    icon: "board",
    summary:
      "Request an assessment for computer circuit boards and motherboards. Board type, grade and quantity help determine the available recovery value.",
    examples: [
      "Desktop and laptop motherboards",
      "Server circuit boards",
      "Graphics and expansion cards",
      "Mixed printed circuit boards (PCBs)",
    ],
    prepare: [
      "Separate board types if practical; avoid mixing them with general waste.",
      "Provide clear photos of both sides of representative boards.",
      "Include an estimated weight or count and note attached metal or batteries.",
    ],
    consideration:
      "Different board grades can have different values. Do not burn, chemically treat or break boards to recover metals; request an assessment in their existing condition.",
  },
  {
    slug: "processors-memory-and-graphics",
    title: "CPU, RAM & graphics card recycling",
    shortTitle: "CPUs, RAM & GPUs",
    group: "Components",
    icon: "chip",
    summary:
      "Recover the potential in loose processors, memory modules and graphics cards. Send photos so the component mix can be assessed accurately.",
    examples: [
      "CPUs and processors",
      "Desktop, laptop and server RAM",
      "GPUs and graphics cards",
      "Selected expansion cards",
    ],
    prepare: [
      "Keep processors, memory and graphics cards in separate groups.",
      "Photograph model markings where they are readable.",
      "Include the approximate count or weight of each component type.",
    ],
    consideration:
      "A quote depends on component type, grade, condition and current buying rates. Recovery value and payment terms are confirmed for each assessed load.",
  },
  {
    slug: "hard-drives-and-storage",
    title: "Hard drive & storage media recycling",
    shortTitle: "Drives & storage",
    group: "Components",
    icon: "drive",
    summary:
      "Treat the data and the device as separate priorities. Discuss data destruction before recycling hard drives, SSDs or other storage media.",
    examples: [
      "Computer and server hard drives",
      "Solid-state drives (SSDs)",
      "External storage devices",
      "Other data media for assessment",
    ],
    prepare: [
      "Count the drives and identify HDDs and SSDs separately.",
      "Note any asset tracking or serial-number records you need.",
      "Agree the destruction method and documentation before handover.",
    ],
    consideration:
      "Deleting files or formatting a drive is not the same as verified data destruction. Magnetic and flash media need different treatment; confirm a suitable method for your media.",
  },
  {
    slug: "cables-and-peripherals",
    title: "Computer cable & peripheral recycling",
    shortTitle: "Cables & peripherals",
    group: "Equipment",
    icon: "cable",
    summary:
      "Include the smaller items in your IT clean-out. Enquire about computer cables, keyboards, mice and selected computer accessories alongside your equipment.",
    examples: [
      "Computer and network cables",
      "Keyboards and mice",
      "Computer power supplies and adapters",
      "Selected electronic peripherals",
    ],
    prepare: [
      "Group cables and peripherals separately from whole devices.",
      "Identify loose batteries and damaged power supplies.",
      "Send photos of unusual accessories or mixed boxes.",
    ],
    consideration:
      "Battery-containing accessories and damaged electrical items need assessment. Ask about suitability before including batteries, consumables or items outside the listed IT categories.",
  },
];

export const faqs = [
  {
    question: "Where is Recore based?",
    answer:
      `Recore is based at ${contactDetails.address}, in Melbourne, Victoria. Call ${contactDetails.phone} or email ${contactDetails.email} to discuss your equipment. Confirm acceptance and an appointment before arranging delivery.`,
  },
  {
    question: "How do I get an e-waste recycling quote?",
    answer:
      "Use the contact form to share your equipment types, approximate quantities, condition and suburb or postcode. You can attach up to 10 JPEG, PNG or WebP photos, limited to 2 MB each and 3 MB combined. Recore assesses the load before confirming acceptance, any recovery value or charges, and handover arrangements.",
  },
  {
    question: "Is e-waste recycling free, or will I be paid for scrap?",
    answer:
      "There is no single price for every load. Charges or recovery value depend on the equipment, material grade, quantity, condition, location and service requirements. Ask Recore for an assessment and confirm the quote and payment terms before arranging transport or handover.",
  },
  {
    question: "What e-waste does Recore recycle?",
    answer:
      "Recore assesses computers, laptops, all-in-one PCs, printers, monitors, servers, networking equipment, circuit boards, CPUs, RAM, GPUs, hard drives, cables and selected peripherals. Send an item list or photos so we can confirm acceptance and any handling requirements for your load.",
  },
  {
    question: "Can I recycle a mixed load of office IT equipment?",
    answer:
      "Yes, you can enquire about a mixed load. Include the main equipment types, approximate quantities, condition and your suburb or postcode. Separate data-bearing devices, loose batteries and consumables so their handling can be agreed.",
  },
  {
    question: "Do you buy computer scrap and circuit boards?",
    answer:
      "Selected computer scrap and components can be assessed for recovery value. Quotes depend on material category, grade, quantity, condition and current buying rates. Acceptance, any charges and payment terms are confirmed before handover.",
  },
  {
    question: "Can you help with hard drives and data destruction?",
    answer:
      "Discuss data destruction before handing over computers, servers, drives or other data-bearing devices. Tell us the media types and quantities, any asset tracking you need, and the records your business requires. The method and documentation must be agreed for the job.",
  },
  {
    question: "Can I drop off equipment or arrange a collection?",
    answer:
      "Contact Recore with your location, equipment list and approximate load size first. We will confirm whether collection or an arranged handover is suitable, along with any charges and access requirements. Please wait for confirmation before travelling or sending equipment.",
  },
  {
    question: "What about batteries, toner or damaged screens?",
    answer:
      "Flag these items separately before arranging recycling. Loose or damaged batteries, printer consumables and broken or older CRT displays require specific assessment. Do not assume these items can be included with a standard IT load.",
  },
];

export const whatsappNumber = contactDetails.whatsappNumber;
export function enquiryUrl(
  message = "Hi Recore, I'd like to enquire about recycling IT equipment.",
) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
