import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact • MCU",
  description: "Contact Myanmar Creative University, Yangon, Myanmar.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
