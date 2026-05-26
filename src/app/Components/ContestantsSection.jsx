"use client";
import { CONTESTANTS } from "../Data";

const MALE_IMGS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&q=80&fit=crop&crop=face",
];
const FEMALE_IMGS = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80&fit=crop&crop=face",
];

const ContestantsSection = () => {
  const maleCount = { used: 0 };
  const femaleCount = { used: 0 };

  return (
    <section
      id="contestants"
      className="py-28 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0507 0%, #0a0005 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
            <span className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: "#c9a84c" }}>Season 1 Cast</span>
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
          </div>
          <h2 className="font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#ffffff" }}>
            Meet The <span className="shimmer-text italic">8 Strangers</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
            4 Boys · 4 Girls · Aankhein Band
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTESTANTS.map((c, i) => {
            const isMale = c.gender === "male";
            const imgArr = isMale ? MALE_IMGS : FEMALE_IMGS;
            const count = isMale ? maleCount : femaleCount;
            const img = imgArr[count.used % imgArr.length];
            count.used++;

            return (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "#0a0005",
                  border: "1px solid rgba(201,168,76,0.12)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = "1px solid rgba(201,168,76,0.5)";
                  e.currentTarget.style.boxShadow = "0 20px 52px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = "1px solid rgba(201,168,76,0.12)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
                }}
              >
                {/* Photo */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={img}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    style={{ filter: "brightness(0.75) saturate(1.1)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,0,0,1) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

                  {/* Gold border on hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 50%)" }} />

                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3 className="font-bold text-sm text-white leading-tight">{c.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {isMale ? "♂ Male" : "♀ Female"}
                    </p>
                  </div>
                </div>

                {/* Hover one-liner reveal */}
                <div className="p-4">
                  <div className="relative overflow-hidden" style={{ minHeight: "40px" }}>
                    {/* Default */}
                    <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#c9a84c" }} />
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Hover to reveal</span>
                      </div>
                    </div>
                    {/* Hover */}
                    <div className="absolute inset-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-xs italic leading-relaxed" style={{ color: "#e8c97a" }}>
                        "{c.oneliner}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-10" style={{ color: "rgba(255,255,255,0.25)" }}>
          Placeholder photos · Real contestant photos coming soon
        </p>
      </div>
    </section>
  );
};

export default ContestantsSection;
