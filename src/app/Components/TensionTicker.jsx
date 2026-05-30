"use client";
import { TENSION_UPDATES } from "../Data";

const TensionTicker = () => {
  const doubled = [...TENSION_UPDATES, ...TENSION_UPDATES];

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "linear-gradient(90deg, #cc0022 0%, #990018 50%, #cc0022 100%)",
        borderTop: "1px solid rgba(255,100,100,0.3)",
        borderBottom: "1px solid rgba(255,100,100,0.3)",
      }}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #cc0022, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, #cc0022)" }} />

      <div className="ticker-inner flex items-center gap-0 whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{
              fontFamily: "'Poppins', 'system-ui', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            {item}
            <span className="mx-6 opacity-50" style={{ fontSize: "0.6rem" }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        .ticker-inner { animation: ticker 28s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TensionTicker;