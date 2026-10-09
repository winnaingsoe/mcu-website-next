import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery • MCU",
  description: "Photos of campus life, events and partner universities at Myanmar Creative University.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
