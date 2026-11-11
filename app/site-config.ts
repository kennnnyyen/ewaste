import { contactDetails } from "./contact-details";

// Confirmed public domain. Keep canonical identity independent of preview hosts and old deployment settings.
export const siteUrl = "https://www.recore-cycle.com";
export const siteTitle = "Recore | E-waste Recycling & Data Destruction Melbourne";
export const serviceArea = "Melbourne and most of Victoria";
export const siteDescription =
  `Recycle retired IT, recover value from eligible components and arrange secure data destruction with Recore. Serving ${serviceArea}.`;

export const socialProfiles = {
  linkedin: "https://www.linkedin.com/company/recore-cycle",
  facebook: "https://www.facebook.com/recorecycle/",
  instagram: "https://www.instagram.com/recorecycle/",
};

export const organization = {
  "@type": "LocalBusiness",
  name: "Recore",
  telephone: contactDetails.phoneHref.replace("tel:", ""),
  email: contactDetails.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer enquiries",
    email: contactDetails.alternateEmail,
    telephone: contactDetails.phoneHref.replace("tel:", ""),
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: contactDetails.streetAddress,
    addressLocality: contactDetails.locality,
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  description: siteDescription,
  url: siteUrl,
  "@id": `${siteUrl}/#organisation`,
  areaServed: serviceArea,
  sameAs: Object.values(socialProfiles),
  logo: `${siteUrl}/icon.svg`,
};
