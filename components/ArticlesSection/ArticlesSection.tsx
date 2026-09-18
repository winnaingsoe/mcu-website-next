"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { Article } from "@/lib/data";
import "./ArticlesSection.css";

// ─── Placeholder article card ────────────────────────────────
const ArticleCardSkeleton: React.FC = () => (
  <div className="article-card skeleton">
    <div className="article-card-img skeleton-box" />
    <div className="article-card-body">
      <div className="skeleton-line w-30" />
      <div className="skeleton-line w-90 mt-6" />
      <div className="skeleton-line w-70" />
    </div>
  </div>
);

// ─── Real article card ────────────────────────────────────────
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const date = new Date(article.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link className="article-card" href={`/article/${article.slug}`}>
      <div className="article-card-img-wrap">
        {article.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.thumbnail} alt={article.title} loading="lazy" />
        ) : (
          <div className="article-card-img-placeholder" />
        )}
      </div>
      <div className="article-card-body">
        <div className="article-card-meta">
          {article.category && <span className="article-card-category">{article.category.name}</span>}
          <span className="article-card-date">{date}</span>
        </div>
        <h5 className="article-card-title">{article.title}</h5>
        {article.excerpt && <p className="article-card-excerpt">{article.excerpt}</p>}
      </div>
    </Link>
  );
};

// ─── ArticlesSection ──────────────────────────────────────────
interface ArticlesSectionProps {
  articles?: Article[];
  loading?: boolean;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles = [], loading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive slides per view
  useEffect(() => {
    const update = () => setSlidesPerView(window.innerWidth < 768 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const items = loading ? Array(4).fill(null) : articles;

  const maxIndex = Math.max(0, items.length - slidesPerView);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex]
  );

  const showEmpty = !loading && articles.length === 0;

  return (
    <section className="articles-section">
      <div className="articles-container">
        <h4 className="articles-heading">
          <span className="articles-heading-bar" />
          Latest Articles
        </h4>

        <div className="articles-slider-wrap">
          {/* Prev arrow */}
          <button
            className="articles-arrow prev"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Slider track */}
          <div className="articles-slider-viewport">
            {showEmpty ? (
              <div className="articles-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h4"
                  />
                </svg>
                <p>No articles yet. Check back soon!</p>
              </div>
            ) : (
              <div
                className="articles-slider-track"
                ref={trackRef}
                style={{
                  transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
                  gridTemplateColumns: `repeat(${items.length}, calc(${100 / slidesPerView}% - 0.75rem))`,
                }}
              >
                {items.map((article, i) =>
                  loading || !article ? (
                    <ArticleCardSkeleton key={i} />
                  ) : (
                    <ArticleCard key={article.id} article={article} />
                  )
                )}
              </div>
            )}
          </div>

          {/* Next arrow */}
          <button
            className="articles-arrow next"
            onClick={next}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        {!showEmpty && items.length > slidesPerView && (
          <div className="articles-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={`articles-dot${i === currentIndex ? " active" : ""}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
