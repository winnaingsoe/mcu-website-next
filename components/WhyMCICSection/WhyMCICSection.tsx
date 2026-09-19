import React from "react";
import { WHY_MCU_ITEMS, WHY_MCU_IMAGE } from "@/lib/data";
import "./WhyMCICSection.css";

const toParagraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

const WhyMCICSection: React.FC = () => {
  return (
    <section className="why-mcic-section">
      <div className="why-mcic-container">
        <div className="why-mcic-row">
          {/* ── Text column (items) ── */}
          <div className="why-mcic-text">
            {WHY_MCU_ITEMS.map((item) => (
              <div key={item.id} className="why-mcic-block">
                <h3 className="why-mcic-heading">
                  <span className="why-mcic-bar" />
                  {item.title}
                </h3>
                {toParagraphs(item.content).map((para, i) => (
                  <p key={i} className="why-mcic-para">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* ── Image column (shared) ── */}
          <div className="why-mcic-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WHY_MCU_IMAGE}
              alt="MCU University Building"
              loading="lazy"
              className="why-mcic-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMCICSection;
