import React from "react";
import Link from "next/link";
import { SITE_NAME, CONTACT_ADDRESS, FOOTER_LINKS } from "@/lib/data";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="mcic-footer">
      <div className="mcic-footer-container">
        {/* ── Top grid ── */}
        <div className="mcic-footer-grid">
          {/* About */}
          <div className="mcic-footer-col">
            <h6 className="mcic-footer-heading">{SITE_NAME}</h6>
            <p className="mcic-footer-text">
              MCU is a learner centred, creative college, building intellectual inquiry and discovery
              into undergraduate, graduate and professional programs.
            </p>
          </div>

          {/* Useful links */}
          <div className="mcic-footer-col links-col">
            <h6 className="mcic-footer-heading">Useful Links</h6>
            <ul className="mcic-footer-links">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="mcic-footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="mcic-footer-col">
            <h6 className="mcic-footer-heading">Contact</h6>

            <div className="mcic-footer-contact-item">
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                style={{ flexShrink: 0 }}
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
              <address className="mcic-footer-address">{CONTACT_ADDRESS}</address>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="mcic-footer-divider" />

        {/* ── Bottom bar ── */}
        <div className="mcic-footer-bottom">
          <p className="mcic-footer-copy">
            © {new Date().getFullYear()} Copyright: <span>{SITE_NAME}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
