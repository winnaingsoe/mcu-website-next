"use client";

import React, { useState, useCallback } from "react";
import { STATIC_GALLERIES, type GalleryImage } from "@/lib/data";
import "./GalleryPage.css";

/* ── Lightbox ─────────────────────────────────────────────────────────────── */
interface LightboxProps {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = React.useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = React.useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Keyboard nav
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  const currentImage = images[current];

  return (
    <div className="lb-backdrop" onClick={handleBackdrop}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      <button className="lb-arrow lb-prev" onClick={prev} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="lb-content">
        <div className="lb-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.imageUrl}
            alt={currentImage.caption || `Gallery image ${current + 1}`}
          />
        </div>
        {currentImage.caption && <div className="lb-caption">{currentImage.caption}</div>}
      </div>

      <button className="lb-arrow lb-next" onClick={next} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="lb-counter">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

/* ── Gallery Group card ───────────────────────────── */
interface GalleryGroupProps {
  group: (typeof STATIC_GALLERIES)[number];
  onOpen: (images: GalleryImage[], index: number) => void;
}

const GalleryGroupCard: React.FC<GalleryGroupProps> = ({ group, onOpen }) => {
  const stripRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => stripRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  const scrollRight = () => stripRef.current?.scrollBy({ left: 220, behavior: "smooth" });

  return (
    <div className="gallery-group">
      <h3 className="gallery-group-title">
        <span className="gallery-group-bar" />
        {group.name}
      </h3>

      <div className="gallery-strip-wrap">
        <button className="gallery-strip-arrow left" onClick={scrollLeft} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="gallery-strip" ref={stripRef}>
          {group.assets.map((img, i) => (
            <button
              key={i}
              className="gallery-thumb"
              onClick={() => onOpen(group.assets, i)}
              aria-label={`Open image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.imageUrl} alt={img.caption || `${group.name} ${i + 1}`} loading="lazy" />
              <div className="gallery-thumb-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <button
          className="gallery-strip-arrow right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ── GalleryPage (static groups + client search/lightbox) ─────────────────── */
export default function GalleryPage() {
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  const openLightbox = useCallback((images: GalleryImage[], index: number) => {
    setLightbox({ images, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  // Safety: reset scroll lock if the page unmounts with the lightbox open.
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const filtered = STATIC_GALLERIES.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="gallery-page">
        <div className="gallery-container">
          {/* Toolbar */}
          <div className="gallery-toolbar">
            <div className="gallery-search-wrap">
              <svg className="gallery-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="gallery-search-input"
                placeholder="Search galleries…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Content */}
          {filtered.length === 0 ? (
            <div className="gallery-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>No galleries yet</p>
            </div>
          ) : (
            filtered.map((group) => (
              <GalleryGroupCard key={group.id} group={group} onOpen={openLightbox} />
            ))
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={closeLightbox} />
      )}

    </>
  );
}
