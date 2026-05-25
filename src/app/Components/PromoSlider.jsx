"use client";
import { useState, useEffect, useRef } from "react";

// Slide data — 3 promo banners like the reference screenshot
const SLIDES = [
  {
    id: 1,
    tag: "Season 1 • Streaming Now",
    headline: "Binge,",
    headline2: "Play & Win!",
    sub: "Watch every episode, answer trivia and win exclusive BlindfoldVilla merch + ₹1 Lakh cash prize.",
    cta: "Play Now",
    ctaSecond: "Watch Episodes →",
    badge: "instax™ × MTV",
    // Celeb/glamour side image
    personImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=85&fit=crop&crop=top",
    // Main wide BG — purple/lavender dreamy
    bgImg: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=1920&q=80&fit=crop",
    accent: "#9333ea",
    accentLight: "#c084fc",
    bgOverlay: "linear-gradient(135deg, rgba(88,28,135,0.85) 0%, rgba(147,51,234,0.6) 40%, rgba(219,39,119,0.5) 100%)",
    sponsors: ["Sony", "F2", "ENVY", "Philips"],
  },
  {
    id: 2,
    tag: "New Episode • Every Friday",
    headline: "Drama.",
    headline2: "Love. Betrayal.",
    sub: "20 of India's biggest influencers. One oracle. Only the strongest couple survives the dumping ground.",
    cta: "Watch Live",
    ctaSecond: "Meet Contestants →",
    badge: "BlindfoldVilla X6",
    personImg: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=85&fit=crop&crop=top",
    bgImg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80&fit=crop",
    accent: "#b91c3a",
    accentLight: "#ef3a5a",
    bgOverlay: "linear-gradient(135deg, rgba(127,29,29,0.88) 0%, rgba(185,28,58,0.65) 45%, rgba(201,168,76,0.4) 100%)",
    sponsors: ["MTV", "Voot", "JioCinema", "Zee5"],
  },
  {
    id: 3,
    tag: "Season 1 Casting Open",
    headline: "Your Villa.",
    headline2: "Your Rules.",
    sub: "Think you have what it takes? 50K+ followers, fire in your heart — apply for BlindfoldVilla Season 1 before June 30.",
    cta: "Apply Now",
    ctaSecond: "Eligibility →",
    badge: "₹25 Lakhs Prize",
    personImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85&fit=crop&crop=top",
    bgImg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80&fit=crop",
    accent: "#c9a84c",
    accentLight: "#f5e4b0",
    bgOverlay: "linear-gradient(135deg, rgba(120,53,15,0.88) 0%, rgba(161,98,7,0.65) 45%, rgba(22,17,26,0.7) 100%)",
    sponsors: ["MTV", "Voot Select", "Fujifilm", "boAt"],
  },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((current + 1) % SLIDES.length);
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, paused]);

  const s = SLIDES[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Main Slide ── */}
      <div
        className="relative w-full transition-opacity duration-350"
        style={{
          height: "clamp(300px, 42vw, 520px)",
          opacity: animating ? 0 : 1,
          transition: "opacity 0.35s ease",
        }}
      >
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src={s.bgImg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45) saturate(1.3)" }}
          />
          {/* Coloured overlay matching slide accent */}
          <div className="absolute inset-0" style={{ background: s.bgOverlay }} />
          {/* Dark sides for text legibility */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(22,17,26,0.88) 0%, rgba(22,17,26,0.4) 45%, rgba(22,17,26,0.1) 70%, rgba(22,17,26,0.55) 100%)" }} />
        </div>

        {/* Decorative floating shapes (like diamond/bubble in reference) */}
        <div className="absolute right-[32%] bottom-[-20px] w-28 h-28 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${s.accentLight}, transparent)`, filter: "blur(20px)" }} />
        <div className="absolute right-[25%] top-[10%] w-16 h-16 rotate-45 opacity-15 pointer-events-none"
          style={{ background: s.accentLight, filter: "blur(12px)" }} />

        {/* Left: text content */}
        <div className="absolute inset-0 flex items-center z-10 px-5 md:px-16 lg:px-24">
          <div className="w-full sm:max-w-[58%] md:max-w-[52%]">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 sm:px-2.5 px-2  py-1 ml-4 rounded-full mb-3"
              style={{ background: "rgba(0,0,0,0.35)", border: `1px solid ${s.accent}55`, backdropFilter: "blur(8px)" }}>
              {/* <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accentLight }} /> */}
              <span className="sm:text-[10px] text-[7px]  md:text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: s.accentLight }}>{s.tag}</span>
            </div>

            {/* Headline */}
            <h2 style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.05,  }} className="sm:ml-1 ml-4">
              <span className="block text-white font-black text-2xl sm:text-[100px]">
                {s.headline}
              </span>
              <span className="block font-black italic sm:text-[60px]" style={{  color: s.accentLight }}>
                {s.headline2}
              </span>
            </h2>

            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 my-2 sm:px-2.5 ml-4 px-2 py-1 rounded-full"
              style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}55` }}>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: s.accentLight }}>{s.badge}</span>
            </div>

            <p className="text-xs md:text-sm leading-relaxed mb-4 hidden sm:block" style={{ color: "#fff", fontWeight: 300, maxWidth: "38ch" }}>
              {s.sub}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                className="px-4 ml-4 md:px-7 py-2 my-3 md:py-3 text-white font-bold text-xs md:text-sm tracking-wide rounded-full hover:scale-105 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${s.accent}, ${s.accentLight})`,
                  boxShadow: `0 6px 24px ${s.accent}55`,
                  color: s.id === 3 ? "var(--bg-deep)" : "white",
                }}
              >
                {s.cta}
              </button>
              <button className="text-xs font-medium transition-colors hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => e.currentTarget.style.color = s.accentLight}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
              >
                {s.ctaSecond}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Celeb / person image */}
        <div className="absolute right-0 bottom-0 h-full z-10 pointer-events-none"
          style={{ width: "clamp(200px, 36%, 460px)" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(22,17,26,0.7) 0%, transparent 35%)" }} />
          <img
            src={s.personImg}
            alt="Host"
            className="w-full h-full object-cover object-top"
            style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)" }}
          />
          {/* Glow behind person */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 80% at 60% 80%, ${s.accent}30 0%, transparent 70%)` }} />
        </div>

        {/* Slide number */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <span className="font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", opacity: 0.15 }}>
            0{current + 1}
          </span>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 sm:w-9 sm:h-9 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <span className="text-white text-sm">‹</span>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 sm:w-9 sm:h-9 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <span className="text-white text-sm">›</span>
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-2 py-4" style={{ background: "var(--bg-deep)" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background: i === current ? `linear-gradient(90deg, ${SLIDES[i].accent}, ${SLIDES[i].accentLight})` : "var(--border-faint)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PromoSlider;
