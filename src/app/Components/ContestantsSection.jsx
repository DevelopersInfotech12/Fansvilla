"use client";
import { CONTESTANTS } from "../Data";

const STATUS_META = {
  Villa:       { label: "Villa",     dot: "#34d399", bg: "rgba(16,185,129,0.12)", color: "#34d399", border: "rgba(16,185,129,0.3)" },
  "Wild Card": { label: "Wild Card", dot: "#ef3a5a", bg: "rgba(185,28,58,0.13)",  color: "#ef3a5a", border: "rgba(185,28,58,0.35)" },
  Eliminated:  { label: "Out",       dot: "rgba(255,255,255,0.32)", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.32)", border: "rgba(255,255,255,0.1)" },
};

const IMGS = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500&q=80&fit=crop&crop=face",
];

const VOTE_PCT = { Villa: 78, "Wild Card": 55, Eliminated: 30 };

const ContestantsSection = () => (
  <section
    id="contestants"
    className="py-24 px-4 relative overflow-hidden"
    style={{ background: "var(--bg-mid)" }}
  >
    <div className="absolute inset-0 pointer-events-none z-0"
      style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

    <div className="max-w-6xl mx-auto relative z-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: "var(--gold)" }}>
              Season 1 Cast
            </span>
          </div>
          <h2 className="font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "var(--text-primary)" }}>
            Meet The <span className="shimmer-text italic">Contenders</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            20 influencers · One villa · One winner
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full self-start sm:self-auto"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34d399" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            {CONTESTANTS.filter(c => c.status === "Villa").length} still in villa
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CONTESTANTS.map((c, i) => {
          const st = STATUS_META[c.status];
          const pct = VOTE_PCT[c.status];
          const eliminated = c.status === "Eliminated";

          return (
            <div
              key={c.name}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "#16111a",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = "1px solid rgba(201,168,76,0.35)";
                e.currentTarget.style.boxShadow = "0 20px 52px rgba(0,0,0,0.18), 0 0 24px rgba(201,168,76,0.07)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
              }}
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={IMGS[i % IMGS.length]}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: eliminated ? "grayscale(0.7) brightness(0.65)" : "brightness(0.82) saturate(1.1)" }}
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(22,17,26,0.96) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

                {/* Emoji badge */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-lg"
                  style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {c.emoji}
                </div>

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, backdropFilter: "blur(8px)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                    {st.label}
                  </span>
                </div>

                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                  <h3 className="font-bold text-base text-white leading-tight">{c.name}</h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{c.handle}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: "#271d2e", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {c.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.32)" }}>👥</span>
                    <span className="text-sm font-bold shimmer-text">{c.followers}</span>
                  </div>
                </div>

                {/* Vote bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.32)" }}>Public Votes</span>
                    <span className="text-[11px] font-bold" style={{ color: "#c9a84c" }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: eliminated ? "rgba(255,255,255,0.2)" : "linear-gradient(90deg, #b91c3a, #c9a84c)",
                      }}
                    />
                  </div>
                </div>

                {/* Vote button */}
                <button
                  disabled={eliminated}
                  className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: eliminated ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #b91c3a, #c9a84c)",
                    color: eliminated ? "rgb(255, 255, 255)" : "#fff",
                    border: eliminated ? "1px solid rgba(255,255,255,0.08)" : "none",
                    boxShadow: eliminated ? "none" : "0 4px 16px rgba(185,28,58,0.3)",
                  }}
                >
                  {eliminated ? "Eliminated" : "Vote Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs mt-10" style={{ color: "var(--text-dim)" }}>
        Votes reset every 24h · Last updated 12 min ago
      </p>
    </div>
  </section>
);

export default ContestantsSection;