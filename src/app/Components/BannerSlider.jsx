"use client";
import { useState, useEffect, useRef } from "react";

const SLIDES = [
  {
    tag: "Season 1 — Now Streaming",
    headline: "Aankhein Band,\nDil Khula",
    sub: "India's first blindfold reality show. Love without sight.",
    cta: { label: "▶ Watch Now", href: "https://youtube.com" },
    accent: "#c9a84c",
    bg: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(139,0,0,0.28) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 60%)",
    eyeIcon: "👁️",
  },
  {
    tag: "Jim Corbett · Uttarakhand",
    headline: "Ek Villa,\n8 Anjaan Log",
    sub: "Remote. Isolated. Blindfolded. 3 days that changed everything.",
    cta: { label: "Meet Contestants", href: "#contestants" },
    accent: "#e8c97a",
    bg: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(139,0,0,0.22) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 20% 80%, rgba(201,168,76,0.1) 0%, transparent 60%)",
    eyeIcon: "🏕️",
  },
  {
    tag: "The Ultimate Test",
    headline: "Bina Dekhey,\nKya Pyaar Hoga?",
    sub: "No looks. No status. Only connection. Only truth.",
    cta: { label: "Watch Episodes", href: "#episodes" },
    accent: "#c9a84c",
    bg: "radial-gradient(ellipse 70% 70% at 50% 30%, rgba(139,0,0,0.3) 0%, transparent 65%), radial-gradient(ellipse 80% 40% at 10% 90%, rgba(201,168,76,0.07) 0%, transparent 60%)",
    eyeIcon: "❤️",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const timerRef = useRef(null);

  const goTo = (idx, dir = 1) => {
    if (animating || idx === current) return;
    setDirection(dir);
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
  };

  const next = () => goTo((current + 1) % SLIDES.length, 1);
  const back = () => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, animating]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#050000",
        minHeight: "520px",
        height: "clamp(460px, 60vw, 680px)",
      }}
    >
      {/* Static noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Animated bg glow per slide */}
      <div
        key={current}
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{ background: slide.bg, opacity: 1 }}
      />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{ background: "linear-gradient(90deg, transparent 0%, #c9a84c 40%, #8b0000 60%, transparent 100%)" }} />

      {/* Decorative vertical lines */}
      <div className="absolute left-[10%] top-0 bottom-0 w-px pointer-events-none z-0"
        style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.07), transparent)" }} />
      <div className="absolute right-[10%] top-0 bottom-0 w-px pointer-events-none z-0"
        style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.07), transparent)" }} />

      {/* Slide content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow tag */}
        <div
          key={`tag-${current}`}
          className="flex items-center gap-3 mb-6 banner-fadein"
        >
          <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${slide.accent})` }} />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: slide.accent }}>
            {slide.eyeIcon} {slide.tag}
          </span>
          <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${slide.accent}, transparent)` }} />
        </div>

        {/* Headline */}
        <h2
          key={`h-${current}`}
          className="font-black leading-[1.1] mb-6 banner-fadein-delay whitespace-pre-line"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            color: "#ffffff",
            textShadow: "0 2px 40px rgba(0,0,0,0.8)",
            animationDelay: "0.1s",
          }}
        >
          {slide.headline}
        </h2>

        {/* Sub */}
        <p
          key={`sub-${current}`}
          className="max-w-xl text-base leading-relaxed mb-10 banner-fadein-delay"
          style={{
            color: "rgba(255,255,255,0.62)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            animationDelay: "0.2s",
          }}
        >
          {slide.sub}
        </p>

        {/* CTA */}
        <a
          key={`cta-${current}`}
          href={slide.cta.href}
          target={slide.cta.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="px-8 py-3 text-xs font-bold tracking-widest uppercase text-black rounded-full banner-fadein-delay inline-block hover:scale-105 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, #c9a84c, #e8c97a)`,
            boxShadow: "0 4px 28px rgba(201,168,76,0.45)",
            animationDelay: "0.3s",
          }}
        >
          {slide.cta.label}
        </a>
      </div>

      {/* Slide counter + dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="transition-all duration-500"
              style={{
                width: i === current ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current
                  ? "linear-gradient(90deg, #c9a84c, #e8c97a)"
                  : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
        <div className="text-xs tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[
        { fn: back, side: "left-6", symbol: "←" },
        { fn: next, side: "right-6", symbol: "→" },
      ].map(({ fn, side, symbol }) => (
        <button
          key={side}
          onClick={fn}
          className={`absolute top-1/2 -translate-y-1/2 ${side} z-20 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110`}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(201,168,76,0.2)",
            color: "rgba(255,255,255,0.5)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"; e.currentTarget.style.color = "#c9a84c"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          {symbol}
        </button>
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-10" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          key={current}
          className="h-full banner-progress"
          style={{ background: "linear-gradient(90deg, #8b0000, #c9a84c)" }}
        />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .banner-fadein {
          animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .banner-fadein-delay {
          animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .banner-progress {
          animation: progressBar 5s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default BannerSlider;