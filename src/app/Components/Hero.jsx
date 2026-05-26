"use client";
import { useEffect, useState } from "react";
import { HERO_TAGLINES } from "../Data";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoaded(true);
    setIsMobile(window.innerWidth < 640);

    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx((i) => (i + 1) % HERO_TAGLINES.length); setVisible(true); }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden" style={{ paddingTop: "108px" }}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={isMobile ? "./heromobile.png" : "./hero.png"}
          alt=""
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center",
            transform: isMobile ? "none" : `translate(${mousePos.x * 0.12}px, ${mousePos.y * 0.12}px) scale(1.05)`,
            transition: isMobile ? "none" : "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,0,0,0.6) 0%, rgba(5,0,0,0.25) 40%, rgba(5,0,0,0.88) 85%, rgba(5,0,0,1) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,0,0,0.3) 0%, transparent 65%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)" }} />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute" style={{ top: "12%", right: "10%", width: "1px", height: "200px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.5), transparent)" }} />
        <div className="absolute" style={{ bottom: "18%", left: "8%", width: "1px", height: "150px", background: "linear-gradient(180deg, transparent, rgba(139,0,0,0.5), transparent)" }} />
      </div>

      {/* Blindfold eye icon floats */}
      <div className="absolute top-28 left-6 md:left-24 hidden sm:block" style={{ animation: "float 6s ease-in-out infinite" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl"
          style={{ background: "rgba(139,0,0,0.45)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(8px)", boxShadow: "0 8px 32px rgba(139,0,0,0.5)" }}>
          👁️
        </div>
      </div>
      <div className="absolute top-44 right-6 md:right-28 hidden sm:block" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1.5s" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-2xl"
          style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)", backdropFilter: "blur(8px)" }}>
          💛
        </div>
      </div>
      <div className="absolute bottom-40 left-10 md:left-40 hidden sm:block" style={{ animation: "float 7s ease-in-out infinite", animationDelay: "0.8s" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: "rgba(139,0,0,0.3)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(8px)" }}>
          ❤️
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c9a84c" }}>
            India's First Blindfold Reality Show
          </span>
          <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
        </div>

        {/* Logo / Title */}
        <h1
          className={`font-black leading-none tracking-tight mb-4 transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 6vw, 120px)", textShadow: "0 4px 60px rgba(0,0,0,0.8)" }}
        >
          <span className="text-white">BLINDFOLD</span>
          <br />
          <span className="shimmer-text">VILLA</span>
        </h1>

        {/* Tagline rotator */}
        <div className="h-8 flex items-center justify-center mb-6">
          <p
            className={`text-base md:text-xl transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
            style={{ color: "rgba(255,255,255,0.9)", fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}
          >
            {HERO_TAGLINES[idx]}
          </p>
        </div>

        {/* Sub tagline */}
        <p
          className={`text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ color: "rgba(201,168,76,0.85)", fontWeight: 300 }}
        >
          The Ultimate Test of Love · Season 1 · Jim Corbett, Uttarakhand
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 text-black font-bold text-sm tracking-[0.15em] uppercase rounded-full hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)", boxShadow: "0 8px 32px rgba(201,168,76,0.45)" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 48px rgba(201,168,76,0.7)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.45)"}
          >
            ▶ Watch Now
          </a>
          <a
            href="#about"
            className="flex items-center gap-3 transition-colors group"
            style={{ color: "rgba(255,255,255,0.8)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
          >
            <div className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
              <span className="text-sm">↓</span>
            </div>
            <span className="font-medium text-sm">Explore Show</span>
          </a>
        </div>

        {/* Stats strip */}
        <div className={`mt-16 flex items-center justify-center gap-8 md:gap-16 transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { num: "8", label: "Strangers" },
            { num: "2.5", label: "Days" },
            { num: "4", label: "Blindfold Tasks" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-black text-2xl md:text-3xl shimmer-text" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
              <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: "float 2s ease-in-out infinite" }}>
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2" style={{ borderColor: "rgba(201,168,76,0.4)" }}>
          <div className="w-1 h-2 rounded-full" style={{ background: "#c9a84c", animation: "scrollDot 1.8s ease-in-out infinite" }} />
        </div>
        <style>{`
          @keyframes scrollDot {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(12px); opacity: 0.3; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
