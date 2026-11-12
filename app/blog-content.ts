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
  description: string;
  image: BlogImage;
  topics: string[];
  example: string;
  sections: { heading: string; text: string; illustration?: BlogImage }[];
  checklist: string[];
  references?: { label: string; href: string }[];
  related: { label: string; href: string }[];
};

export const articles: BlogArticle[] = [
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
