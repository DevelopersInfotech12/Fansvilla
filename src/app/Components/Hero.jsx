"use client";
import { useEffect, useState } from "react";
import { HERO_TAGLINES } from "../Data";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const watchEnter = (e) => { e.currentTarget.style.boxShadow = "0 12px 60px rgba(204,0,34,0.8), inset 0 1px 0 rgba(255,100,100,0.3)"; };
  const watchLeave = (e) => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(204,0,34,0.55), inset 0 1px 0 rgba(255,100,100,0.3)"; };
  const exploreEnter = (e) => { e.currentTarget.style.color = "#e8c97a"; };
  const exploreLeave = (e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; };

  useEffect(() => {
    setLoaded(true);
    setIsMobile(window.innerWidth < 640);
    const handleMouse = (e) => {
      if (window.innerWidth < 640) return;
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
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { num: "8", label: "Strangers" },
    { num: "2.5", label: "Days" },
    { num: "4", label: "Tasks" },
    { num: "1", label: "Elimination" },
  ];

  return (
    <section className="relative overflow-hidden" style={{ height: isMobile ? "85svh" : "100svh", background: "#000" }}>
      {/* Desktop image */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <img src="./hero.png" alt="" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%",
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px) scale(1.08)`,
          transition: "transform 0.12s ease-out",
          filter: "brightness(0.55) saturate(1.2)",
        }} />
      </div>

      {/* Mobile image */}
      <div className="absolute inset-0 overflow-hidden block sm:hidden">
        <img src="./heromobilenew.png" alt="" style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 20%",
          filter: "brightness(0.55) saturate(1.2)",
        }} />
      </div>

      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(180,0,20,0.35) 0%, transparent 65%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 30% 100% at 0% 50%, rgba(150,0,0,0.2) 0%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 30% 100% at 100% 50%, rgba(150,0,0,0.2) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", opacity: 0.05 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute" style={{ top: "10%", right: "8%", width: "1px", height: "220px", background: "linear-gradient(180deg, transparent, rgba(204,0,34,0.6), transparent)" }} />
        <div className="absolute" style={{ bottom: "20%", left: "6%", width: "1px", height: "160px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
        <div className="absolute" style={{ top: "20%", left: "12%", width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(204,0,34,0.5), transparent)" }} />
        <div className="absolute" style={{ bottom: "30%", right: "12%", width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
      </div>

      <div
        className={`relative z-10 w-full h-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-between transition-all duration-1000`}
        style={{
          paddingTop: "clamp(72px, 14vh, 120px)",
          paddingBottom: "clamp(40px, 8vh, 72px)",
        }}
      >
        {/* Top cluster */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 sm:w-full w-[300px] mx-auto">
          <div className={`inline-flex items-center gap-2 sm:mb-1 mb-4 sm:mt-16 mt-16  transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#cc0022", boxShadow: "0 0 8px #cc0022", animation: "redPulse 1.4s ease-in-out infinite" }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>India's First Blindfold Reality Show</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#cc0022", boxShadow: "0 0 8px #cc0022", animation: "redPulse 1.4s ease-in-out infinite" }} />
          </div>

          <h1 className={`leading-none transition-all text-[50px] sm:text-[80px] duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            lineHeight: 0.88,
            textShadow: "0 0 80px rgba(204,0,34,0.4), 0 8px 80px rgba(0,0,0,0.9)",
            // fontSize: "clamp(3.2rem, 16vw, 9rem)",
          }}>
            <span className="block text-white">BLINDFOLD</span>
            <span className="block shimmer-text">VILLA</span>
          </h1>

          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ minHeight: "28px" }}>
            <p className={`transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.8rem, 1.8vw, 1.1rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.4,
              letterSpacing: "0.02em",
            }}>
              {HERO_TAGLINES[idx]}
            </p>
          </div>

          <p className={`text-xs tracking-[0.15em] uppercase transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "rgba(201,168,76,0.8)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
            Season 1 · Jim Corbett, Uttarakhand
          </p>
        </div>

        {/* Middle — CTA buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 font-bold tracking-[0.18em] uppercase rounded-none transition-all duration-300 hover:scale-105" style={{
            background: "linear-gradient(135deg, #cc0022, #ff0033)",
            color: "#fff",
            boxShadow: "0 8px 40px rgba(204,0,34,0.55), inset 0 1px 0 rgba(255,100,100,0.3)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.15em",
          }} onMouseEnter={watchEnter} onMouseLeave={watchLeave}>
            {'▶'} Watch Now
          </a>
          <a href="#about" className="flex items-center gap-2 transition-colors" style={{ color: "rgba(255,255,255,0.75)" }} onMouseEnter={exploreEnter} onMouseLeave={exploreLeave}>
            <div className="w-9 h-9 flex items-center justify-center border" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: "0.9rem" }}>↓</span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Explore Show</span>
          </a>
        </div>

        {/* Bottom — stats */}
        <div className={`grid grid-cols-4 w-full max-w-xs sm:max-w-lg mx-auto gap-1 sm:flex sm:gap-10 md:gap-20 transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.2rem, 3vw, 3rem)", color: i % 2 === 0 ? "#fff" : "#c9a84c", textShadow: i % 2 === 0 ? "0 0 30px rgba(204,0,34,0.4)" : "0 0 20px rgba(201,168,76,0.4)" }}>{s.num}</div>
              <div style={{ fontSize: "clamp(0.45rem, 1vw, 0.65rem)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(204,0,34,0.5)" }}>
          <div className="w-1 h-1.5 rounded-full" style={{ background: "#cc0022", animation: "scrollDot 1.8s ease-in-out infinite" }} />
        </div>
        <style>{`
          @keyframes scrollDot {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.3; }
          }
          @keyframes redPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;