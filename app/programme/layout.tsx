import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programmes • MCU",
  description: "Foundation, BTEC, diploma, bachelor, master and doctoral programmes at Myanmar Creative University.",
};

export default function ProgrammeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
