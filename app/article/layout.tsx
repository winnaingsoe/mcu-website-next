import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog • MCU",
  description: "News, events and announcements from Myanmar Creative University.",
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
