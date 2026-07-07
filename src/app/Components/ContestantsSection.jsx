"use client";
import { CONTESTANTS } from "../Data";

const ContestantsSection = () => {
  return (
    <section
      id="contestants"
      className="py-28 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0005 0%, #050000 100%)" }}
    >
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(204,0,34,0.07) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #cc0022)" }} />
            <span className="text-sm font-bold tracking-[0.35em] uppercase" style={{ color: "#cc0022", fontFamily: "'DM Sans', sans-serif" }}>Season 1 Cast</span>
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #cc0022, transparent)" }} />
          </div>
          <h2
            className="leading-none mb-3"
            style={{
              fontFamily: "'Poppins', 'system-ui', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 4vw, 6rem)",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            Meet The <span className="shimmer-text">8 Strangers</span>
          </h2>
          <p className="text-md font-bold tracking-[0.2em] uppercase" style={{ color: "rgba(255, 255, 255, 0.9)", fontFamily: "'DM Sans', sans-serif" }}>
            4 Boys · 4 Girls · Aankhein Band
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTESTANTS.map((c, i) => {
            const isMale = c.gender === "male";
            const archetypeColor = c.archetypeColor || "#cc0022";

            return (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{
                  background: "#2a2a2a",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Left accent strip */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] z-20" style={{ background: archetypeColor }} />

                {/* Ghost index */}
                <div
                  className="absolute top-2 right-3 z-10 font-black leading-none select-none pointer-events-none"
                  style={{ fontFamily: "'Poppins', 'system-ui', sans-serif", fontSize: "5rem", color: "rgba(255,255,255,0.035)", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: "300px" }}>
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Archetype badge */}
                  <div className="absolute bottom-3 left-5 z-10">
                    <span
                      className="px-2 py-0.5 text-white font-black uppercase"
                      style={{ background: archetypeColor, fontSize: "0.6rem", letterSpacing: "0.12em" }}
                    >
                      {c.archetype}
                    </span>
                  </div>

                  {/* Gender — top right */}
                  <div
                    className="absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                  >
                    {isMale ? "♂" : "♀"}
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 pt-4 pb-5 pl-6">
                  <h3
                    className="font-black text-white leading-none mb-2"
                    style={{ fontFamily: "'Poppins', 'system-ui', sans-serif", fontSize: "1.35rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    {c.name}
                  </h3>

                  {/* Separator */}
                  <div
                    className="mb-3 h-px"
                    style={{ width: "2rem", background: archetypeColor, opacity: 0.4 }}
                  />

                  {/* One-liner, always visible */}
                  <p
                    className="text-xs italic leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    "{c.oneliner}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-10" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
          Placeholder photos · Real contestant photos coming soon
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(204,0,34,0.3), transparent)" }} />
    </section>
  );
};

export default ContestantsSection;