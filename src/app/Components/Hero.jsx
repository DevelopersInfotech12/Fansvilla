"use client";
import { useEffect, useState } from "react";
import { HERO_TAGLINES, HERO_STATS } from "../Data";

const HERO_IMG = "./hero.png";
const HERO_IMG_MOBILE = "./heromobile.png";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoaded(true);

    // Set initial mobile state
    setIsMobile(window.innerWidth < 640);

    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

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
    <section className="relative min-h-[80svh] md:min-h-[620px] flex items-center justify-center overflow-hidden" style={{ paddingTop: "108px" }}>
      {/* Full-bleed background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={isMobile ? HERO_IMG_MOBILE : HERO_IMG}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // Mobile: "center 35%" pulls the heart shape into viewport center
            // Desktop: default center with parallax
            objectPosition: isMobile ? "center center" : "center center",
            transform: isMobile
              ? "none"
              : `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px) scale(1.04)`,
            transition: isMobile ? "none" : "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(22,17,26,0.55) 0%, rgba(22,17,26,0.3) 40%, rgba(22,17,26,0.88) 85%, rgba(22,17,26,1) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(185,28,58,0.22) 0%, transparent 65%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(201,168,76,0.12) 0%, transparent 60%)" }} />

      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute" style={{ top: "10%", right: "8%", width: "1px", height: "200px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.5), transparent)" }} />
        <div className="absolute" style={{ bottom: "15%", left: "6%", width: "1px", height: "150px", background: "linear-gradient(180deg, transparent, rgba(185,28,58,0.4), transparent)" }} />
      </div>

      {/* Floating avatar bubbles — hidden on very small screens */}
      <div className="absolute top-28 left-4 md:left-20 animate-float hidden sm:block">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl" style={{
          background: "linear-gradient(135deg, #b91c3a, #ef3a5a)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(185,28,58,0.5)",
        }}>👸</div>
      </div>
      <div className="absolute top-44 right-4 md:right-24 animate-float-delay hidden sm:block">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl shadow-2xl" style={{
          background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(201,168,76,0.5)",
        }}>🤴</div>
      </div>
      <div className="absolute bottom-36 left-8 md:left-36 hidden sm:block" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "0.8s" }}>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg" style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>💃</div>
      </div>
      <div className="absolute bottom-48 right-8 md:right-44 hidden sm:block" style={{ animation: "float 4.5s ease-in-out infinite", animationDelay: "2s" }}>
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl" style={{
          background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 24px rgba(14,165,233,0.3)",
        }}>🕺</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        <h1
          className={`font-black leading-none tracking-tight text-[40px] sm:text-[80px] mb-4 transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
        >
          <span className="text-white">BLINDFOLD</span>
          <br />
          <span className="text-yellow-300">VILLA</span>
        </h1>

        <p
          className={`text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ color: "#c9a84c", fontWeight: 300 }}
        >
          India’s hottest influencer reality show — 20 creators, one villa, one winning couple.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button
            className=" sm:w-auto sm:px-10 px-4 py-4 text-white font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full hover:scale-105 transition-all duration-300"
            style={{ background: "#c9a84c", boxShadow: "0 8px 32px rgba(185,28,58,0.55)" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 40px rgba(185,28,58,0.75)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(185,28,58,0.55)"}
          >
            Apply To Villa →
          </button>
          <button
            className="flex items-center gap-3 transition-colors group"
            style={{ color: "#fff" }}
            onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
            onMouseLeave={e => e.currentTarget.style.color = "#fff"}
          >
            <div className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.1)" }}>
              <span className="text-base ml-0.5">▶</span>
            </div>
            <span className="font-medium text-sm text-white">Watch Trailer</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;