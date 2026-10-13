import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Registration • MCU",
  description: "Register as a student at Myanmar Creative University.",
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
