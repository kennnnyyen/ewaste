export const dataDestructionSummary =
  "Retiring laptops, desktops or servers? Recore can help you arrange secure handling for loose drives and storage still inside equipment. Share what you have, whether you want to reuse the drives and any security requirements so we can confirm a suitable method.";

export const dataDestructionSteps = [
  [
    "List what you have",
    "Include the number of drives or devices, whether they work and whether the drives are loose or still installed.",
  ],
  [
    "Confirm handling and scope",
    "Agree on the method, handover, chain-of-custody requirements and where the work will take place. Share any standard your organisation requires.",
  ],
  [
    "Agree what records you need",
    "Ask about serial-number tracking, verification results, or a certificate of destruction. We’ll confirm what documentation is available for your job.",
  ],
];

export const dataDestructionPath = "/data-destruction";

export const dataDestructionMethods = [
  {
    title: "Verified software erasure",
    description: "Suitable working drives can be sanitised for reuse. Overwriting can be appropriate for compatible hard drives. SSDs may need a device-specific method because ordinary overwriting can miss areas managed by the drive. Ask how the result will be verified.",
  },
  {
    title: "Physical destruction",
    description: "Ask about physical destruction for failed or damaged drives, or when your policy requires the media to be taken out of use. The method needs to suit the storage type, including the flash chips in SSDs.",
  },
  {
    title: "Degaussing for magnetic media",
    description: "YP ECYCLE, Recore’s sister company, describes degaussing as a method for suitable magnetic hard drives and tapes. It uses a strong magnetic field and is ineffective on SSDs and other flash storage. Ask Recore about availability for your job.",
  },
];

export const dataDestructionFaqs = [
  {
    question: "Is deleting files or formatting a drive enough before recycling?",
    answer: "Deleting files, quick-formatting or doing a basic reset can leave data recoverable. Before handing over retired equipment, agree on a sanitisation method suited to the storage media and how the outcome will be checked.",
  },
  {
    question: "What if a drive fails erasure or verification?",
    answer: "Agree on how exceptions will be handled before handover. For example, ask whether the drive can be set aside and assessed for physical destruction, and how the final outcome will be recorded.",
  },
  {
    question: "Can I get an erasure report or certificate of destruction?",
    answer: "Tell Recore which records you need before handover. Ask whether the job can include asset or drive serial numbers, chain-of-custody records, erasure verification results or a certificate of destruction. Recore will confirm what is available for your job.",
  },
];
