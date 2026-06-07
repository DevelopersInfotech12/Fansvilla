"use client";

const VILLA_IMG = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80&fit=crop";

const ApplyCTA = () => {
  return (
    <section className="py-16 px-4" style={{ background: "var(--bg-deep)" }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(201,168,76,0.25)" }}
        >
          {/* Full background image */}
          <div className="absolute inset-0">
            <img
              src={VILLA_IMG}
              alt="Villa"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.3) saturate(1.1)" }}
            />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center top, rgba(185,28,58,0.25) 0%, rgba(22,17,26,0.85) 60%)" }} />
          </div>

          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a84c 40%, #ef3a5a 60%, transparent)" }} />

          <div className="relative z-10 p-10 md:p-4 text-center">
            <div className="text-5xl mb-6">🏝️</div>

            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c9a84c" }}>Season 1 Applications Open</span>
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>

            <h2
              className="font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 4rem)" }}
            >
              You Could Be <br />
              <span className="shimmer-text italic">In The Villa</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <button
                className="text-white font-bold text-base px-12 py-3 rounded-full hover:scale-105 transition-all duration-200 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #b91c3a, #c9a84c)",
                  boxShadow: "0 8px 40px rgba(185,28,58,0.55)",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 50px rgba(185,28,58,0.75)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 40px rgba(185,28,58,0.55)"}
              >
                Apply
              </button>
              <button
                className="text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
              >
                Eligibility Criteria →
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-4">
              {[
                { icon: "📸", text: "50K+ followers on any platform" },
                { icon: "🇮🇳", text: "Indian resident, 18+" },
                { icon: "🔥", text: "Ready for 90 days" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyCTA;
