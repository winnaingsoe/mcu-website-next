import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import "./fonts.css";
import "./app.css";
import "./home.css";

export const metadata: Metadata = {
  title: "Myanmar Creative University • MCU",
  description: "Myanmar Creative University – Official Website",
  icons: { icon: "/favicon.png", apple: "/logo192.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
