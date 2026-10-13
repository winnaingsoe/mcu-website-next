import type { Metadata } from "next";
import { STATIC_ABOUT_SECTIONS, STATIC_MAP_URL } from "@/lib/data";
import "./AboutPage.css";

export const metadata: Metadata = { title: "About • Myanmar Creative University" };

interface UniversityBlockProps {
  id: string;
  title: string;
  image?: string;
  imageAlt: string;
  imageLeft?: boolean;
  children: React.ReactNode;
}

const UniversityBlock: React.FC<UniversityBlockProps> = ({
  id,
  title,
  image,
  imageAlt,
  imageLeft = false,
  children,
}) => (
  <section className="about-section" id={id}>
    <div className="about-container">
      <h2 className="about-section-title">
        <span className="about-quote-icon">❝</span>
        {title}
      </h2>
      <div className={`about-row${imageLeft ? " img-left" : ""}`}>
        {!imageLeft && <div className="about-text-col">{children}</div>}
        {image && (
          <div className="about-img-col">
            <div className="about-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={imageAlt} loading="lazy" className="about-img" />
            </div>
          </div>
        )}
        {imageLeft && <div className="about-text-col">{children}</div>}
      </div>
    </div>
  </section>
);

const toParagraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">About Myanmar Creative University</h1>
      {STATIC_ABOUT_SECTIONS.map((section) => (
        <UniversityBlock
          key={section.id}
          id={`section-${section.id}`}
          title={section.title}
          image={section.imageUrl}
          imageAlt={section.title}
          imageLeft={section.imagePosition === "left"}
        >
          {toParagraphs(section.content).map((para, i) => (
            <p key={i} className="about-para justify">
              {para}
            </p>
          ))}
        </UniversityBlock>
      ))}

      {/* ── Map ── */}
      <div className="about-map-section">
        <div className="about-container">
          <h3 className="about-map-heading">
            <span className="about-map-bar" />
            Location of MCU
          </h3>
          <div className="about-map-wrap">
            <iframe
              title="MCU Location"
              src={STATIC_MAP_URL}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

    </>
  );
}
