"use client";

const AboutSection = () => (
  <section
    id="about"
    className="py-32 px-4 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #000000 0%, #0a0005 100%)" }}
  >
    {/* BG glows */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,0,20,0.14) 0%, transparent 70%)" }} />
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 30% at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />

    {/* Top rule */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(204,0,34,0.7), rgba(201,168,76,0.5), rgba(204,0,34,0.7), transparent)" }} />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 justify-center mb-6">
        <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, transparent, #cc0022)" }} />
        <span className="text-sm font-bold tracking-[0.32em] uppercase" style={{ color: "#cc0022", fontFamily: "'DM Sans', sans-serif" }}>About The Show</span>
        <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, #cc0022, transparent)" }} />
      </div>

      {/* Headline — 3-tier hierarchy */}
      <div className="text-center mb-8">
        {/* Line 1: small */}
        <span
          className="block uppercase text-white text-[40px] sm:text-[60px]"
          style={{
            fontFamily: "'Poppins', 'system-ui', sans-serif",
            fontWeight: 900,
            // fontSize: "clamp(2rem, 7vw, 4.2rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
          }}
        >
          WHAT HAPPENS
        </span>

        {/* Line 2: medium — red accent */}
        <span
          className="block uppercase text-white text-[40px] sm:text-[60px] sm:w-[500px] mx-auto"
          style={{
            fontFamily: "'Poppins', 'system-ui', sans-serif",
            fontWeight: 900,
            // fontSize: "clamp(3.2rem, 6vw, 6.8rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#cc0022" }}>"WHEN 8 STRANGERS</span> <br />ENTER A VILLA"
        </span>

        {/* Line 3: MASSIVE gold shimmer */}
        <span
          className="block uppercase shimmer-text text-[40px] sm:text-[60px]"
          style={{
            fontFamily: "'Poppins', 'system-ui', sans-serif",
            fontWeight: 900,
            // fontSize: "clamp(4rem, 5vw, 9.5rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
          }}
        >
          BLINDFOLDED?
        </span>
      </div>

      {/* Description */}
      <p
        className="text-center sm:text-[17px] text-base leading-relaxed max-w-2xl mx-auto mb-16"
        style={{ color: "rgba(255,255,255,0.62)", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.85 }}
      >
        Blindfold Villa — India's first Blindfold Reality Show. 4 boys and 4 girls, one remote villa, eyes closed, and one question —{" "}
        <span style={{ color: "#c9a84c", fontWeight: 500 }}>can you fall in love without seeing?</span>
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16"
        style={{
          border: "1px solid rgba(204,0,34,0.2)",
          background: "rgba(204,0,34,0.18)",
        }}
      >
        {[
          {
            icon: "📍",
            title: "Location",
            detail: "Hriday Bhoomi Resort\nJim Corbett, Uttarakhand",
          },
          {
            icon: "👥",
            title: "Format",
            detail: "4 Boys + 4 Girls\n3 Days · Season 1",
          },
          {
            icon: "👁️",
            title: "The Twist",
            detail: "All tasks performed\nwith eyes blindfolded",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-8 text-center transition-all duration-300"
            style={{ background: "#0a0005" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(204,0,34,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0a0005";
            }}
          >
            {card.title === "The Twist" ? (
              <img
                src="/blindlogoedit.png"
                alt="Blindfold Logo"
                className="w-16 h-16 object-contain mx-auto mb-4"
              />
            ) : (
              <div className="text-3xl mb-4">{card.icon}</div>
            )}

            <div
              className="font-bold uppercase mb-3"
              style={{
                color: "#cc0022",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.28em",
              }}
            >
              {card.title}
            </div>

            <div
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {card.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Brand moment */}
      <div
        className="relative overflow-hidden py-14 px-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(204,0,34,0.07) 0%, rgba(201,168,76,0.03) 100%)",
          border: "1px solid rgba(204,0,34,0.22)",
        }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(204,0,34,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <div className="text-5xl mb-5">  <img
            src="/blindlogoedit.png"
            alt="Blindfold Logo"
            className="w-48 h-24 object-contain mx-auto"
          /></div>
          <h3
            className="shimmer-text leading-none mb-3"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 7vw, 5rem)",
              textTransform: "uppercase",
            }}
          >
            BLINDFOLD VILLA
          </h3>
          <p className="text-sm tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}>Season 1 — Completed</p>
        </div>
      </div>
    </div>

    {/* Bottom rule */}
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
  </section>
);

export default AboutSection;