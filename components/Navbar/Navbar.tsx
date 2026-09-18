"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_PROGRAMME_GROUPS, ProgrammeGroup } from "@/lib/programmes";
import "./Navbar.css";

// ─── ProgrammeDropdown (desktop flyout, static programme groups) ────
const ProgrammeDropdown: React.FC<{ groups: ProgrammeGroup[]; onClose: () => void }> = ({
  groups,
  onClose,
}) => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  return (
    <ul className="nav-dropdown-menu" onMouseLeave={() => setActiveGroup(null)}>
      {groups.map((group, i) => (
        <li
          key={group.prefix}
          className={`nav-dropdown-item nav-dropend${activeGroup === i ? " open" : ""}`}
          onMouseEnter={() => setActiveGroup(i)}
        >
          <span className="nav-dropdown-link nav-dropdown-toggle">
            {group.label}
            {group.programmes.length > 0 && (
              <svg className="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </span>
          {group.programmes.length > 0 && (
            <ul className="nav-leaf-menu">
              {group.programmes.map((p) => (
                <li key={p.slug}>
                  <Link
                    className="nav-leaf-link"
                    href={`/programme/${group.prefix}/${p.slug}`}
                    onClick={onClose}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

// ─── MobileProgrammeAccordion ─────────────
const MobileProgrammeAccordion: React.FC<{ groups: ProgrammeGroup[]; onClose: () => void }> = ({
  groups,
  onClose,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="mobile-accordion">
      {groups.map((group, i) => (
        <li key={group.prefix} className="mobile-accordion-item">
          <button
            className={`mobile-accordion-trigger${openIndex === i ? " open" : ""}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {group.label}
            {group.programmes.length > 0 && (
              <svg
                className={`mobile-chevron${openIndex === i ? " rotated" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          {group.programmes.length > 0 && (
            <ul className={`mobile-sub-list${openIndex === i ? " open" : ""}`}>
              {group.programmes.map((p) => (
                <li key={p.slug}>
                  <Link
                    className="mobile-sub-link"
                    href={`/programme/${group.prefix}/${p.slug}`}
                    onClick={onClose}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

/* ── Main Navbar ───────────────────────────────────────────────────────────── */
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [programmeOpen, setProgrammeOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setProgrammeOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isProgrammeActive = pathname.startsWith("/programme");

  const closeMenu = () => setMenuOpen(false);
  const groups = ALL_PROGRAMME_GROUPS;

  return (
    <nav className="mcic-navbar" ref={navRef}>
      <div className="mcic-navbar-inner">
        {/* ── Brand ── */}
        <Link className="mcic-navbar-brand" href="/" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mcu.svg" alt="MCU Logo" className="mcic-brand-logo" />
          <span className="mcic-navbar-brand-name">
            <span className="mcic-brand-main">Myanmar Creative</span>
            <span className="mcic-brand-sub">University</span>
          </span>
        </Link>

        {/* ── Hamburger ── */}
        <button
          className={`mcic-hamburger${menuOpen ? " open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* ── Desktop nav links ── */}
        <div className="mcic-nav-links">
          <ul className="mcic-nav-list">
            <li>
              <Link className={`mcic-nav-link${isActive("/") ? " active" : ""}`} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={`mcic-nav-link${isActive("/about") ? " active" : ""}`} href="/about">
                About
              </Link>
            </li>

            {/* Programme dropdown */}
            <li className="mcic-dropdown-parent">
              <span
                className={`mcic-nav-link mcic-dropdown-trigger${isProgrammeActive ? " active" : ""}`}
              >
                Programme
                <svg className="nav-down-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <ProgrammeDropdown groups={groups} onClose={closeMenu} />
            </li>

            <li>
              <Link
                className={`mcic-nav-link${isActive("/gallery") ? " active" : ""}`}
                href="/gallery"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                className={`mcic-nav-link${isActive("/article") ? " active" : ""}`}
                href="/article"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className={`mcic-nav-link${isActive("/contact") ? " active" : ""}`}
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>

          <Link className="mcic-register-btn" href="/student/register">
            Register
          </Link>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`mcic-mobile-drawer${menuOpen ? " open" : ""}`}>
        <ul className="mcic-mobile-list">
          <li>
            <Link
              className={`mcic-mobile-link${isActive("/") ? " active" : ""}`}
              href="/"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`mcic-mobile-link${isActive("/about") ? " active" : ""}`}
              href="/about"
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>

          {/* Programme accordion */}
          <li className="mcic-mobile-programme">
            <button
              className={`mcic-mobile-link mcic-mobile-programme-btn${isProgrammeActive ? " active" : ""}`}
              onClick={() => setProgrammeOpen(!programmeOpen)}
            >
              Programme
              <svg
                className={`mobile-chevron${programmeOpen ? " rotated" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {programmeOpen && <MobileProgrammeAccordion groups={groups} onClose={closeMenu} />}
          </li>

          <li>
            <Link
              className={`mcic-mobile-link${isActive("/gallery") ? " active" : ""}`}
              href="/gallery"
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              className={`mcic-mobile-link${isActive("/article") ? " active" : ""}`}
              href="/article"
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={`mcic-mobile-link${isActive("/contact") ? " active" : ""}`}
              href="/contact"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link className="mcic-register-btn mobile" href="/student/register" onClick={closeMenu}>
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
