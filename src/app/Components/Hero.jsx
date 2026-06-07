"use client";
import { useEffect, useState, useRef } from "react";
import { HERO_TAGLINES } from "../Data";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
    setIsMobile(window.innerWidth < 640);
    const handleMouse = (e) => {
      if (window.innerWidth < 640) return;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
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
      setTimeout(() => {
        setIdx((i) => (i + 1) % HERO_TAGLINES.length);
        setVisible(true);
      }, 350);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { num: "8", label: "Strangers" },
    { num: "3", label: "Days" },
    { num: "4", label: "Tasks" },
    { num: "1", label: "Elimination" },
  ];

  const fadeIn = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 900ms ease-in-out ${delay}ms, transform 900ms ease-in-out ${delay}ms`,
  });

  return (
    <section ref={heroRef} style={{ backgroundColor: "#050505", fontFamily: "'DM Sans', sans-serif" }} className="relative overflow-hidden h-auto sm:h-svh">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .hv-shimmer {
          background: linear-gradient(105deg, #fff 0%, #fff 30%, #e8c97a 45%, #f5e0a0 55%, #fff 70%, #fff 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hvShimmer 4s ease-in-out infinite;
        }
        @keyframes hvShimmer {
          0%, 100% { background-position: 200% center; }
          50% { background-position: 0% center; }
        }
        .hv-watch-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .hv-watch-btn:hover::before { transform: translateX(100%); }
        .hv-watch-btn:hover { transform: translateY(-2px); }
        .hv-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #cc0022;
          flex-shrink: 0;
          animation: hvPulse 1.6s ease-in-out infinite;
        }
        @keyframes hvPulse {
          0%   { box-shadow: 0 0 0 0 rgba(204,0,34,0.6); }
          70%  { box-shadow: 0 0 0 7px rgba(204,0,34,0); }
          100% { box-shadow: 0 0 0 0 rgba(204,0,34,0); }
        }
        .hv-scroll-indicator {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%);
          animation: hvScrollLine 2s ease-in-out infinite;
          transform-origin: top;
        }
        @keyframes hvScrollLine {
          0%   { transform: scaleY(0); opacity: 1; }
          60%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        .hv-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 250ms ease-in-out;
        }
        .hv-explore-btn:hover { color: #c9a84c; }
        .hv-explore-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.18);
          transition: border-color 250ms ease-in-out, background 250ms ease-in-out;
          font-size: 1rem;
        }
        .hv-explore-btn:hover .hv-explore-icon {
          border-color: rgba(201,168,76,0.5);
          background: rgba(201,168,76,0.06);
        }
        .hv-watch-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 30px;
          background: #cc0022;
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 200ms ease-in-out;
        }
        .hv-stats-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.12);
        }
        @media (max-width: 639px) {
          .hv-title { font-size: clamp(3.6rem, 20vw, 5rem) !important; }
          .hv-stats-row { flex-wrap: wrap; gap: 20px !important; justify-content: center; }
          .hv-stats-divider { display: none; }
        }
      `}</style>

      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="./blindheronew.png"
          alt=""
          className="hidden sm:block absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 18%", filter: "brightness(0.45) saturate(1.15)", transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * 0.08}px) scale(1.1)`, transition: "transform 0.18s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
        <img
          src="./newherolight.png"
          alt=""
          className="block sm:hidden absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 20%", filter: "brightness(0.45) saturate(1.15)" }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.1) 30%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,0.98) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 0% 0%, rgba(160,0,20,0.28) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 45% at 100% 100%, rgba(180,130,40,0.10) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.5) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)" }} />

      {/* Decorative lines — desktop only */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: "15%", right: "7%", width: "1px", height: "180px", background: "linear-gradient(180deg, transparent, rgba(204,0,34,0.5), transparent)" }} />
        <div className="absolute" style={{ bottom: "18%", left: "5%", width: "1px", height: "130px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.35), transparent)" }} />
        <div className="absolute" style={{ top: "8%", right: "7%", width: "40px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
        <div className="absolute" style={{ top: "8%", right: "7%", width: "1px", height: "40px", background: "rgba(255,255,255,0.12)" }} />
        <div className="absolute" style={{ bottom: "12%", left: "5%", width: "40px", height: "1px", background: "rgba(255,255,255,0.08)" }} />
        <div className="absolute" style={{ bottom: "12%", left: "5%", width: "1px", height: "40px", background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 w-full sm:h-full mt-0 mx-auto flex flex-col sm:justify-between justify-start"
        style={{ maxWidth: "1100px", padding: "0 clamp(20px, 5vw, 60px)", paddingTop: "clamp(50px, 8vh, 130px)", paddingBottom: "clamp(20px, 4vh, 64px)" }}>

        {/* TOP */}
        <div className="flex flex-col items-center" style={{ gap: "clamp(8px, 1.8vh, 20px)" }}>

          {/* Badge */}
          <div
            className="inline-flex items-center border-l-2 "
            style={{ ...fadeIn(0), marginTop: "clamp(80px, 4vh, 48px)", gap: "8px", borderColor: "#cc0022", background: "rgba(204,0,34,0.06)", padding: "4px 12px" }}>
            <div className="hv-live-dot" />
            <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap" }}>
              India's First Blindfold Reality Show
            </span>
          </div>

          {/* Title */}
          <div style={{ ...fadeIn(120), textAlign: "center" }}>
            <h1
              className="hv-title"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textTransform: "uppercase", margin: 0, fontSize: "clamp(5.5rem, 5vw, 10rem)", lineHeight: 0.88, letterSpacing: "-0.02em", textShadow: "0 4px 60px rgba(0,0,0,0.8)" }}>
              <span style={{ display: "block", color: "#fff", letterSpacing: "0.02em" }}>BLINDFOLD</span>
              <span className="hv-shimmer" style={{ display: "block" }}>VILLA</span>
            </h1>
          </div>

          {/* Divider */}
          <div style={{ ...fadeIn(220), display: "flex", alignItems: "center", gap: "14px", width: "100%", maxWidth: "340px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15))" }} />
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#cc0022", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)" }} />
          </div>

          {/* Tagline */}
          <div style={{ ...fadeIn(300), minHeight: "30px", textAlign: "center" }}>
            <p style={{ margin: 0, fontWeight: 300, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, fontSize: "clamp(0.8rem, 1.6vw, 1rem)", letterSpacing: "0.04em", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-6px)", transition: "opacity 350ms ease-in-out, transform 350ms ease-in-out" }}>
              {HERO_TAGLINES[idx]}
            </p>
          </div>

          {/* Season badge */}
          <div style={{ ...fadeIn(380), display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", border: "1px solid rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.06)" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.75)" }}>Season 1</span>
            <span style={{ display: "inline-block", width: "1px", height: "10px", background: "rgba(201,168,76,0.25)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Jim Corbett, Uttarakhand</span>
          </div>
        </div>

        {/* MIDDLE: CTAs */}
        <div className="sm:mt-8 mt-6 flex flex-col sm:flex-row items-center justify-center" style={{ ...fadeIn(500), gap: "16px" }}>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hv-watch-btn">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M2 1.5L12 7L2 13V1.5Z" fill="white" />
            </svg>
            Watch Now
          </a>
          <a href="#about" className="hv-explore-btn">
            <div className="hv-explore-icon">&#8595;</div>
            Explore Show
          </a>
        </div>

        {/* BOTTOM: Stats */}
        <div className="hv-stats-row sm:mt-4 mt-6 flex items-center justify-center" style={{ ...fadeIn(680), gap: "clamp(16px, 5vw, 48px)" }}>
          {stats.map((s, i) => (
            <div key={i} className="flex items-center" style={{ gap: "clamp(16px, 5vw, 48px)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, lineHeight: 1, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: i % 2 === 0 ? "#fff" : "#c9a84c" }}>
                  {s.num}
                </div>
                <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.2)", margin: "4px auto" }} />
                <div style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "clamp(0.52rem, 1vw, 0.62rem)" }}>
                  {s.label}
                </div>
              </div>
              {i < stats.length - 1 && <div className="hv-stats-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="hv-scroll-indicator" />
      </div>
    </section>
  );
};

export default Hero;