const streetAddress = "2 Price St";
const locality = "Oakleigh South";
const region = "VIC";
const postalCode = "3167";
const address = `${streetAddress}, ${locality} ${region} ${postalCode}, Australia`;
const mapsQuery = encodeURIComponent(address);

export const contactDetails = {
  phone: "0406 406 016",
  phoneHref: "tel:+61406406016",
  whatsappNumber: "61406406016",
  email: "info@recore-cycle.com",
  alternateEmail: "sales.recore@gmail.com",
  streetAddress,
  locality,
  region,
  postalCode,
  address,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
};
