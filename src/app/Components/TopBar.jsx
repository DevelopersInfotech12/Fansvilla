"use client";
import { useEffect, useRef } from "react";

const NOTIFICATIONS = [
  "🔥 Ananya & Rohan win the Love Lock Challenge — 12,400 votes cast!",
  "⚡ WILDCARD ALERT: Priya Nair re-enters the villa tonight at 10 PM",
  "👑 Power Couple Rankings updated — Ananya × Rohan still #1 with 94K votes",
  "🎬 Episode 14 streaming now on MTV — Don't miss the elimination twist!",
  "💫 Season 1 applications OPEN — Deadline June 30th. Apply at BlindfoldVilla.in",
  "❤️ Most-voted couple gets a villa suite upgrade — VOTE NOW before midnight",
  "🏆 Reel War challenge ends in 2h 14m — Karan leads with 2.3M views",
  "📸 Exclusive behind-the-scenes gallery from Episode 13 now live",
];

const TopBar = () => {
  const trackRef = useRef(null);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #b91c3a 0%, #8b1228 40%, #6b0f1f 60%, #b91c3a 100%)",
        height: "36px",
        borderBottom: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      {/* Shimmer edge effects */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #b91c3a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #8b1228, transparent)" }} />

      {/* LIVE badge */}
      <div className="absolute left-4 top-0 bottom-0 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white font-black text-[10px] tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="flex items-center h-full ml-20 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-0 whitespace-nowrap"
          style={{
            animation: "ticker 55s linear infinite",
          }}
        >
          {[...NOTIFICATIONS, ...NOTIFICATIONS].map((n, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-white text-xs font-medium pr-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {n}
              <span className="text-white opacity-30 pr-0">◆</span>
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
