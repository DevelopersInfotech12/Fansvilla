"use client";

const AboutSection = () => (
  <section
    id="about"
    className="py-32 px-4 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #050000 0%, #0d0507 100%)" }}
  >
    {/* BG glow */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,0,0,0.12) 0%, transparent 70%)" }} />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 justify-center mb-6">
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
        <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c9a84c" }}>About The Show</span>
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
      </div>

      {/* Headline */}
      <h2
        className="text-center font-black leading-tight mb-8"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#ffffff" }}
      >
        Kya hota hai jab{" "}
        <span className="shimmer-text italic">8 anjaan log</span>
        <br />
        aankhein band karke ek doosre se connect karte hain?
      </h2>

      {/* Description */}
      <p
        className="text-center text-lg leading-relaxed max-w-3xl mx-auto mb-12"
        style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}
      >
        Blindfold Villa — India ka pehla Blindfold Reality Show. 4 ladke aur 4 ladkiyan, ek remote villa mein, aankhein bandh, aur sirf ek sawaal — kya aap bina dekhey kisi se pyaar kar sakte hain?{" "}
        <span style={{ color: "#c9a84c", fontWeight: 500 }}>The Ultimate Test of Love.</span>
      </p>

      {/* Show info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {[
          { icon: "📍", title: "Location", detail: "Hriday Bhoomi Resort\nJim Corbett, Uttarakhand" },
          { icon: "👥", title: "Format", detail: "4 Boys + 4 Girls\n2.5 Days · Season 1" },
          { icon: "👁️", title: "The Twist", detail: "All tasks performed\nwith eyes blindfolded" },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
            onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.35)"; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: "#c9a84c" }}>{card.title}</div>
            <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "rgba(255,255,255,0.7)" }}>{card.detail}</div>
          </div>
        ))}
      </div>

      {/* Poster placeholder / Logo area */}
      <div
        className="rounded-3xl overflow-hidden flex items-center justify-center"
        style={{ minHeight: "220px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)" }}
      >
        <div className="text-center py-12 px-6">
          <div className="text-5xl mb-4">👁️</div>
          <h3 className="font-black text-4xl shimmer-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            BLINDFOLD VILLA
          </h3>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Season 1 — Completed</p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
