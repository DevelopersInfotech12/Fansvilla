"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days, color: "#6C63FF" },
    { label: "Hours", value: timeLeft.hours, color: "#00E5FF" },
    { label: "Minutes", value: timeLeft.minutes, color: "#9B4DFF" },
    { label: "Seconds", value: timeLeft.seconds, color: "#FF2D78" },
  ];

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {units.map(({ label, value, color }) => (
        <div
          key={label}
          className="flex flex-col items-center rounded-2xl px-5 py-4 min-w-[72px]"
          style={{
            background: `linear-gradient(135deg, ${color}15, rgba(10,10,26,0.8))`,
            border: `1px solid ${color}30`,
            backdropFilter: "blur(12px)",
            boxShadow: `0 8px 30px ${color}15`,
          }}
        >
          <span
            className="font-black text-3xl leading-none mb-1"
            style={{ color, fontFamily: "'Space Mono', monospace", textShadow: `0 0 20px ${color}60` }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-widest font-black text-white/30">{label}</span>
        </div>
      ))}
    </div>
  );
}
