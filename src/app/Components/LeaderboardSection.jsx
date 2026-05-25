"use client";
import { COUPLES } from "../Data";

const LEADERBOARD_BANNER = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80&fit=crop";

const LeaderboardSection = () => {
  return (
    <section id="leaderboard" className="py-12 px-4 relative overflow-hidden" style={{ color: "#ffffff" }}>

      {/* BG */}
      <div className="absolute inset-0 z-0">
        <img src={LEADERBOARD_BANNER} alt="" className="w-full h-full object-cover"
          style={{ filter: "brightness(0.9) saturate(1.3)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #1a1020 0%, rgba(26,16,32,0.7) 50%, #1a1020 100%)" }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Banner */}
        <div className="relative w-full h-44 mb-16 overflow-hidden rounded-3xl">
          <img src={LEADERBOARD_BANNER} alt="Leaderboard banner" className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4) saturate(1.2)", objectPosition: "center 40%" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(30,22,34,0.95) 0%, rgba(30,22,34,0.6) 60%, rgba(30,22,34,0.2) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c9a84c" }}>Power Rankings</span>
            </div>
            <h2 className="font-black leading-tight text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Couple <span className="shimmer-text italic">Scoreboard</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
              Updated every 6 hours. Public votes + challenge wins combined.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {COUPLES.map((c) => (
            <div
              key={c.rank}
              className="relative rounded-2xl p-5 md:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: c.rank === 1 ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)",
                border: c.rank === 1 ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(255,255,255,0.09)",
                boxShadow: c.rank === 1 ? "0 8px 40px rgba(201,168,76,0.12)" : "none",
              }}
            >
              {c.rank === 1 && (
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
              )}

              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{
                    background: c.rank === 1 ? "linear-gradient(135deg, #c9a84c, #e8c97a)" : "var(--border-faint)",
                    color: c.rank === 1 ? "var(--bg-deep)" : "rgba(255,255,255,0.6)",
                    border: c.rank === 1 ? "none" : "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {c.rank === 1 ? "👑" : `#${c.rank}`}
                </div>

                <div className="flex -space-x-3 flex-shrink-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-lg"
                    style={{ background: "linear-gradient(135deg, rgba(185,28,58,0.5), rgba(201,168,76,0.4))", border: "2px solid var(--bg-mid)" }}>
                    {c.emoji1}
                  </div>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-lg"
                    style={{ background: "var(--border-faint)", border: "2px solid var(--bg-mid)" }}>
                    {c.emoji2}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base truncate text-white">{c.names}</h3>
                  <p className="text-xs truncate" style={{ color: "rgba(253, 187, 3, 0.55)" }}>{c.handles}</p>
                </div>

                <div className="hidden sm:flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-black text-lg" style={{ color: c.rank === 1 ? "#e8c97a" : "#fff" }}>{c.score.toLocaleString()}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm" style={{ color: c.trend.startsWith("+") ? "#34d399" : "#ef3a5a" }}>{c.trend}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Today</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-lg" style={{ color: "#ef3a5a" }}>❤️ {c.hearts}%</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Love</div>
                  </div>
                </div>

                <button
                  className="text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform flex-shrink-0"
                  style={{
                    background: c.rank === 1 ? "linear-gradient(135deg, #c9a84c, #b91c3a)" : "var(--border-faint)",
                    color: c.rank === 1 ? "var(--bg-deep)" : "rgba(255,255,255,0.6)",
                    border: c.rank === 1 ? "none" : "1px solid rgba(255,255,255,0.14)",
                    fontWeight: 700,
                  }}
                >
                  Vote
                </button>
              </div>

              <div className="sm:hidden flex items-center justify-between mt-4 pt-4"
                style={{ borderTop: "1px solid var(--border-faint)" }}>
                <span className="font-bold" style={{ color: "#ffffff" }}>{c.score.toLocaleString()} pts</span>
                <span className="text-sm font-semibold" style={{ color: c.trend.startsWith("+") ? "#34d399" : "#ef3a5a" }}>{c.trend} today</span>
                <span className="text-sm" style={{ color: "#ef3a5a" }}>❤️ {c.hearts}%</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
          Next update in 3h 42m &bull; 14,832 votes cast today
        </p>
      </div>
    </section>
  );
};

export default LeaderboardSection;