"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const SLIDES = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80",
    label: "The Villa",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
    label: "The Stage",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80",
    label: "The Drama",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80",
    label: "The Games",
  },
];

const FLOATING_CARDS = [
  { name: "Ananya Roy", niche: "Dance", followers: "6.8M", color: "#FF2D78", emoji: "💃", x: 2, y: 12, z: -80, delay: 0 },
  { name: "Neha Kapoor", niche: "Beauty", followers: "5.2M", color: "#00E5FF", emoji: "✨", x: 78, y: 8, z: -120, delay: 0.4 },
  { name: "Zara Khan", niche: "Travel", followers: "4.1M", color: "#00FFC8", emoji: "🌍", x: 1, y: 52, z: -60, delay: 0.8 },
  { name: "Priya Sharma", niche: "Fashion", followers: "3.4M", color: "#9B4DFF", emoji: "👗", x: 80, y: 48, z: -100, delay: 0.2 },
  { name: "Aryan Mehta", niche: "Lifestyle", followers: "2.1M", color: "#6C63FF", emoji: "🔥", x: 3, y: 76, z: -140, delay: 1 },
  { name: "Rohan Das", niche: "Fitness", followers: "1.8M", color: "#FF2D78", emoji: "💪", x: 79, y: 74, z: -90, delay: 0.6 },
];

