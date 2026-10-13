import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CONTACT_ADDRESS } from "@/lib/data";
import "./globals.css";
import "./fonts.css";
import "./app.css";
import "./home.css";

export const metadata: Metadata = {
  title: "Myanmar Creative University • MCU",
  description: "Myanmar Creative University – Official Website",
  icons: { icon: "/favicon.png", apple: "/logo192.png" },
  openGraph: {
    title: "Myanmar Creative University • MCU",
    description: "Myanmar Creative University – Official Website",
    siteName: "Myanmar Creative University",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myanmar Creative University • MCU",
    description: "Myanmar Creative University – Official Website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const collegeJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Myanmar Creative University",
    alternateName: "MCU",
    description: "Myanmar Creative University – Official Website",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_ADDRESS,
      addressLocality: "Yangon",
      addressCountry: "MM",
    },
  };
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
