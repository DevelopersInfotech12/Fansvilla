"use client";
import { TASKS } from "../Data";

const ChallengesSection = () => (
  <section
    id="tasks"
    className="py-28 px-4 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #0d0507 0%, #0a0005 100%)" }}
  >
    {/* BG accent */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,0,0,0.1) 0%, transparent 70%)" }} />

    <div className="max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
          <span className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: "#c9a84c" }}>Season 1</span>
          <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
        </div>
        <h2 className="font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#ffffff" }}>
          Tasks &amp; <span className="shimmer-text italic">Challenges</span>
        </h2>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
          4 blindfolded tasks that tested love, trust, and courage
        </p>
      </div>

      {/* Task cards — 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {TASKS.map((task, i) => (
          <div
            key={i}
            className="relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = "1px solid rgba(201,168,76,0.4)";
              e.currentTarget.style.background = "rgba(201,168,76,0.04)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4), 0 0 24px rgba(201,168,76,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "1px solid rgba(201,168,76,0.15)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Gold top line on hover */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }} />

            {/* Task number */}
            <div className="absolute top-4 right-5 text-xs font-black tracking-widest" style={{ color: "rgba(201,168,76,0.2)", fontFamily: "'Playfair Display', serif", fontSize: "2.5rem" }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="flex items-start gap-5">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(139,0,0,0.2)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                {task.icon}
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-white">{task.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                  {task.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom callout */}
      <div
        className="mt-10 rounded-2xl p-6 text-center"
        style={{ background: "linear-gradient(135deg, rgba(139,0,0,0.12) 0%, rgba(201,168,76,0.05) 100%)", border: "1px solid rgba(201,168,76,0.15)" }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
          <span style={{ color: "#c9a84c", fontWeight: 600 }}>Jim Corbett, Hriday Bhoomi Resort</span> · All tasks performed blindfolded · Season 1 Completed
        </p>
      </div>
    </div>
  </section>
);

export default ChallengesSection;
