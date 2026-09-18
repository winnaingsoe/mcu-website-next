"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_PROGRAMME_GROUPS, type ProgrammeItem, type SubProgramme } from "@/lib/programmes";

/* ── Panel type helper ───────────────────────────────────────────────────── */
const getPanelType = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("duration")) return "type-duration";
  if (lower.includes("detail")) return "type-details";
  if (lower.includes("requirement")) return "type-requirements";
  return "type-default";
};

/* ── Type icon ─────────────────────────────────────────────────────────────── */
const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const props = {
    width: 18,
    height: 18,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  switch (type) {
    case "type-duration":
      return (
        <svg {...props} viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "type-details":
      return (
        <svg {...props} viewBox="0 0 24 24" stroke="currentColor">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "type-requirements":
      return (
        <svg {...props} viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      );
    default:
      return (
        <svg {...props} viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

/* ── Expansion Panel ─────────────────────────────────────────────────────── */
interface PanelProps {
  item: ProgrammeItem;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const ExpansionPanel: React.FC<PanelProps> = ({ item, isLast, isOpen, onToggle }) => {
  const typeClass = getPanelType(item.name);
  return (
    <div className={`ep-wrap ${typeClass}${isOpen ? " open" : ""}${isLast && !isOpen ? " last" : ""}`}>
      <div
        className={`ep-header${isOpen ? " open" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
      >
        <span className="ep-title">
          <TypeIcon type={typeClass} />
          {item.name}
        </span>
        <span className="ep-toggle">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      <div className={`ep-body${isOpen ? " open" : ""}`}>
        {item.sub ? (
          // Sub-grouped list (semesters etc.)
          (item.list as { name: string; list: string[] }[]).map((sub, si) => (
            <div key={si} className="ep-sub-group">
              <h6 className="ep-sub-heading">{sub.name}</h6>
              <ul className={`ep-list ${typeClass}`}>
                {sub.list.map((li, li_i) => (
                  <li key={li_i} dangerouslySetInnerHTML={{ __html: li }} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          // Flat list
          <ul className={`ep-list ${typeClass}`}>
            {(item.list as string[]).map((li, li_i) => (
              <li key={li_i} dangerouslySetInnerHTML={{ __html: li }} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* ── Programme Detail Content ──────────────────────────────────────────────── */
export const ProgrammeDetail: React.FC<{ title: string; items: ProgrammeItem[] }> = ({
  title,
  items,
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set(items.map((_, i) => i)));
  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <main className="prog-main">
      <h3 className="prog-main-title">{title}</h3>
      {items.map((item, i) => (
        <ExpansionPanel
          key={i}
          item={item}
          isLast={i === items.length - 1}
          isOpen={openIndices.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </main>
  );
};

/* ── Sub-Programme Nav ───────────────────────────────────────────────────── */
export const SubProgrammeNav: React.FC<{
  programme: { title: string; slug: string; prefix: string };
  subProgrammes: SubProgramme[];
}> = ({ programme, subProgrammes }) => (
  <main className="prog-main">
    <h3 className="prog-main-title">
      <span className="prog-title-bar" />
      {programme.title}
    </h3>
    <p className="prog-nav-intro">Please select a partner university to view programme details.</p>
    <nav className="prog-nav-pills">
      {subProgrammes.map((sp) => (
        <Link
          key={sp.slug}
          className="prog-nav-pill"
          href={`/programme/${programme.prefix}/${programme.slug}/${sp.slug}`}
        >
          {sp.university}
        </Link>
      ))}
    </nav>
  </main>
);

/* ── Static sidebar ───────────────────────────────────────────────── */
export const ProgrammesSidebar: React.FC<{ currentPath: string }> = ({ currentPath }) => (
  <aside className="prog-sidebar">
    <div className="prog-sidebar-inner">
      <h5 className="prog-sidebar-title">ALL PROGRAMMES</h5>
      {ALL_PROGRAMME_GROUPS.map((group) => (
        <div key={group.prefix} className="prog-sidebar-group">
          <h6 className="prog-sidebar-group-label">{group.label}</h6>
          <ul className="prog-sidebar-list">
            {group.programmes.map((p) => {
              const linkPath = `/programme/${group.prefix}/${p.slug}`;
              const isActive = currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
              return (
                <li key={p.slug}>
                  <Link
                    className={`prog-sidebar-link${isActive ? " active" : ""}`}
                    href={linkPath}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  </aside>
);
