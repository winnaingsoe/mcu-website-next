import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
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
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
