"use client";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 hero-grid opacity-20" />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 bg-orange-500 animate-pulse-slow"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-25 bg-pink-600 animate-pulse-slow"
        style={{ transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`, animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 bg-purple-700"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.2}px), calc(-50% + ${mousePos.y * 0.2}px))` }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-400 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${3 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/40 bg-orange-500/10 mb-8 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-orange-400 text-xs font-bold tracking-[0.3em] uppercase">Season 16 Now Live</span>
        </div>

        {/* Main headline */}
        <h1 className={`hero-title transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <span className="block text-white leading-none">Where</span>
          <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-none">
            Influence
          </span>
          <span className="block text-white leading-none">Meets</span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent leading-none">
            Destiny
          </span>
        </h1>

        {/* Subheading */}
        <p className={`mt-8 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          The ultimate battleground for influencers. Compete, collab, and conquer. Only the strongest connections survive.
        </p>

        {/* CTAs */}
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-white font-black text-sm tracking-widest uppercase overflow-hidden shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/60 hover:scale-105 transition-all duration-300">
            <span className="relative z-10">Apply Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="px-8 py-4 rounded-full text-white font-black text-sm tracking-widest uppercase border border-white/20 hover:border-orange-400/60 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
            Watch Trailer
            <span className="ml-2">▶</span>
          </button>
        </div>

        {/* Stats strip */}
        <div className={`mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { num: "500+", label: "Influencers" },
            { num: "50M+", label: "Followers" },
            { num: "16", label: "Seasons" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                {stat.num}
              </div>
              <div className="text-xs text-gray-500 font-semibold tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-orange-400 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
