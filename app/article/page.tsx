"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { STATIC_ARTICLES, STATIC_CATEGORIES, type Article } from "@/lib/data";
import "./BlogPage.css";

/* ── Article card ─────────────────────────────────────────────────────────── */
const BlogCard: React.FC<{ article: Article }> = ({ article }) => {
  const date = new Date(article.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link className="blog-card" href={`/article/${article.slug}`}>
      <div className="blog-card-img-wrap">
        {article.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.thumbnail} alt={article.title} loading="lazy" />
        ) : (
          <div className="blog-card-img-placeholder" />
        )}
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {article.category && <span className="blog-card-category">{article.category.name}</span>}
          <span className="blog-card-date">{date}</span>
        </div>
        <h5 className="blog-card-title">{article.title}</h5>
        {article.excerpt && <p className="blog-card-excerpt">{article.excerpt}</p>}
      </div>
    </Link>
  );
};

/* ── BlogPage (static: client-side search/filter over bundled articles) ───── */
const PAGE_SIZE = 6;

export default function BlogPage() {
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const catName = (id: number) => STATIC_CATEGORIES.find((c) => c.id === id)?.name;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return STATIC_ARTICLES.filter((a) => {
      if (selectedCats.length > 0) {
        const names = selectedCats.map(catName);
        if (!a.category || !names.includes(a.category.name)) return false;
      }
      if (q) {
        const hay = `${a.title} ${a.excerpt ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedCats, search]);

  const toggleCat = (id: number) => {
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
    setVisible(PAGE_SIZE);
  };

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      <div className="blog-page">
        <h1 className="sr-only">Blog – News, Events and Announcements</h1>
        <div className="blog-container">
          {/* ── Search + chips bar ── */}
          <div className="blog-toolbar">
            <div className="blog-chips-row">
              {STATIC_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className={`blog-chip${selectedCats.includes(c.id) ? " active" : ""}`}
                  onClick={() => toggleCat(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="blog-search-wrap">
              <svg className="blog-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="blog-search-input"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
              />
            </div>
          </div>

          {/* ── Grid ── */}
          {shown.length === 0 ? (
            <div className="blog-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>No articles found</p>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {shown.map((a) => (
                  <BlogCard key={a.id} article={a} />
                ))}
              </div>
              {hasMore && (
                <div className="blog-load-more">
                  <button className="blog-load-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    More articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
