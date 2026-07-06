"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const BannerImageSlider = ({ images = [], mobileImages = [], interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [fade, setFade] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeImages = isMobile && mobileImages.length > 0 ? mobileImages : images;
  const total = activeImages.length;

  const goTo = useCallback(
    (idx) => {
      if (animating || idx === current || total === 0) return;
      setAnimating(true);
      setFade(false);
      setTimeout(() => {
        setCurrent((idx + total) % total);
        setFade(true);
        setTimeout(() => setAnimating(false), 600);
      }, 300);
    },
    [animating, current, total]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    if (total <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [next, interval, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Reset current index when image set switches (mobile ↔ desktop)
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  if (total === 0) return null;

  return (
    <section style={{ position: "relative", background: "#050000", userSelect: "none", lineHeight: 0, marginTop: "50px" }}>

      {/* Gold top edge */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px", zIndex: 20,
        background: "linear-gradient(90deg, transparent 0%, #c9a84c 40%, #8b0000 60%, transparent 100%)",
      }} />

      {/* Image */}
      <img
        key={current}
        src={activeImages[current]}
        alt={`Banner ${current + 1}`}
        draggable={false}
        style={{
          display: "block",
          width: "95%",
          height: "50%",
          margin: "0 auto",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Bottom fade overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", zIndex: 5,
        background: "linear-gradient(to bottom, transparent, rgba(5,0,0,0.8))",
        pointerEvents: "none",
      }} />

      {/* Prev arrow */}
      {total > 1 && (
        <button onClick={prev} aria-label="Previous" style={arrowStyle("left")}>←</button>
      )}

      {/* Next arrow */}
      {total > 1 && (
        <button onClick={next} aria-label="Next" style={arrowStyle("right")}>→</button>
      )}

      {/* Dots + counter */}
      {total > 1 && (
        <div style={{
          position: "absolute", bottom: "16px", left: 0, right: 0, zIndex: 30,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {activeImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? "26px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  background: i === current
                    ? "linear-gradient(90deg, #c9a84c, #e8c97a)"
                    : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1,
          }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      )}

      {/* Progress bar */}
      {total > 1 && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "2px", background: "rgba(255,255,255,0.06)", zIndex: 20,
        }}>
          <div
            key={`${current}-p`}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #8b0000, #c9a84c)",
              animation: `bvProg ${interval}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes bvProg { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  );
};

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "14px",
  transform: "translateY(-50%)",
  zIndex: 30,
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "rgba(5,0,0,0.5)",
  border: "1px solid rgba(201,168,76,0.3)",
  color: "rgba(255,255,255,0.65)",
  fontSize: "1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(8px)",
  transition: "all 0.25s ease",
  lineHeight: 1,
});

export default BannerImageSlider;