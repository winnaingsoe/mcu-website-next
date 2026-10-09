import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ALL_PROGRAMME_GROUPS,
  findProgramme,
  findSubProgramme,
} from "@/lib/programmes";
import { ProgrammeDetail, ProgrammesSidebar } from "@/app/programme/ProgrammeView";
import "../../../ProgrammePage.css";

export function generateStaticParams() {
  return ALL_PROGRAMME_GROUPS.flatMap((g) =>
    g.programmes.flatMap((p) =>
      (p.subProgrammes ?? []).map((s) => ({
        category: g.prefix,
        slug: p.slug,
        subSlug: s.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string; subSlug: string }>;
}): Promise<Metadata> {
  const { category, slug, subSlug } = await params;
  const sub = findSubProgramme(category, slug, subSlug);
  return { title: sub ? `${sub.title} • MCU` : "Programme not found • MCU" };
}

export default async function SubProgrammePage({
  params,
}: {
  params: Promise<{ category: string; slug: string; subSlug: string }>;
}) {
  const { category, slug, subSlug } = await params;
  const programme = findProgramme(category, slug);
  const sub = findSubProgramme(category, slug, subSlug);
  if (!programme || !sub) notFound();

  const currentPath = `/programme/${category}/${slug}/${subSlug}`;

  return (
    <>
      <div className="prog-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/programme-bg.jpg" alt="Programme" />
      </div>
      <div className="prog-container">
        <div className="prog-layout">
          <ProgrammeDetail title={sub.title} items={sub.items} />
          <ProgrammesSidebar currentPath={currentPath} />
        </div>
      </div>
    </>
  );
}
