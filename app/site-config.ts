// Only a verified public origin should be used for canonicals, never a preview hostname.
function publicOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password)
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
export const siteUrl = publicOrigin();
export const siteDescription =
  "Recycle computers, laptops, printers, monitors, servers and computer components with Recore. Enquire about e-waste recovery, scrap quotes and data destruction.";
