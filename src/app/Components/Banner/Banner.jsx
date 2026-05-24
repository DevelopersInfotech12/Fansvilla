"use client";
import { useEffect, useState } from "react";

const BANNER_SLIDES = [
  {
    id: 1,
    tag: "Now Streaming",
    headline: "18 Creators Enter.",
    headline2: "One Legend Exits.",
    sub: "India's most viral reality show is here. Drama, alliances, and ₹50 Lakhs on the line.",
    cta: "Watch Season 1",
    badge: "SEASON 1",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80&fit=crop",
    overlayColor: "from-black/80 via-black/40 to-transparent",
    accent: "#E8C547",
  },
  {
    id: 2,
    tag: "Fan Vote Active",
    headline: "Your Vote.",
    headline2: "Their Fate.",
    sub: "2.4 Million votes cast. Who stays, who goes — the power is yours. Vote before midnight.",
    cta: "Vote Now",
    badge: "LIVE",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80&fit=crop",
    overlayColor: "from-black/80 via-black/40 to-transparent",
    accent: "#FF4D6D",
  },
  {
    id: 3,
    tag: "Episode 5 Dropping",
    headline: "Brand Deal",
    headline2: "Heist.",
    sub: "A real brand deal is up for grabs. The pitches are ruthless. The results? Explosive.",
    cta: "Set Reminder",
    badge: "AUG 12",
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1400&q=80&fit=crop",
    overlayColor: "from-black/80 via-black/40 to-transparent",
    accent: "#4ECDC4",
  },
];

const STATS = [
  { icon: "🎬", label: "6 Episodes", sub: "All in one season" },
  { icon: "🏆", label: "₹50 Lakhs", sub: "Winner prize pool" },
  { icon: "📲", label: "2.4M Votes", sub: "Cast this week" },
  { icon: "🔴", label: "Live Voting", sub: "Until midnight" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const go = (idx) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setPrev(current);
    setTimeout(() => {
      setCurrent(idx);
      setPrev(null);
      setTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % BANNER_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [current, transitioning]);

  const slide = BANNER_SLIDES[current];
  const prevSlide = prev !== null ? BANNER_SLIDES[prev] : null;

  return (
    <section style={{ background: "#080808", padding: "0" }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ height: "560px" }}>
        {/* Prev slide fading out */}
        {prevSlide && (
          <div
            className="absolute inset-0 z-10"
            style={{
              opacity: transitioning ? 0 : 1,
              transition: "opacity 0.6s ease",
            }}
          >
            <img
              src={prevSlide.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)" }} />
          </div>
        )}

        {/* Current slide */}
        <div
          className="absolute inset-0 z-20"
          style={{
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.6s ease",
          }}
        >
          <img
            src={slide.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scale(1.04)", transition: "transform 6s ease" }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.05) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,8,8,0.95) 0%, transparent 40%)" }} />
        </div>

        {/* Content */}
        <div
          className="relative z-30 h-full flex flex-col justify-end"
          style={{ padding: "0 48px 52px" }}
        >
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            {slide.badge === "LIVE" ? (
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase"
                style={{ background: "#FF4D6D", color: "#fff", letterSpacing: "0.2em" }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </div>
            ) : (
              <div
                className="px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.2em" }}
              >
                {slide.badge}
              </div>
            )}
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: "1.2rem",
              letterSpacing: "-0.02em",
            }}
          >
            {slide.headline}
            <br />
            <span style={{ color: slide.accent }}>{slide.headline2}</span>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
              maxWidth: "420px",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            {slide.sub}
          </p>

          {/* CTA Row */}
          <div className="flex items-center gap-6">
            <button
              style={{
                background: slide.accent,
                color: "#080808",
                border: "none",
                padding: "12px 28px",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {slide.cta} →
            </button>

            {/* Slide indicators */}
            <div className="flex items-center gap-2">
              {BANNER_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => go(i)}
                  style={{
                    width: i === current ? "32px" : "6px",
                    height: "6px",
                    background: i === current ? slide.accent : "rgba(255,255,255,0.25)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.4s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right thumbnail strip */}
        <div
          className="absolute right-0 top-0 h-full z-30 hidden md:flex flex-col justify-center gap-0"
          style={{ width: "160px" }}
        >
          {BANNER_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className="relative overflow-hidden flex-1"
              style={{
                border: "none",
                cursor: "pointer",
                padding: 0,
                outline: i === current ? `2px solid ${slide.accent}` : "none",
                outlineOffset: "-2px",
                opacity: i === current ? 1 : 0.45,
                transition: "opacity 0.3s, outline 0.3s",
              }}
            >
              <img src={s.img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
              <div
                className="absolute bottom-2 left-2 text-xs font-black uppercase tracking-wider"
                style={{ color: i === current ? slide.accent : "rgba(255,255,255,0.6)", letterSpacing: "0.15em" }}
              >
                {s.badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {STATS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 cursor-pointer transition-all duration-200"
            style={{
              padding: "20px 28px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
            <div>
              <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>{item.label}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", margin: 0 }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}