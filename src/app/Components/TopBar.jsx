"use client";
import { useRef } from "react";
import { NOTIFICATIONS } from "../Data";

const TopBar = () => {
  const trackRef = useRef(null);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #cc0022, #990018)",
        height: "36px",
        borderBottom: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #0a0000, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #0a0000, transparent)" }} />

      <div className="absolute left-4 top-0 bottom-0 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(201,168,76,0.35)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c9a84c" }} />
          <span className="font-black text-[10px] tracking-widest" style={{ color: "#c9a84c" }}>SEASON 1</span>
        </div>
      </div>

      <div className="flex items-center h-full ml-24 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: "ticker 55s linear infinite" }}
        >
          {[...NOTIFICATIONS, ...NOTIFICATIONS].map((n, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-[13px] font-semibold pr-16" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans', sans-serif" }}>
              {n}
              <span style={{ color: "rgba(201,168,76,0.4)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TopBar;
