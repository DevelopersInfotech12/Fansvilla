"use client";

import { useEffect, useRef } from "react";

const NAV = [
  { heading: "Play",  links: ["Leaderboard","Daily Challenges","Fantasy Picks","Tournaments"] },
  { heading: "Earn",  links: ["Rewards","Refer & Win","VIP Perks","Redeem Points"] },
  { heading: "About", links: ["How It Works","Blog","Careers","Contact Us"] },
];

const SOCIAL = [
  { label: "Instagram", icon: "📸" },
  { label: "YouTube",   icon: "▶️" },
  { label: "Twitter",   icon: "𝕏"  },
  { label: "Discord",   icon: "💬" },
];

export default function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "rgba(255,60,172,",
      "rgba(245,166,35,",
      "rgba(43,134,197,",
      "rgba(120,75,160,",
    ];
    const spawn = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight,
      r: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.6 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0,
      phase: Math.random() * Math.PI * 2,
    });

    let particles = Array.from({ length: 40 }, spawn);
    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.map((p) => {
        const np = { ...p, y: p.y - p.speed, opacity: Math.min(0.7, p.opacity + 0.005), phase: p.phase + 0.02 };
        if (np.y < -10) return spawn();
        const nx = np.x + Math.sin(np.phase) * 30;
        ctx.beginPath();
        ctx.arc(nx, np.y, np.r, 0, Math.PI * 2);
        ctx.fillStyle = np.color + np.opacity + ")";
        ctx.fill();
        return np;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

        .fv-cta-wrap { padding:0 5% 72px; position:relative; z-index:10; animation:fvSlideUp .8s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fvSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }

        .fv-cta-box {
          border-radius:28px; padding:64px 5%; text-align:center;
          background:linear-gradient(135deg,rgba(255,60,172,.18) 0%,rgba(120,75,160,.18) 50%,rgba(43,134,197,.18) 100%);
          border:1px solid rgba(255,60,172,.28);
          position:relative; overflow:hidden; backdrop-filter:blur(12px);
        }
        .fv-cta-box::after {
          content:''; position:absolute; inset:-2px; border-radius:30px;
          background:conic-gradient(from 0deg,transparent 0deg 60deg,rgba(255,60,172,.6) 90deg,transparent 120deg 360deg);
          z-index:-1; animation:fvBorderSpin 4s linear infinite;
          mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); mask-composite:exclude; padding:2px;
        }
        @keyframes fvBorderSpin { to{transform:rotate(360deg)} }

        .fv-orb { position:absolute; border-radius:50%; filter:blur(50px); animation:fvOrbPulse 6s ease-in-out infinite; }
        .fv-orb-1 { width:220px;height:220px;top:-60px;right:-60px;background:rgba(255,60,172,.25); }
        .fv-orb-2 { width:180px;height:180px;bottom:-50px;left:-50px;background:rgba(43,134,197,.22);animation-delay:-3s; }
        .fv-orb-3 { width:140px;height:140px;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(120,75,160,.2);animation-delay:-1.5s; }
        @keyframes fvOrbPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.35)} }
        .fv-orb-3 { animation-name:fvOrbPulseCenter; }
        @keyframes fvOrbPulseCenter { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.4)} }

        .fv-crown { font-size:56px;display:block;margin-bottom:18px;animation:fvCrownBounce 2.5s ease-in-out infinite;position:relative; }
        @keyframes fvCrownBounce { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-10px) rotate(4deg)} }

        .fv-h2 { font-family:'Bebas Neue',cursive;font-size:clamp(32px,5vw,60px);color:#fff;letter-spacing:3px;margin-bottom:14px;line-height:1;position:relative; }
        .fv-h2 span { background:linear-gradient(90deg,#FF3CAC,#F5A623,#FF3CAC);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:fvShimmer 3s linear infinite; }
        @keyframes fvShimmer { to{background-position:200% center} }

        .fv-p { color:rgba(255,255,255,.55);font-size:15px;max-width:480px;margin:0 auto 36px;line-height:1.6;position:relative; }

        .fv-btn {
          display:inline-block;font-family:'DM Sans',sans-serif;font-weight:700;font-size:16px;
          padding:15px 46px;border-radius:50px;border:none;cursor:pointer;
          background:linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5);background-size:200% 200%;
          color:#fff;position:relative;overflow:hidden;
          animation:fvGrad 4s ease infinite;transition:transform .2s,box-shadow .2s;
          box-shadow:0 0 24px rgba(255,60,172,.4);
        }
        @keyframes fvGrad { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .fv-btn::before { content:'';position:absolute;inset:0;background:rgba(255,255,255,.15);transform:translateX(-100%) skewX(-15deg);transition:transform .5s; }
        .fv-btn:hover::before { transform:translateX(150%) skewX(-15deg); }
        .fv-btn:hover { transform:translateY(-3px);box-shadow:0 8px 32px rgba(255,60,172,.6); }

        .fv-footer { position:relative;z-index:10;animation:fvSlideUp 1s cubic-bezier(.22,1,.36,1) .2s both; }
        .fv-shimmer { height:1px;background:linear-gradient(90deg,transparent 0%,rgba(255,60,172,.5) 30%,rgba(245,166,35,.5) 50%,rgba(43,134,197,.5) 70%,transparent 100%);background-size:200% auto;animation:fvLineSlide 3s linear infinite; }
        @keyframes fvLineSlide { to{background-position:200% center} }

        .fv-main { padding:52px 5% 36px;display:grid;grid-template-columns:1fr 2fr 1fr;gap:40px;align-items:start; }
        @media(max-width:768px){.fv-main{grid-template-columns:1fr;}.fv-social{align-items:flex-start!important;}.fv-stats{display:none!important;}}

        .fv-brand { display:flex;flex-direction:column;gap:14px; }
        .fv-brand-logo { display:flex;align-items:center;gap:10px; }
        .fv-brand-icon { width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#FF3CAC,#784BA0);display:flex;align-items:center;justify-content:center;font-size:16px;animation:fvIconGlow 2s ease-in-out infinite; }
        @keyframes fvIconGlow { 0%,100%{box-shadow:0 0 16px rgba(255,60,172,.5)} 50%{box-shadow:0 0 30px rgba(255,60,172,.9)} }
        .fv-brand-name { font-family:'Bebas Neue',cursive;font-size:24px;background:linear-gradient(90deg,#FF3CAC,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:2px; }
        .fv-brand-tag { color:rgba(255,255,255,.35);font-size:12px;line-height:1.7;max-width:200px; }
        .fv-live { display:flex;align-items:center;gap:6px;background:rgba(255,60,172,.12);border:1px solid rgba(255,60,172,.3);border-radius:50px;padding:4px 12px;font-size:11px;color:#FF3CAC;font-weight:700;letter-spacing:1px;width:fit-content; }
        .fv-dot { width:7px;height:7px;border-radius:50%;background:#FF3CAC;animation:fvDotPulse 1.2s ease-in-out infinite; }
        @keyframes fvDotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

        .fv-nav { display:grid;grid-template-columns:repeat(3,1fr);gap:32px; }
        .fv-nav-h { font-family:'Bebas Neue',cursive;letter-spacing:2px;font-size:13px;color:#FF3CAC;margin-bottom:14px; }
        .fv-nav-a { display:block;color:rgba(255,255,255,.42);font-size:13px;text-decoration:none;margin-bottom:9px;transition:color .2s,transform .2s;cursor:pointer; }
        .fv-nav-a:hover { color:#fff;transform:translateX(4px); }

        .fv-social { display:flex;flex-direction:column;align-items:flex-end;gap:16px; }
        .fv-stats { display:flex;gap:24px; }
        .fv-stat-num { font-family:'Bebas Neue',cursive;font-size:22px;background:linear-gradient(90deg,#FF3CAC,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:1px; }
        .fv-stat-lbl { color:rgba(255,255,255,.3);font-size:10px;letter-spacing:1px;text-transform:uppercase; }
        .fv-social-label { font-family:'Bebas Neue',cursive;letter-spacing:2px;font-size:13px;color:rgba(255,255,255,.3); }
        .fv-social-icons { display:flex;gap:10px; }
        .fv-social-btn { width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s,background .2s,transform .2s,box-shadow .2s;font-size:16px;text-decoration:none; }
        .fv-social-btn:hover { border-color:#FF3CAC;background:rgba(255,60,172,.15);transform:translateY(-4px);box-shadow:0 6px 20px rgba(255,60,172,.35); }

        .fv-bar { padding:18px 5%;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap; }
        .fv-bar p { color:rgba(255,255,255,.22);font-size:11px; }
        .fv-bar-links { display:flex;gap:20px; }
        .fv-bar-a { color:rgba(255,255,255,.28);font-size:11px;text-decoration:none;cursor:pointer;transition:color .2s; }
        .fv-bar-a:hover { color:#FF3CAC; }
      `}</style>

      <canvas ref={canvasRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }} />

      {/* CTA */}
      <section className="fv-cta-wrap">
        <div className="fv-cta-box">
          <div className="fv-orb fv-orb-1" />
          <div className="fv-orb fv-orb-2" />
          <div className="fv-orb fv-orb-3" />
          <div style={{ position:"relative" }}>
            <span className="fv-crown">👑</span>
            <h2 className="fv-h2">READY TO ENTER <span>THE VILLA?</span></h2>
            <p className="fv-p">Sign up now. Play hard. Win big. The leaderboard is waiting for your name at #1.</p>
            <button className="fv-btn">Sign Up — It's Free 🔥</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fv-footer" style={{ borderTop:"1px solid rgba(255,255,255,.07)" }}>
        <div className="fv-shimmer" />
        <div className="fv-main">
          {/* Brand */}
          <div className="fv-brand">
            <div className="fv-brand-logo">
              <div className="fv-brand-icon">⚡</div>
              <span className="fv-brand-name">FANSVILLA</span>
            </div>
            <p className="fv-brand-tag">Where fans become legends. Game on. Points up. Villa vibes only.</p>
            <div className="fv-live"><span className="fv-dot" /> LIVE NOW</div>
          </div>

          {/* Nav */}
          <div className="fv-nav">
            {NAV.map(({ heading, links }) => (
              <div key={heading}>
                <p className="fv-nav-h">{heading}</p>
                {links.map(l => <a key={l} className="fv-nav-a">{l}</a>)}
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="fv-social">
            <div className="fv-stats">
              {[["2.4M","Players"],["₹50CR","Won"]].map(([n,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div className="fv-stat-num">{n}</div>
                  <div className="fv-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
            <span className="fv-social-label">Follow the Villa</span>
            <div className="fv-social-icons">
              {SOCIAL.map(({ label, icon }) => (
                <a key={label} className="fv-social-btn" title={label}>{icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="fv-shimmer" />
        <div className="fv-bar">
          <p>© 2025 Fansvilla. All rights reserved.</p>
          <div className="fv-bar-links">
            {["Privacy Policy","Terms of Service","Responsible Gaming","Support"].map(l => (
              <a key={l} className="fv-bar-a">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}