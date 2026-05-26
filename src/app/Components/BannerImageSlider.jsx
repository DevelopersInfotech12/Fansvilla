"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * BannerImageSlider
 *
 * Props:
 *   images: string[]   — array of image src URLs (required)
 *   interval?: number  — auto-advance ms (default 5000)
 *   height?: string    — CSS height value (default "clamp(420px, 55vw, 700px)")
 *
 * Usage:
 *   const BANNERS = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
 *   <BannerImageSlider images={BANNERS} />
 */

const BannerImageSlider = ({
  images = [],
  interval = 5000,
  height="300px"
}) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);
  const total = images.length;

  const goTo = useCallback(
    (idx) => {
      if (animating || idx === current || total === 0) return;
      setAnimating(true);
      setFade(false); // start fade out

      setTimeout(() => {
        setCurrent((idx + total) % total);
        setFade(true); // fade in new slide
        setTimeout(() => setAnimating(false), 600);
      }, 350);
    },
    [animating, current, total]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [next, interval, total]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (total === 0) {
    return (
      <div
        style={{
          height,
          background: "#0d0507",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.3)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "0.2em",
        }}
      >
        NO IMAGES PROVIDED
      </div>
    );
  }

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        height,
        background: "#050000",
        userSelect: "none",
      }}
    >
      {/* Gold top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, #c9a84c 40%, #8b0000 60%, transparent 100%)",
          zIndex: 20,
        }}
      />

      {/* Slide image */}
      <img
        key={current}
        src={images[current]}
        alt={`Banner ${current + 1}`}
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
          objectFit: "contain",
objectPosition: "center",
background: "#050000", // fills side gaps
        }}
      />

      {/* Subtle dark vignette overlay — keeps edges dark like existing design */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,0,0,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      {/* Bottom fade to match sections below */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "linear-gradient(to bottom, transparent, rgba(5,0,0,0.85))",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Prev Arrow */}
      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous banner"
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(5,0,0,0.45)",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)";
            e.currentTarget.style.color = "#c9a84c";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          ←
        </button>
      )}

      {/* Next Arrow */}
      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next banner"
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(5,0,0,0.45)",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)";
            e.currentTarget.style.color = "#c9a84c";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          →
        </button>
      )}

      {/* Bottom controls: dots + counter */}
      {total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "22px",
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Dot pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to banner ${i + 1}`}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    i === current
                      ? "linear-gradient(90deg, #c9a84c, #e8c97a)"
                      : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            ))}
          </div>

       
        </div>
      )}

      {/* Progress bar */}
      {total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "rgba(255,255,255,0.06)",
            zIndex: 20,
          }}
        >
          <div
            key={`${current}-progress`}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #8b0000, #c9a84c)",
              animation: `bvProgress ${interval}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes bvProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default BannerImageSlider;