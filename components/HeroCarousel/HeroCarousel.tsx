"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HERO_SLIDES, HERO_DEFAULT_TEXT } from "@/lib/data";
import "./HeroCarousel.css";

const INTERVAL = 5000;

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || HERO_SLIDES.length <= 1) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} className={`hero-slide${i === current ? " active" : ""}`} aria-hidden={i !== current}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={`MCU campus slide ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Caption */}
      <div className="hero-caption">
        <div className="hero-caption-box">
          <h3 className="hero-caption-title">Myanmar Creative University</h3>
          <p className="hero-caption-text">{HERO_DEFAULT_TEXT}</p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