function FloatingCard({ card, mouseX, mouseY }) {
  const depth = Math.abs(card.z) / 140;
  const parallaxX = mouseX * (1 - depth) * 28;
  const parallaxY = mouseY * (1 - depth) * 22;
  const scale = 1 - depth * 0.22;
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${card.x}%`, top: `${card.y}%`,
        transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${scale})`,
        transition: "transform 0.12s ease-out",
        opacity: 0.9 - depth * 0.35,
        zIndex: Math.round(10 + card.z / 10),
        animation: `floatCard 5s ease-in-out infinite ${card.delay}s`,
      }}
    >
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(135deg, ${card.color}20, rgba(3,3,16,0.85))`,
          border: `1px solid ${card.color}55`,
          boxShadow: `0 8px 40px ${card.color}30, inset 0 1px 0 ${card.color}40`,
          backdropFilter: "blur(16px)",
          minWidth: "165px",
          transform: `perspective(500px) rotateY(${mouseX * 10 * (1 - depth)}deg) rotateX(${-mouseY * 7 * (1 - depth)}deg)`,
        }}
      >
        <span className="text-2xl">{card.emoji}</span>
        <div>
          <p className="text-white font-black text-xs leading-none mb-0.5">{card.name}</p>
          <p className="text-xs font-black" style={{ color: card.color }}>{card.followers}</p>
          <p className="text-white/30 text-xs">{card.niche}</p>
        </div>
        <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: card.color, boxShadow: `0 0 8px ${card.color}` }} />
      </div>
    </div>
  );
}

/* ── Carousel ───────────────────────────────────────────────────────────────── */
function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [fading, setFading]   = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (fading || idx === current) return;
    setFading(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setFading(false); }, 800);
  }, [fading, current]);

  const advance = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(advance, 5500);
    return () => clearInterval(timerRef.current);
  }, [advance]);

  const resetTimer = (idx) => {
    clearInterval(timerRef.current);
    goTo(idx);
    timerRef.current = setInterval(advance, 5500);
  };

  return (
    <>
      <style>{`
        @keyframes imgFadeIn  { from { opacity:0; transform:scale(1.06) } to { opacity:1; transform:scale(1.0) } }
        @keyframes imgFadeOut { from { opacity:1; transform:scale(1.0) } to { opacity:0; transform:scale(0.97) } }
        @keyframes progressFill { from{width:0%} to{width:100%} }
        .carousel-img-in  { animation: imgFadeIn  0.85s cubic-bezier(0.4,0,0.2,1) forwards; }
        .carousel-img-out { animation: imgFadeOut 0.6s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>

      {/* ── Full-bleed image stack ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>

        {/* outgoing image */}
        {prev !== null && (
          <img
            key={`out-${prev}`}
            src={SLIDES[prev].image}
            alt=""
            className="carousel-img-out"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
          />
        )}

        {/* incoming image */}
        <img
          key={`in-${current}`}
          src={SLIDES[current].image}
          alt={SLIDES[current].label}
          className="carousel-img-in"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
        />

        {/* dark tint layers so existing UI stays readable */}
        <div style={{ position:"absolute", inset:0, background:"rgba(3,3,16,0.72)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 20%, rgba(13,11,53,0.8) 0%, transparent 65%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 70% 80%, rgba(26,5,32,0.6) 0%, transparent 55%)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"35%", background:"linear-gradient(to top, rgba(3,3,16,1) 0%, transparent 100%)" }} />
      </div>

      {/* ── Thumbnail strip nav ── */}
      <div
        style={{
          position:"absolute", bottom:0, left:0, right:0,
          zIndex:30, display:"flex", height:72,
          borderTop:"1px solid rgba(108,99,255,0.12)",
        }}
      >
        {SLIDES.map((sl, i) => {
          const active = i === current;
          return (
            <button
              key={sl.id}
              onClick={() => resetTimer(i)}
              style={{
                flex: active ? 2 : 1,
                position:"relative", overflow:"hidden", border:"none",
                cursor:"pointer", padding:0, outline:"none",
                background:"rgba(3,3,16,0.75)", backdropFilter:"blur(12px)",
                borderRight: i < SLIDES.length-1 ? "1px solid rgba(108,99,255,0.1)" : "none",
                transition:"flex 0.55s cubic-bezier(0.77,0,0.18,1)",
              }}
            >
              {/* thumb bg */}
              <img
                src={sl.image} alt=""
                style={{
                  position:"absolute", inset:0, width:"100%", height:"100%",
                  objectFit:"cover", objectPosition:"center",
                  opacity: active ? 0.45 : 0.18,
                  filter: active ? "none" : "saturate(0.3)",
                  transition:"opacity 0.4s ease, filter 0.4s ease",
                }}
              />
              {/* active top glow line */}
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:2,
                background: active ? "linear-gradient(90deg, transparent, #6C63FF, #00E5FF, transparent)" : "transparent",
                transition:"background 0.4s ease",
              }} />
              {/* progress */}
              {active && (
                <div
                  key={`prog-${current}`}
                  style={{
                    position:"absolute", bottom:0, left:0, height:2,
                    background:"linear-gradient(90deg,#6C63FF,#00E5FF)",
                    animation:"progressFill 5.5s linear forwards",
                    width:0,
                  }}
                />
              )}
              {/* label */}
              <div style={{
                position:"absolute", inset:0, display:"flex", alignItems:"center",
                justifyContent:"center", gap:6,
                fontFamily:"'Syne',sans-serif", fontSize:11, letterSpacing:3,
                textTransform:"uppercase", fontWeight:800,
                color: active ? "#fff" : "rgba(255,255,255,0.3)",
                transition:"color 0.3s",
              }}>
                {active && (
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"#00E5FF", boxShadow:"0 0 8px #00E5FF", display:"inline-block" }} />
                )}
                {sl.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Prev / Next arrows ── */}
      {[
        { dir:"prev", label:"‹", style:{ left:16 }, onClick:() => resetTimer((current-1+SLIDES.length)%SLIDES.length) },
        { dir:"next", label:"›", style:{ right:16 }, onClick:() => resetTimer((current+1)%SLIDES.length) },
      ].map(({ dir, label, style, onClick }) => (
        <button
          key={dir}
          onClick={onClick}
          style={{
            position:"absolute", top:"50%", transform:"translateY(-50%)",
            zIndex:30, width:44, height:44, borderRadius:3,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(108,99,255,0.25)",
            color:"rgba(255,255,255,0.7)", fontSize:22, cursor:"pointer",
            backdropFilter:"blur(12px)", display:"flex", alignItems:"center",
            justifyContent:"center", transition:"all 0.2s ease", ...style,
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(108,99,255,0.2)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.7)"; }}
        >{label}</button>
      ))}
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [mouse, setMouse]       = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible]   = useState(false);
  const [titleChars, setTitleChars] = useState([]);
  const heroRef = useRef(null);
  const title   = "INFLUENZA";

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
    background: ["#6C63FF","#00E5FF","#FF2D78","#9B4DFF","#00FFC8"][Math.floor(Math.random() * 5)],
    opacity: Math.random() * 0.6 + 0.2,
    bottom: `-${Math.random() * 20}px`,
    animation: `particleDrift ${Math.random() * 10 + 8}s linear ${Math.random() * 8}s infinite`,
  }));

  useEffect(() => {
    const chars = title.split("").map((c, i) => ({ char: c, visible: false, i }));
    setTitleChars(chars);
    chars.forEach((_, i) => {
      setTimeout(() => {
        setTitleChars(prev => prev.map(c => c.i === i ? { ...c, visible: true } : c));
      }, 250 + i * 90);
    });
    setTimeout(() => setVisible(true), 150);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--c-bg)", cursor: "none" }}
    >
      {/* Custom cursor */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-screen"
        style={{
          width:"20px", height:"20px",
          background:"radial-gradient(circle, rgba(108,99,255,1) 0%, rgba(0,229,255,0.6) 100%)",
          boxShadow:"0 0 20px rgba(108,99,255,0.8)",
          left: cursorPos.x - 10, top: cursorPos.y - 10,
          transition:"left 0.06s ease-out, top 0.06s ease-out",
        }}
      />

      {/* ── CAROUSEL (images + arrows + thumb nav) ── */}
      <BannerCarousel />

      {/* Particles — above carousel, below UI */}
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{ left:p.left, bottom:p.bottom, width:p.width, height:p.height, background:p.background, opacity:p.opacity, animation:p.animation, zIndex:2 }}
        />
      ))}

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{ background:"linear-gradient(90deg, transparent, rgba(108,99,255,0.3), rgba(0,229,255,0.5), rgba(108,99,255,0.3), transparent)", animation:"scanLine 8s linear infinite", opacity:0.4 }}
      />

      {/* 3D Grid floor */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:3,
        backgroundImage:"linear-gradient(rgba(108,99,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.07) 1px, transparent 1px)",
        backgroundSize:"60px 60px",
        transform:`perspective(900px) rotateX(72deg) translateY(42%) translateX(${mouse.x * -12}px)`,
        transformOrigin:"center bottom",
        maskImage:"linear-gradient(to bottom, transparent 0%, black 35%, black 80%, transparent 100%)",
        WebkitMaskImage:"linear-gradient(to bottom, transparent 0%, black 35%, black 80%, transparent 100%)",
      }} />

      {/* Radial glows */}
      <div className="absolute pointer-events-none" style={{ zIndex:4,
        width:"900px", height:"900px", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(108,99,255,0.12) 0%, rgba(0,229,255,0.05) 40%, transparent 70%)",
        left:"50%", top:"50%",
        transform:`translate(calc(-50% + ${mouse.x * 35}px), calc(-50% + ${mouse.y * 25}px))`,
        transition:"transform 0.25s ease-out",
      }} />
      <div className="absolute pointer-events-none" style={{ zIndex:4,
        width:"500px", height:"500px", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 70%)",
        left:"30%", top:"60%",
        transform:`translate(calc(-50% + ${mouse.x * -20}px), calc(-50% + ${mouse.y * -15}px))`,
        transition:"transform 0.3s ease-out",
      }} />

      {/* Floating cards */}
      <div className="hidden lg:block" style={{ zIndex:15, position:"absolute", inset:0 }}>
        {FLOATING_CARDS.map(card => (
          <FloatingCard key={card.name} card={card} mouseX={mouse.x} mouseY={mouse.y} />
        ))}
      </div>

      {/* Horizontal light streaks */}
      {[22, 52, 78].map((top, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ zIndex:5,
          top:`${top}%`, left:0, right:0, height:"1px",
          background:`linear-gradient(90deg, transparent 0%, rgba(108,99,255,${0.07 - i*0.02}) 30%, rgba(0,229,255,${0.1 - i*0.025}) 50%, rgba(108,99,255,${0.07 - i*0.02}) 70%, transparent 100%)`,
          transform:`translateX(${mouse.x * (i+1) * -10}px)`,
          transition:"transform 0.18s ease-out",
        }} />
      ))}

      {/* ── Center content (z-20, above everything) ── */}
      <div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{
          transform:`perspective(1200px) rotateY(${mouse.x * 2.5}deg) rotateX(${-mouse.y * 1.5}deg)`,
          transition:"transform 0.08s ease-out",
        }}
      >
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
          style={{
            background:"rgba(108,99,255,0.1)", border:"1px solid rgba(108,99,255,0.3)", backdropFilter:"blur(12px)",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-20px)",
            transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background:"#00E5FF" }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background:"#00E5FF" }} />
          </span>
          <span className="text-xs font-black tracking-[0.35em] uppercase" style={{ color:"#00E5FF" }}>Season 1 · Now Casting</span>
        </div>

        {/* 3D Title */}
        <h1 className="font-black uppercase leading-none mb-2 flex justify-center flex-wrap"
          style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(4rem, 1vw, 10rem)" }}
        >
          {titleChars.map(({ char, visible: v, i }) => (
            <span key={i} style={{
              display:"inline-block",
              background:"linear-gradient(180deg, #FFFFFF 0%, #00E5FF 35%, #6C63FF 65%, #FF2D78 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              filter: v ? "drop-shadow(0 0 35px rgba(108,99,255,0.7))" : "none",
              transform: v ? "translateY(0) rotateY(0deg)" : "translateY(70px) rotateY(-90deg)",
              opacity: v ? 1 : 0,
              transition:`all 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              transformStyle:"preserve-3d", perspective:"600px",
            }}>{char}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="font-black tracking-[0.6em] uppercase mb-8"
          style={{
            color:"rgba(255,255,255,0.18)", fontSize:"clamp(0.65rem, 2vw, 1rem)",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.9s",
          }}
        >The Influence Games</p>

        {/* Glass desc card */}
        <div className="max-w-2xl mx-auto rounded-2xl px-8 py-5 mb-10"
          style={{
            background:"rgba(108,99,255,0.06)", border:"1px solid rgba(108,99,255,0.2)",
            backdropFilter:"blur(24px)", boxShadow:"0 20px 60px rgba(108,99,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? `translateY(0) perspective(600px) rotateX(${mouse.y * -2}deg)` : "translateY(30px)",
            transition:"opacity 1s cubic-bezier(0.16,1,0.3,1) 1.1s, transform 0.12s ease-out",
          }}
        >
          <p className="text-white/50 leading-relaxed" style={{ fontSize:"clamp(0.85rem, 1.8vw, 1rem)" }}>
            18 influencers. One villa. Unlimited drama.{" "}
            <span style={{ color:"#00E5FF" }}>Only the most authentic</span> creator wins the crown — and{" "}
            <span style={{ color:"#6C63FF", fontWeight:900 }}>₹50 Lakhs.</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-14"
          style={{
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition:"all 1s cubic-bezier(0.16,1,0.3,1) 1.3s",
          }}
        >
          <button
            className="group relative px-10 py-4 rounded-full font-black tracking-widest uppercase text-white text-sm overflow-hidden"
            style={{ background:"linear-gradient(135deg,#6C63FF,#00E5FF)", boxShadow:"0 0 30px rgba(108,99,255,0.5), 0 0 60px rgba(108,99,255,0.2)", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 60px rgba(108,99,255,0.9), 0 0 120px rgba(108,99,255,0.4)"; e.currentTarget.style.transform="scale(1.07) translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 30px rgba(108,99,255,0.5), 0 0 60px rgba(108,99,255,0.2)"; e.currentTarget.style.transform="scale(1)"; }}
          >▶ Watch Now</button>

          <button
            className="px-10 py-4 rounded-full font-black tracking-widest uppercase text-white text-sm"
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(108,99,255,0.3)", backdropFilter:"blur(10px)", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.borderColor="rgba(0,229,255,0.5)"; e.currentTarget.style.boxShadow="0 8px 40px rgba(0,229,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.borderColor="rgba(108,99,255,0.3)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.4)"; }}
          >Meet Contestants</button>
        </div>

        {/* Countdown */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition:"all 1s cubic-bezier(0.16,1,0.3,1) 1.5s" }}>
          <p className="text-xs font-black tracking-[0.4em] uppercase text-white/20 mb-5">Next Episode Drops In</p>
          <CountdownTimer targetDate="2025-08-15T20:00:00" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        style={{ opacity: visible ? 1 : 0, transition:"opacity 1s ease 2s" }}
      >
        <span className="text-xs tracking-[0.4em] uppercase text-white/20">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full" style={{ background:"#6C63FF", animation:"scrollDot 1.5s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Stats bar — sits above carousel thumb strip, pushed up by 72px */}
      <div
        className="absolute left-0 right-0 z-20 flex justify-center gap-0 overflow-hidden"
        style={{
          bottom:72,
          borderTop:"1px solid rgba(108,99,255,0.12)",
          background:"rgba(3,3,16,0.7)", backdropFilter:"blur(24px)",
          opacity: visible ? 1 : 0, transition:"opacity 1s ease 1.8s",
        }}
      >
        {[
          { label:"Contestants", value:"18",   color:"#6C63FF" },
          { label:"Episodes",    value:"6",    color:"#00E5FF" },
          { label:"Prize Pool",  value:"₹50L", color:"#FF2D78" },
          { label:"Live Votes",  value:"2.4M", color:"#9B4DFF" },
        ].map(({ label, value, color }, i) => (
          <div key={label} className="flex-1 py-4 text-center"
            style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
          >
            <p className="font-black text-xl mb-0.5" style={{ color }}>{value}</p>
            <p className="text-xs tracking-widest uppercase text-white/20">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}