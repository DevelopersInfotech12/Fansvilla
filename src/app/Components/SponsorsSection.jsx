"use client";

const SponsorsSection = () => (
  <section
    id="sponsors"
    className="py-8 px-4 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #0a0005 0%, #080003 100%)" }}
  >
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />

    <div className="max-w-4xl mx-auto relative z-10 text-center">
      <div className="inline-flex items-center gap-3 mb-10">
        <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
        <span className="text-base font-semibold tracking-[0.35em] uppercase" style={{ color: "rgba(201,168,76,0.7)" }}>Co-Powered By</span>
        <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {[
          { name: "Green Gainz", img: "/green.jpeg", desc: "Official Nutrition Partner" },
          { name: "Hriday Bhoomi", img: "/hriday.jpeg", desc: "Official Venue · Jim Corbett" },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-3 group">
            <div
              className="w-60 h-48 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1"
              style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(255,255,255,0.03)" }}
              onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.5)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,168,76,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <img
                src={s.img}
                alt={s.name}
                className="w-full h-full object-contain p-3"
                style={{ filter: "brightness(1.05) saturate(1.1)" }}
              />
            </div>
            <span className="text-md" style={{ color: "rgba(255,255,255,0.3)" }}>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SponsorsSection;