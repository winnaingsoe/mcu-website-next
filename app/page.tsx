import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import ArticlesSection from "@/components/ArticlesSection/ArticlesSection";
import WhyMCICSection from "@/components/WhyMCICSection/WhyMCICSection";
import Footer from "@/components/Footer/Footer";
import { STATIC_ARTICLES, STATIC_BOARD_GROUPS, STATIC_PARTNERSHIPS } from "@/lib/data";
import type { BoardMember } from "@/lib/data";

const MemberCard: React.FC<{ member: BoardMember }> = ({ member }) => (
  <div className="member-card">
    <div className="member-img-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.imageUrl || "/assets/mcu.svg"}
        alt={member.name}
        loading="lazy"
        className="member-img"
      />
    </div>
    <div className="member-info">
      {member.honor && (
        <p className="member-honor">
          {member.honor} {member.bishop && <span>{member.bishop}</span>}
        </p>
      )}
      <h4 className="member-name">{member.name}</h4>
      <p className="member-position">{member.position}</p>
      {member.chanc && <p className="member-chanc">{member.chanc}</p>}
    </div>
  </div>
);

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ArticlesSection articles={STATIC_ARTICLES} />

      {/* ── Board Groups ── */}
      {STATIC_BOARD_GROUPS.map((group) => (
        <section key={group.title} className="home-section">
          <div className="home-section-container">
            <h3 className="home-section-heading">
              <span className="home-bar" />
              {group.title}
            </h3>
            <div className="member-grid">
              {group.members.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <WhyMCICSection />

      {/* ── Educational Partnership ── */}
      <section className="home-section">
        <div className="home-section-container">
          <h3 className="home-section-heading">
            <span className="home-bar" />
            Educational Partnership of MCU
          </h3>
          <div className="partnership-grid">
            {STATIC_PARTNERSHIPS.map((p, i) =>
              p.linkUrl ? (
                <a
                  key={i}
                  href={p.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partnership-card"
                >
                  <p className="partnership-name">
                    {p.title.split(" ").slice(0, Math.ceil(p.title.split(" ").length / 2)).join(" ")}
                    <br />
                    {p.title.split(" ").slice(Math.ceil(p.title.split(" ").length / 2)).join(" ")}
                  </p>
                </a>
              ) : (
                <div key={i} className="partnership-card">
                  <p className="partnership-name">
                    {p.title.split(" ").slice(0, Math.ceil(p.title.split(" ").length / 2)).join(" ")}
                    <br />
                    {p.title.split(" ").slice(Math.ceil(p.title.split(" ").length / 2)).join(" ")}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
