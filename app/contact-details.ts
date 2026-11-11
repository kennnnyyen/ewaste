const address = "2 Price St, Oakleigh South";
const mapsQuery = encodeURIComponent(`${address}, VIC, Australia`);

export const contactDetails = {
  phone: "0406 406 016",
  phoneHref: "tel:+61406406016",
  whatsappNumber: "61406406016",
  email: "info@recore-cycle.com",
  alternateEmail: "sales.recore@gmail.com",
  streetAddress: "2 Price St",
  locality: "Oakleigh South",
  address,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
};
