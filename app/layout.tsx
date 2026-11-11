import { Suspense } from "react";
import PageScroll from "./page-scroll";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteDescription, siteTitle, siteUrl } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Recore",
  },
  description: siteDescription,
  applicationName: "Recore",
  alternates: {
    canonical: siteUrl,
    types: { "text/plain": [{ url: "/llms.txt", title: "Recore business and service summary" }] },
  },
  openGraph: {
    siteName: "Recore",
    title: siteTitle,
    description: siteDescription,
    locale: "en_AU",
    ...(siteUrl ? { url: siteUrl } : {}),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        <Suspense fallback={null}>
          <PageScroll />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
