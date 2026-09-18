import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import {
  ALL_PROGRAMME_GROUPS,
  findProgramme,
} from "@/lib/programmes";
import { ProgrammeDetail, SubProgrammeNav, ProgrammesSidebar } from "@/app/programme/ProgrammeView";
import "../../ProgrammePage.css";

export function generateStaticParams() {
  return ALL_PROGRAMME_GROUPS.flatMap((g) =>
    g.programmes.map((p) => ({ category: g.prefix, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const programme = findProgramme(category, slug);
  return { title: programme ? `${programme.title} • MCU` : "Programme not found • MCU" };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const programme = findProgramme(category, slug);
  if (!programme) notFound();

  const currentPath = `/programme/${category}/${slug}`;
  const hasSubs = !!programme.subProgrammes && programme.subProgrammes.length > 0;

  return (
    <>
      <div className="prog-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/programme-bg.jpg" alt="Programme" />
      </div>
      <div className="prog-container">
        <div className="prog-layout">
          {hasSubs ? (
            <SubProgrammeNav
              programme={{ title: programme.title, slug, prefix: category }}
              subProgrammes={programme.subProgrammes!}
            />
          ) : (
            <ProgrammeDetail title={programme.title} items={programme.items} />
          )}
          <ProgrammesSidebar currentPath={currentPath} />
        </div>
      </div>
      <Footer />
    </>
  );
}
