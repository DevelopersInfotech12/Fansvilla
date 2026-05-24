"use client";
import { useEffect, useRef, useState } from "react";

const leaders = [
  { name: "Aarav Singh", score: 98420, delta: "+1,230", up: true },
  { name: "Priya Sharma", score: 87650, delta: "+890", up: true },
  { name: "Karan Mehta", score: 81200, delta: "-320", up: false },
  { name: "Sneha Rao", score: 74800, delta: "+2,100", up: true },
  { name: "Dev Kapoor", score: 68500, delta: "+450", up: true },
];

const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];
const medalEmoji = ["🥇", "🥈", "🥉"];

const LeaderboardSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 bg-orange-500 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-yellow-400 text-xs font-bold tracking-[0.4em] uppercase">Rankings</span>
          <h2 className="mt-3 text-5xl md:text-6xl font-black text-white">
            Leaderboard
          </h2>
          <p className="mt-4 text-gray-500">Real-time influence rankings. Updated every hour.</p>
        </div>

        {/* Table */}
        <div className="space-y-3">
          {leaders.map((l, i) => (
            <div
              key={l.name}
              className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-700 hover:scale-[1.02] cursor-pointer ${
                i === 0
                  ? "bg-gradient-to-r from-yellow-500/15 to-orange-500/10 border-yellow-500/30 hover:border-yellow-500/60"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              } ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Rank */}
              <div className="w-10 text-center">
                {i < 3 ? (
                  <span className="text-2xl">{medalEmoji[i]}</span>
                ) : (
                  <span className="text-lg font-black text-gray-600">#{i + 1}</span>
                )}
              </div>

              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-sm shadow-lg ${
                i === 0 ? "bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/40" :
                i === 1 ? "bg-gradient-to-br from-gray-400 to-gray-600" :
                "bg-gradient-to-br from-orange-800 to-orange-600"
              }`}>
                {l.name.split(" ").map(n => n[0]).join("")}
              </div>

              {/* Name */}
              <div className="flex-1">
                <div className="text-white font-bold text-base">{l.name}</div>
                <div className="text-gray-600 text-xs">Influence Score</div>
              </div>

              {/* Delta */}
              <div className={`text-sm font-bold ${l.up ? "text-green-400" : "text-red-400"}`}>
                {l.delta}
              </div>

              {/* Score */}
              <div className="text-right">
                <div className={`text-xl font-black ${i === 0 ? "bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" : "text-white"}`}>
                  {l.score.toLocaleString()}
                </div>
                <div className="text-gray-600 text-xs">pts</div>
              </div>

              {/* Progress bar */}
              <div className="hidden md:block w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gradient-to-r from-orange-600 to-pink-600"}`}
                  style={{ width: `${(l.score / 100000) * 100}%`, transition: "width 1.5s ease" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-10 py-4 rounded-full border border-yellow-500/40 text-yellow-400 font-black text-sm tracking-widest uppercase hover:bg-yellow-500/10 transition-all duration-300">
            Full Leaderboard →
          </button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
