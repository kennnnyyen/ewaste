import { dataDestructionPath } from "./data-destruction-content";

type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type BlogArticle = {
  slug: string;
  category: string;
  title: string;
  seoTitle?: string;
  description: string;
  image: BlogImage;
  imageCaption?: string;
  topics: string[];
  example?: string;
  fieldGuide?: { lead: string[]; heading: string; bullets: string[]; closing: string };
  intro?: string;
  closing?: string;
  story?: { lead: string[]; closing: string[]; website: string };
  sections: { heading: string; text: string; illustration?: BlogImage }[];
  checklist: string[];
  references?: { label: string; href: string }[];
  related: { label: string; href: string }[];
};

export const articles: BlogArticle[] = [
  {
    "slug": "circuit-board-recycling-quote",
    "category": "E-waste recycling",
    "title": "Two crates of circuit boards. Same weight. Different quote.",
    "seoTitle": "What affects a circuit board recycling quote?",
    "description": "Sorting circuit boards for recycling in Melbourne? Send representative photos, a weight or count, and details of attached metal or batteries.",
    "intro": "A crate of server boards can weigh the same as a crate of mixed desktop and laptop motherboards. But board type, grade and attached metal all affect how the lot is assessed.",
    "sections": [
      {
        "heading": "1. Sort by board type",
        "text": "Clearing out an IT storeroom or repair bench? Group server boards, motherboards and expansion cards by type if practical. Label the rest as mixed PCBs."
      },
      {
        "heading": "2. Photograph both sides",
        "text": "Take clear photos of both sides of one or two representative boards from each group."
      },
      {
        "heading": "3. Share a count or weight",
        "text": "Include an estimated weight or count, and let us know if there’s any attached metal or batteries. Leave the boards intact."
      }
    ],
    "checklist": [],
    "closing": "Already boxed everything together? Send a few photos of the mixed lot and we’ll tell you what else we need. Melbourne businesses can call or SMS Harry on **0406 406 016**, or see [Recore’s circuit board recycling guide](https://www.recore-cycle.com/recycling/circuit-boards).",
    "topics": [
      "Circuit board recycling",
      "Computer scrap",
      "Melbourne e-waste recycling"
    ],
    "related": [
      {
        "label": "Circuit board recycling",
        "href": "/recycling/circuit-boards"
      },
      {
        "label": "How to list CPUs, RAM and GPUs for recycling",
        "href": "/blogs/cpu-ram-gpu-recycling-inventory"
      }
    ],
    "image": {
      "src": "/images/blogs/circuit-board-recycling-quote.webp",
      "alt": "Motherboards and expansion cards sorted into separate trays on a workbench.",
      "width": 1000,
      "height": 1250
    }
  },
  {
    "slug": "cpu-ram-gpu-recycling-inventory",
    "category": "IT asset recovery",
    "title": "Upgraded a fleet? List the old CPUs, RAM and GPUs separately.",
    "seoTitle": "How to list CPUs, RAM and GPUs for recycling",
    "description": "Preparing a lot of old computer parts for recycling? List processors, RAM and graphics cards separately by type, quantity and condition.",
    "intro": "A drawer of old computer parts can be hard to assess from a single photo. A quick inventory helps. Start with the part type, quantity and condition. If you haven’t tested something, just say “untested”.",
    "sections": [
      {
        "heading": "What a useful inventory looks like",
        "text": "For example: **12 CPUs with model numbers visible, 30 server RAM sticks of mixed capacities, and 4 untested graphics cards.** Add a photo of any readable markings. No need to guess the grade."
      },
      {
        "heading": "What Recore assesses",
        "text": "Recore assesses processors, desktop and server memory, and graphics cards. Any recovery value depends on the parts, their condition and current rates."
      }
    ],
    "checklist": [],
    "closing": "Melbourne businesses can call or SMS Harry on **0406 406 016**, or see [CPU, RAM and graphics card recycling](https://www.recore-cycle.com/recycling/processors-memory-and-graphics).",
    "topics": [
      "IT asset recovery",
      "Computer parts recycling",
      "Melbourne e-waste recycling"
    ],
    "related": [
      {
        "label": "CPU, RAM and graphics card recycling",
        "href": "/recycling/processors-memory-and-graphics"
      },
      {
        "label": "What affects a circuit board recycling quote?",
        "href": "/blogs/circuit-board-recycling-quote"
      }
    ],
    "image": {
      "src": "/images/blogs/cpu-ram-gpu-recycling-inventory.webp",
      "alt": "A processor, two memory sticks and a graphics card laid out separately on a workbench.",
      "width": 1000,
      "height": 1250
    }
  },
  {
    "slug": "leased-office-it-before-e-waste-pickup",
    "category": "E-waste recycling",
    "title": "Before the e-waste pickup: are those laptops yours to recycle?",
    "seoTitle": "Are those laptops yours to recycle?",
    "description": "Clearing out office IT in Melbourne? Sort owned, leased and unverified laptops before pickup, and agree how data-bearing devices will be handled.",
    "image": {
      "src": "/images/blogs/leased-office-it-before-e-waste-pickup.webp",
      "alt": "Retired business laptops and storage drives laid out for an inventory check before collection.",
      "width": 1536,
      "height": 1024
    },
    "topics": [
      "Laptop recycling",
      "IT asset disposal",
      "Leased IT equipment",
      "Melbourne business recycling"
    ],
    "intro": "During a Melbourne office clear-out, it’s easy for old laptops to end up on one trolley. One may belong to your business, another may be due back to a leasing company, and a third may have no readable asset tag. Sort out who owns each device before it leaves the office.",
    "closing": "Already sorted your load? [Send Recore](https://www.recore-cycle.com/#contact) the equipment types, approximate quantities and postcode, or call or SMS Harry on 0406 406 016. We'll confirm acceptance, data requirements and whether your load qualifies for free pickup.",
    "sections": [
      {
        "heading": "1. Confirm what your business owns",
        "text": "Match each asset tag or device serial to your register, purchase records or lease schedule. Once your team has approved disposal, put the owned equipment on the recycling list. Flag data-bearing devices so you can agree on [verified erasure or secure destruction](https://www.recore-cycle.com/data-destruction) before handover."
      },
      {
        "heading": "2. Set aside equipment due back",
        "text": "Put leased or supplier-owned gear in a clearly marked return area. Check the agreement for return instructions, required accessories and responsibility for data removal. Agree on the approach with your IT team and the provider before removing a drive or wiping any device. [Australian Government guidance on leasing and buying equipment](https://business.gov.au/finance/leasing-or-buying-vehicles-and-equipment)."
      },
      {
        "heading": "3. Put anything unverified on hold",
        "text": "If a serial doesn’t match or ownership is unclear, set the device aside and assign someone in IT or finance to follow up. A simple list showing the asset ID, who owns the follow-up and what happens next lets the rest of the pickup go ahead."
      }
    ],
    "checklist": [],
    "related": []
  },
  {
    "slug": "swollen-laptop-battery-office-clear-out",
    "category": "E-waste recycling",
    "title": "What to do with a swollen laptop battery before an office clear-out",
    "seoTitle": "Swollen laptop battery? An office clear-out guide",
    "description": "Found a swollen laptop battery during an office clear-out? Learn what to keep out of the recycling load and what to confirm before collection.",
    "image": {
      "src": "/images/blogs/swollen-laptop-battery-office-clear-out.webp",
      "alt": "Retired laptop set apart from other IT equipment and identified with a red hold tag.",
      "width": 1536,
      "height": 1024
    },
    "topics": [
      "Laptop battery safety",
      "IT asset disposal",
      "Office e-waste recycling",
      "Melbourne business recycling"
    ],
    "fieldGuide": {
      "lead": [
        "You’re clearing the IT cupboard and spot a laptop with a lifted trackpad or a case that’s starting to split. Both can be signs of a swollen battery. Flag the laptop to your IT or facilities team before it gets packed with the rest. Don’t use it, charge it or try to pry the battery out.",
        "The risk continues after your equipment leaves the office. Glen Eira City Council reported two waste-truck fires in June 2026. The council said the evidence pointed to lithium-ion batteries placed in kerbside recycling bins. Nobody was injured, but the fires took the loads out of the recycling stream. [Glen Eira City Council’s incident report](https://www.gleneira.vic.gov.au/about-council/news/latest-news/firey-reminder-to-keep-batteries-out-of-bins)"
      ],
      "heading": "Flag damaged equipment before you pack the rest",
      "bullets": [
        "**Check what you can see without opening devices.** Note laptops or tablets with bulging cases, and any leaking or damaged power banks or loose batteries. Don’t plug in suspect devices to see if they still work. [ACCC lithium-ion battery safety guide](https://www.productsafety.gov.au/consumers/handle-chemicals-and-poisons-safely/lithium-ion-batteries-guide)",
        "**Keep suspected damaged items out of the standard load.** Tell your safety lead what you found. Before moving or transporting anything, confirm with an appropriate specialist how that item should be managed and who can accept it. Don’t put batteries or electronics into general waste or ordinary recycling bins. If a device starts smoking or catches fire, evacuate and call Triple Zero (000) from a safe place. [EPA Victoria’s e-waste guidance](https://www.epa.vic.gov.au/electronic-waste) · [Fire Rescue Victoria](https://www.frv.vic.gov.au/what-do-after-fire)",
        "**Record the data requirement separately.** When a suspect laptop also contains business data, flag both issues in your asset list. Have your team agree how storage will be handled before release; don’t power up the damaged laptop to wipe it."
      ],
      "closing": "Planning a Melbourne office or IT clear-out? [Contact Recore](https://www.recore-cycle.com/#contact) with your equipment types, approximate quantities, postcode and any data-handling needs. Flag suspected battery damage up front so the appropriate arrangements can be confirmed before anything moves. For eligible equipment, you can also ask about [computer and laptop recycling](https://www.recore-cycle.com/recycling/computers-and-laptops) and [secure data destruction](https://www.recore-cycle.com/data-destruction)."
    },
    "sections": [],
    "checklist": [],
    "related": []
  },
  {
    "slug": "office-printer-recycling-melbourne",
    "category": "E-waste recycling",
    "title": "Before the old office printer leaves: three decisions to make",
    "description": "The new printer is installed. The old one is still in the print room, with a box of spare toner beside it. Before anyone books a pickup, settle these three things.",
    "image": {
      "src": "/images/blogs/office-printer-recycling.webp",
      "alt": "Freestanding office printer beside a separate carton of toner cartridges.",
      "width": 1122,
      "height": 1402
    },
    "topics": [
      "Office printer recycling",
      "Multifunction printer recycling",
      "Office equipment recycling",
      "Melbourne e-waste collection"
    ],
    "sections": [
      {
        "heading": "1. Who owns it?",
        "text": "Ask procurement whether the printer is owned or leased. If it’s leased, check the agreement and agree the return process with the supplier before booking recycling. If it’s owned and still working, check whether another team can use it or the supplier offers take-back.\n\nSome multifunction models retain address books, settings or image data. Ask IT to check the exact model and confirm how to clear it before it leaves."
      },
      {
        "heading": "2. Where does the toner go?",
        "text": "List loose cartridges and toner bottles separately rather than assuming they go with the machine. Cartridges 4 Planet Ark offers a separate recycling route for eligible used cartridges. The printer itself is electronic equipment; Victorian landfills cannot accept e-waste."
      },
      {
        "heading": "3. Can it get out of the building?",
        "text": "Send the make and model, approximate size, quantities, photos and pickup suburb. Mention stairs, lift or loading dock access, and any lifting requirements before the collection is booked. A desktop unit and a freestanding copier can need different arrangements.\n\nPlanning a printer clear-out in Melbourne? Talk to Harry on 0406 406 016 or email info@recore-cycle.com. Recore assesses laser, inkjet and multifunction printers. Acceptance, any fees and pickup options depend on the load. Flag loose toner and ink separately."
      }
    ],
    "checklist": [
      "Make, model, approximate size and quantity",
      "Photos, pickup suburb and access or lifting requirements",
      "Loose cartridges, toner bottles and any data-handling requirements"
    ],
    "references": [
      {
        "label": "Cartridges 4 Planet Ark",
        "href": "https://planetark.com/programs/cartridges-4-planet-ark"
      },
      {
        "label": "EPA Victoria: electronic waste",
        "href": "https://www.epa.vic.gov.au/electronic-waste"
      },
      {
        "label": "Ricoh: information stored on equipment at end of life",
        "href": "https://www.ricoh.com/support/information"
      }
    ],
    "related": [
      {
        "label": "Recore: printer and office equipment recycling",
        "href": "/recycling/printers-and-office-equipment"
      }
    ]
  },
  {
    "slug": "why-e-waste-recycling-matters",
    "category": "E-waste recycling",
    "title": "Why e-waste recycling belongs in your next IT upgrade",
    "description": "When new laptops arrive, what happens to the old ones? If there’s no plan, usable computers can sit in a storeroom for years, while batteries, cables and devices that still hold business data end up in the same pile.",
    "image": {
      "src": "/why-e-waste-recycling-matters.png",
      "alt": "Illustration of retired laptops, a desktop and a monitor beside a Recore-tagged collection crate",
      "width": 1536,
      "height": 1024
    },
    "imageCaption": "Illustration of retired office IT awaiting collection.",
    "topics": [
      "E-waste recycling",
      "Electronics recycling",
      "IT asset recovery",
      "Secure data destruction",
      "Melbourne businesses"
    ],
    "sections": [
      {
        "heading": "Why recycling electronics matters",
        "text": "In 2022, the world generated 62 million tonnes of e-waste, but only 22.3% was recorded as collected and recycled through formal channels. Retired computers and other electronics contain materials such as copper and iron that can be recovered. Keeping working equipment in use where practical, and recycling what can’t be reused, gives those devices and materials another useful life.\n\nThere’s a safety reason to keep electronics separate, too. Victorian landfills cannot accept e-waste, and EPA Victoria warns that lithium-ion batteries can start fires if they’re disposed of incorrectly. Keep electronics and batteries out of ordinary rubbish and recycling bins. Flag damaged batteries before arranging a pickup so the recycler can advise how to handle them."
      },
      {
        "heading": "Give the old equipment a plan before the new equipment arrives",
        "text": "1. Identify what can stay in use. Set aside equipment your team can redeploy or have assessed for reuse.\n\n2. Plan for the data. Identify devices that still hold business records and agree how drives will be erased or destroyed before handing them over.\n\n3. Confirm what can be collected. List the equipment, approximate quantities and collection suburb. Ask which items are accepted and whether any need separate handling.\n\nPlanning a Melbourne office upgrade? Send Harry your equipment list at info@recore-cycle.com or call 0406 406 016. Recore can advise on recycling, collection and secure data destruction for eligible equipment."
      }
    ],
    "checklist": [
      "Equipment types and approximate quantities",
      "Collection suburb and any items that need separate handling",
      "Data-bearing devices and any erasure or destruction requirements"
    ],
    "references": [
      {
        "label": "Global E-waste Monitor 2024",
        "href": "https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling"
      },
      {
        "label": "EPA Victoria guidance on electronic waste",
        "href": "https://www.epa.vic.gov.au/electronic-waste"
      }
    ],
    "related": [
      {
        "label": "Computer and laptop recycling",
        "href": "/recycling/computers-and-laptops"
      },
      {
        "label": "Secure data destruction",
        "href": "/data-destruction"
      }
    ]
  },
  {
    slug: "recycling-old-routers-and-switches",
    category: "Data destruction",
    title: "Before you recycle a router or switch, check what it remembers",
    description: "Routers, switches and firewalls may retain settings or credentials. Check how to clear old network equipment before it leaves your control.",
    image: {
      src: "/images/blogs/retired-network-switch.webp",
      alt: "An unplugged Ethernet cable lies next to a retired switch and a Recore intake card",
      width: 1122,
      height: 1402,
    },
    imageCaption: "AI-generated editorial illustration, not a photo of real equipment or a Recore facility.",
    topics: ["Network equipment recycling", "Router and switch sanitisation", "Secure data destruction", "Melbourne e-waste collection"],
    example: "A router, switch or firewall may still hold network settings or credentials after it leaves the rack. Decide who will clear it and how they will verify the result before it leaves your control.",
    sections: [
      {
        heading: "Check the exact model",
        text: "The Australian Signals Directorate advises following device-specific or vendor guidance first. Ask your IT team or provider to confirm the applicable procedure and record the outcome.",
      },
      {
        heading: "Set exceptions aside",
        text: "If a unit won’t power on or the result can’t be verified, keep it out of the general recycling load until your team agrees on appropriate handling.",
      },
      {
        heading: "What to send Recore",
        text: "For a Melbourne collection enquiry, share equipment types, approximate quantities, pickup suburb and handling requirements with Recore on 0406 406 016 or info@recore-cycle.com. Leave out passwords and configuration files.",
      },
    ],
    checklist: ["Equipment types and approximate quantities", "Pickup suburb", "Handling requirements"],
    references: [
      { label: "Australian Signals Directorate: sanitising network devices", href: "https://www.cyber.gov.au/ism/guidelines-for-information-technology-equipment#sanitising-network-devices" },
    ],
    related: [
      { href: "/recycling/servers-and-networking", label: "Recore: servers and networking" },
      { href: dataDestructionPath, label: "Secure data destruction in Melbourne" },
    ],
  },
  {
    slug: "failed-ssd-warranty-return-data-plan",
    category: "Data destruction",
    title: "A failed SSD still deserves a data plan",
    description: "Before returning a failed SSD under warranty, check whether you can keep it and agree how the data will be handled.",
    image: {
      src: "/images/blogs/failed-ssd-warranty-return.webp",
      alt: "Illustration of an SSD beside an open laptop and a Recore-branded card on a workbench",
      width: 1122,
      height: 1402,
    },
    imageCaption: "AI-generated illustration of a warranty repair workbench.",
    topics: ["Failed SSD warranty return", "Drive retention", "SSD sanitisation", "Secure data destruction"],
    example: "A laptop won’t boot. The supplier has offered a replacement drive under warranty. Before sending the original drive back, the IT team checks what the support agreement says about retaining the failed drive and how to handle the data.",
    sections: [
      {
        heading: "A fault is not proof the data was erased",
        text: "A drive your team can’t read isn’t necessarily a drive whose data has been erased. Treat the SSD as data-bearing until your organisation has verified the sanitisation outcome or arranged appropriate destruction. Keep the drive secure while you decide what happens next.",
      },
      {
        heading: "Check whether your support plan lets you keep the drive",
        text: "Check your own contract and ask the supplier before approving the return. Dell Australia, for example, lists a Keep Your Hard Drive service on eligible support plans. If your plan allows retention, keep control of the failed drive and arrange a sanitisation or destruction method approved by your organisation.",
      },
      {
        heading: "If the drive must go back, agree on data handling before dispatch",
        text: "Ask the supplier how it handles returned data-bearing drives and what evidence it can provide. Confirm that the proposed process meets your organisation’s requirements before the drive leaves your control. If those requirements can’t be met, raise it with the person responsible for information security before dispatch.",
      },
    ],
    checklist: [
      "Type and approximate number of failed drives",
      "Whether your warranty or support plan requires a return",
      "Your organisation’s data-handling and evidence requirements",
    ],
    references: [
      { label: "Dell Australia: ProSupport Suite and Keep Your Hard Drive", href: "https://www.dell.com/en-au/learn/services/lp/prosupport-suite-for-pcs" },
      { label: "NIST SP 800-88 Rev. 2: Guidelines for Media Sanitization", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final" },
    ],
    related: [
      { href: dataDestructionPath, label: "Secure data destruction in Melbourne" },
      { href: "/blogs/hard-drive-destruction-vs-software-erasure", label: "Hard drive destruction vs verified software erasure" },
    ],
  },
  {
    slug: "check-proof-of-data-destruction",
    category: "Data destruction",
    title: "The asset tag was still on: checking proof of data destruction",
    description: "A USAID watchdog case shows why device inventories, custody records and verified treatment should agree before you close a destruction job.",
    image: {
      src: "/data-destruction-machine-art.webp",
      alt: "Generic illustration of a physical data destruction machine",
      width: 1024,
      height: 1024,
    },
    imageCaption: "Generic equipment illustration, not a photo of the incident.",
    topics: ["Proof of data destruction", "Asset reconciliation", "Chain of custody", "IT asset disposal"],
    example: "In September 2025, the USAID Office of Inspector General reported that investigators recovered phones still carrying USAID barcodes. Hundreds of phones and computers had been diverted from a contracted destruction process and resold, and false destruction certificates were issued. The report documents what happened to the equipment, not whether anyone accessed the data.",
    sections: [
      {
        heading: "What left your site?",
        text: "Build an inventory before the equipment is collected. Record the asset ID or serial number for each device or drive when your process requires item-level tracking. Note which devices and storage media need secure data destruction.",
      },
      {
        heading: "Who took custody, and when?",
        text: "Keep a record of who took custody and when. Confirm what handover records your provider can supply and how they will link to your inventory. That gives your team a way to trace a specific device if something doesn’t match.",
      },
      {
        heading: "Does the evidence match the equipment?",
        text: "Match your equipment list to the evidence of verified erasure or physical destruction, as appropriate. If an item is missing or its status is unclear, leave that item open until you know why. A certificate is more useful when you can trace it back to the equipment it covers.",
      },
    ],
    checklist: [
      "Equipment types, approximate quantities and collection suburb",
      "Which devices or loose drives require data destruction",
      "Any item-level tracking, custody or evidence requirements; no serial numbers needed for an initial enquiry",
    ],
    references: [
      { label: "USAID Office of Inspector General: investigative summary, 9 September 2025", href: "https://oig.usaid.gov/node/7897" },
    ],
    related: [
      { href: dataDestructionPath, label: "Secure data destruction in Melbourne" },
      { href: "/blogs/office-it-recycling-checklist", label: "Office IT recycling checklist" },
    ],
  },
  {
    slug: "the-last-room-to-clear-on-moving-day",
    category: "IT asset recovery",
    title: "The last room to clear on moving day",
    description: "Follow a fictional Melbourne office move and see how Recore handles retired IT collection, asset recovery, recycling and secure data destruction.",
    image: {
      src: "/recore-moving-day-it-collection.webp",
      alt: "Retired computers and monitors on a collection trolley at the door of an office IT room.",
      width: 1536,
      height: 1024,
    },
    topics: ["Office IT recycling", "IT asset recovery", "Secure data destruction", "Melbourne office moves"],
    story: {
      lead: [
        "At 4:30, there was one room left to clear.",
        "The removalists had taken the desks. The network gear going to the new office was already boxed. In the old IT room, three shelves still held laptops, monitors, a few small servers and a box of loose drives.",
        "In this imagined office move, facilities coordinator Alex and the IT lead do one last walk-through. They match the retired equipment to the asset list, set aside two laptops that are still on loan and flag the drives for data destruction. By the time the Recore crew arrives, Alex can point to what is ready to leave and say what each group needs.",
      ],
      closing: [
        "Alex shuts the IT room door with the keys in one hand and the checked list in the other. The room is clear, and the retired equipment has a plan beyond the loading bay.",
        "Moving office or replacing a fleet in Melbourne? Tell Recore what equipment you have, roughly how much there is and which devices need data destruction. Call 0406 406 016 or email info@recore-cycle.com.",
      ],
      website: "https://www.recore-cycle.com/",
    },
    sections: [
      {
        heading: "One pickup, different next steps",
        text: "Recore collects retired IT equipment and assesses it for asset recovery or e-waste recycling. A laptop with reuse potential and a broken monitor can leave on the same collection, with their handling agreed for the job. Where equipment contains data, the customer can arrange secure data destruction with Recore and confirm which records are available for the agreed scope.\n\nBefore collection, agree what is being picked up, which assets or media need data destruction, and what documentation you will need afterwards. On pickup day, use the asset list to check what leaves and record any exceptions. When the job records arrive, you can reconcile them against the list.",
      },
    ],
    checklist: [
      "Equipment types, approximate quantities and collection suburb",
      "Devices or media that need secure data destruction",
      "Any asset tracking or documentation your team needs after pickup",
    ],
    related: [
      { href: "/blogs/office-it-recycling-checklist", label: "Office IT recycling checklist" },
      { href: dataDestructionPath, label: "Secure data destruction" },
    ],
  },
  {
    slug: "what-makes-old-computer-parts-worth-recycling",
    category: "Component recovery",
    title: "What makes old computer parts worth recycling?",
    description: "Follow old computer parts from collection to recycling, see what recovered metals can become, and find out how to get a quote in Victoria.",
    image: {
      src: "/e-waste-recycling-lifecycle.webp",
      alt: "A copper ribbon leads from retired computers through a sorting workshop to recovered metal and new components",
      width: 1440,
      height: 810,
    },
    topics: ["Computer scrap recycling", "Circuit board recycling", "CPU and RAM recycling", "E-waste recovery Victoria"],
    example: "A Melbourne IT team clears a storeroom and finds a box of loose server memory, a stack of mixed motherboards and six intact desktops. It photographs the memory labels and both sides of a few representative boards, then lists the desktops separately and flags that they still contain drives. Recore can use that breakdown to assess the components and discuss data handling for the desktops.",
    sections: [
      {
        heading: "From office clean-out to a second life",
        text: "After collection, equipment can be sorted by type and condition. A tested graphics card or a set of compatible RAM may keep another computer running. If you plan to redeploy working equipment, record the model, condition and test result, and agree on how to handle any data-bearing drives. Parts unsuitable for reuse can go to specialist recyclers for dismantling, sorting and material recovery.",
      },
      {
        heading: "What recovered metals can become",
        text: "Motherboards contain copper tracks, and some contacts use a thin layer of gold to resist corrosion. Aluminium is commonly found in heat sinks. Once recovered and refined to the required grade, copper can go into electrical wiring or motor windings, and aluminium can go into new housings or brackets. The mix of metals varies between parts, so two boxes of the same weight can have different recovery values.",
      },
      {
        heading: "Why proper handling matters for people and waterways",
        text: "Reusing working parts keeps equipment in service for longer. Recovering metals for manufacturing can reduce demand for newly mined material. Unsafe dumping or burning of electronics can release pollutants into the air, soil and water, exposing workers and nearby communities. Victoria bans e-waste from landfill. Keeping electronics separate from general waste helps reduce these risks and makes material recovery possible.",
        illustration: {
          src: "/e-waste-recycling-community.webp",
          alt: "A family and a cyclist use a path beside a Melbourne creek, with layers of soil and water visible in cross-section",
          width: 1440,
          height: 810,
        },
      },
      {
        heading: "What affects a computer scrap quote?",
        text: "Recore looks at what you have, its grade, the quantity and condition, and current buying rates. Grade reflects the type and composition of the material. A box of identifiable server boards and a box of mixed boards with attached brackets may be assessed differently. Recore can confirm whether your load has recovery value, whether any charges apply and what the payment terms are before handover.",
      },
      {
        heading: "Photograph what you already have",
        text: "Group loose boards, CPUs, RAM and graphics cards where practical. Take photos of representative pieces in good light, including readable model markings and both sides of a few boards. Note approximate counts or weights, attached metal or batteries, and which equipment is still assembled. If everything is mixed or still installed, send photos of it as it is and ask Recore what preparation is needed.",
      },
    ],
    checklist: ["Photos showing component types, labels and overall condition", "Approximate count or weight for each group and any intact equipment", "Collection suburb or postcode, preferred timeframe and any data-handling requirements"],
    references: [
      { label: "U.S. EPA guide to electronics reuse and recycling", href: "https://www.epa.gov/electronics-batteries-management/electronics-basic-information-research-and-initiatives" },
      { label: "Victorian Government guidance on the e-waste ban", href: "https://www.vic.gov.au/e-waste-ban" },
      { label: "World Health Organization fact sheet on e-waste and health", href: "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)" },
    ],
    related: [
      { href: "/recycling/circuit-boards", label: "Circuit board and motherboard recycling" },
      { href: "/recycling/processors-memory-and-graphics", label: "CPU, RAM and graphics card recycling" },
    ],
  },
  {
    slug: "office-it-recycling-checklist",
    category: "IT recycling",
    title: "Office IT recycling checklist for Victorian businesses",
    description: "Plan an office clean-out or IT refresh with a checklist for inventory, data handling, equipment assessment and handover.",
    image: {
      src: "/recycling-equipment-hero.webp",
      alt: "Illustration of retired computers, a printer and networking equipment grouped for recycling",
      width: 1440,
      height: 960,
    },
    topics: ["Office IT recycling", "E-waste recycling Victoria", "IT asset retirement", "Component recovery"],
    example: "An office is replacing 30 laptops, 12 monitors and two printers. Its IT team flags the laptops for data handling, its facilities team records the collection postcode and access hours, and both teams use the same inventory to check what leaves the office.",
    checklist: ["Equipment types, quantities and condition", "Data-bearing devices and tracking requirements", "Postcode, access details and preferred timeframe"],
    sections: [
      {
        heading: "Build an inventory before you pack",
        text: "Group desktops, laptops, monitors, printers and networking equipment by type. Record approximate quantities and note which equipment is damaged or missing parts. A few photos of each group help Recore understand the load. Keep asset tags visible if your organisation needs to reconcile the equipment against an asset register.",
      },
      {
        heading: "Flag equipment that can hold data",
        text: "Identify laptops, desktops, servers and loose storage drives before anyone moves the equipment. Check your organisation’s retention requirements and confirm what needs to be kept. If your team needs serial-number tracking or evidence of sanitisation, raise those requirements when you request a quote.",
      },
      {
        heading: "Separate material streams for assessment",
        text: "Keep loose batteries, toner and damaged screens separate. Identify any boxes of circuit boards, processors or memory so they can be assessed separately from complete equipment. Share photos and quantities before transport so Recore can confirm acceptance and any charges or recovery value.",
      },
      {
        heading: "Confirm the handover",
        text: "Send your inventory, postcode and preferred timeframe. For an office move, mention loading access, stairs and when the equipment must be cleared. Recore can confirm the available handover arrangements for your job. Agree on acceptance and timing before arranging delivery.",
      },
    ],
    related: [
      { href: "/recycling/computers-and-laptops", label: "Computer and laptop recycling" },
      { href: "/recycling/servers-and-networking", label: "Server and networking equipment recycling" },
    ],
  },
  {
    slug: "hard-drive-destruction-vs-software-erasure",
    category: "Data destruction",
    title: "Hard drive destruction vs verified software erasure",
    description: "Compare two options for retiring HDDs and SSDs, and find out what to confirm about drive reuse, custody and documentation.",
    image: {
      src: "/data-destruction-machine-art.webp",
      alt: "Illustration of a physical data destruction machine",
      width: 1024,
      height: 1024,
    },
    topics: ["Secure data destruction", "Hard drive destruction", "Verified software erasure", "SSD sanitisation"],
    example: "A business retiring 40 laptops wants to redeploy 25 and recycle the rest. It can ask about verified erasure for working drives intended for reuse and physical destruction for drives that have failed or must be destroyed under its policy. The asset register should show the outcome for each drive if serial-number tracking is required.",
    checklist: ["HDDs and SSDs, with model and condition where known", "Which drives should be kept for reuse", "Required method, custody records and evidence"],
    references: [{
      label: "NIST SP 800-88 Rev. 2, Guidelines for Media Sanitization",
      href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final",
    }],
    sections: [
      {
        heading: "Start with whether the drives will be reused",
        text: "Physical destruction takes the storage media out of use. Ask about it if drives are damaged or your organisation requires physical destruction. Verified software erasure may be an option for suitable working drives you intend to reuse. Check whether the method and verification satisfy your organisation’s requirements before deciding.",
      },
      {
        heading: "Identify the storage type and condition",
        text: "List hard drives and SSDs separately when you can. Note the model, whether the drives still work and whether they are loose or installed in equipment. Suitable methods can differ between HDDs and SSDs. Ask how the proposed method will be checked and what happens if a drive fails verification.",
      },
      {
        heading: "Specify the records you need before handover",
        text: "Tell Recore if you need serial-number tracking, chain-of-custody records, an erasure verification result or a certificate of destruction. Confirm which records are available for the job, who will perform the work and how the records will match your inventory.",
      },
      {
        heading: "Send the information needed for a quote",
        text: "Include the drive count, equipment types, postcode and any deadline. Mention whether preserving the drives for reuse matters and list any mandatory handling requirements. Recore can then confirm which options are suitable and what to agree before the equipment changes hands.",
      },
    ],
    related: [
      { href: dataDestructionPath, label: "Melbourne data destruction and drive erasure" },
      { href: "/recycling/hard-drives-and-storage", label: "Hard drive and storage recycling" },
    ],
  },
];
