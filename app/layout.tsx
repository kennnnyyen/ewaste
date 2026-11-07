import type { Metadata } from "next";
import "./globals.css";
import { siteDescription, siteUrl } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://localhost:3107"),
  title: {
    default: "Recore | E-waste, Computer & Office Equipment Recycling",
    template: "%s | Recore",
  },
  description: siteDescription,
  applicationName: "Recore",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: {
    siteName: "Recore",
    title: "Recore | E-waste, Computer & Office Equipment Recycling",
    description: siteDescription,
    locale: "en_AU",
    ...(siteUrl ? { url: siteUrl } : {}),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recore | E-waste & IT Equipment Recycling",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
