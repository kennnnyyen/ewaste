import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recore | Computer Scrap & Secure Data Destruction",
  description:
    "Recore helps you recover value from PCBs, CPUs and computer components, and arrange secure data destruction for retired business IT equipment.",
  openGraph: {
    siteName: "Recore",
    title: "Recore | Computer scrap recycling and data destruction",
    description:
      "Recore: a practical, secure path for computer scrap recovery and business data destruction.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
