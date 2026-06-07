"use client";
import { useState, useEffect, useRef } from "react";

const BANNERS = [
  { id: 1, src: "/featured1.png", alt: "Featured Banner 1" },
  { id: 2, src: "/featured2.png", alt: "Featured Banner 2" },
  { id: 3, src: "/featured3.png", alt: "Featured Banner 3" },
];

const FeaturedBannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = (idx) => {
    if (fading || idx === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 300);
  };

  const next = () => goTo((current + 1) % BANNERS.length);
  const prev = () => goTo((current - 1 + BANNERS.length) % BANNERS.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [current, paused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Banner */}
      <div
        className="relative w-full"
        style={{
          height: isMobile ? "150px" : undefined,
          aspectRatio: isMobile ? "unset" : "16/5",
          minHeight: isMobile ? "160px" : "120px",
          maxHeight: isMobile ? "150px" : "420px",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <img
          src={BANNERS[current].src}
          alt={BANNERS[current].alt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all"
          style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
        >
          <span className="text-white text-base md:text-lg leading-none">‹</span>
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all"
          style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
        >
          <span className="text-white text-base md:text-lg leading-none">›</span>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 py-3" style={{ background: "var(--bg-deep)" }}>
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "7px",
              height: "7px",
              background: i === current ? "#c9a84c" : "var(--border-faint)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBannerSlider;