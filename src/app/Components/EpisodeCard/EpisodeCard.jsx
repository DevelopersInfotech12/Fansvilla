"use client";
import { useState, useRef } from "react";

const EPISODES = [
  { id: 1, ep: "EP 01", title: "The Grand Entry", desc: "18 influencers arrive at the Villa of Flames. Alliances form in minutes, drama in seconds.", duration: "42 min", date: "Jul 15", status: "watch", hot: true, color: "#6C63FF", img: "🏰" },
  { id: 2, ep: "EP 02", title: "Follower Wars", desc: "A viral challenge puts followers at stake. Who can go live under pressure?", duration: "38 min", date: "Jul 22", status: "watch", hot: false, color: "#FF2D78", img: "📱" },
  { id: 3, ep: "EP 03", title: "Collab or Stab", desc: "Forced collabs create awkward chemistry — and unexpected betrayals.", duration: "45 min", date: "Jul 29", status: "watch", hot: true, color: "#00E5FF", img: "🤝" },
  { id: 4, ep: "EP 04", title: "The Unfollow", desc: "First elimination night. The villa goes silent. One creator's journey ends tonight.", duration: "40 min", date: "Aug 5", status: "watch", hot: false, color: "#9B4DFF", img: "💔" },
  { id: 5, ep: "EP 05", title: "Brand Deal Heist", desc: "A real brand deal is up for grabs. Pitches, presentations, and pure chaos.", duration: "43 min", date: "Aug 12", status: "upcoming", hot: false, color: "#00FFC8", img: "💼" },
  { id: 6, ep: "EP 06", title: "The Final Reel", desc: "Only the greatest creator wins it all. Who deserves the throne?", duration: "60 min", date: "Aug 19", status: "upcoming", hot: false, color: "#FF2D78", img: "👑" },
];

function EpisodeItem({ ep }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isUpcoming = ep.status === "upcoming";

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: isUpcoming
          ? "linear-gradient(135deg, #0d0d1f, #080810)"
          : `linear-gradient(135deg, ${ep.color}12, #0a0a1f)`,
        border: `1px solid ${hovered && !isUpcoming ? ep.color + "45" : "rgba(108,99,255,0.1)"}`,
        transform: hovered
          ? `translateY(-8px) perspective(600px) rotateY(${mouse.x * 5}deg) rotateX(${-mouse.y * 3}deg)`
          : "translateY(0)",
        boxShadow: hovered && !isUpcoming ? `0 24px 70px ${ep.color}25` : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }}
      onMouseMove={handleMove}
    >
      {/* Thumbnail */}
      <div
        className="w-full h-44 flex items-center justify-center relative overflow-hidden"
        style={{
          background: isUpcoming
            ? "linear-gradient(135deg, #0d0d1f, #111125)"
            : `linear-gradient(135deg, ${ep.color}18, ${ep.color}05)`,
        }}
      >
        {/* Animated background mesh */}
        {!isUpcoming && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, ${ep.color}20 0%, transparent 60%)`,
              transition: "background 0.15s ease-out",
            }}
          />
        )}

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${ep.color}06 1px, transparent 1px), linear-gradient(90deg, ${ep.color}06 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }} />

        {ep.hot && (
          <span
            className="absolute top-3 right-3 text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full z-10"
            style={{ background: "linear-gradient(135deg, #FF2D78, #6C63FF)", color: "#fff", boxShadow: "0 0 15px rgba(255,45,120,0.5)" }}
          >
            🔥 Hot
          </span>
        )}

        {/* EP number badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs font-black tracking-widest uppercase px-2 py-1 rounded-lg"
            style={{ background: `${ep.color}25`, color: ep.color, border: `1px solid ${ep.color}35` }}>
            {ep.ep}
          </span>
        </div>

        {isUpcoming ? (
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
              🔒
            </div>
            <span className="text-xs font-black text-white/30 uppercase tracking-widest">Coming Soon</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 relative z-10">
            {/* Emoji thumbnail */}
            <div className="text-5xl transition-all duration-300" style={{ transform: hovered ? "scale(1.2)" : "scale(1)" }}>
              {ep.img}
            </div>

            {/* Play button overlay on hover */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: hovered
                  ? `linear-gradient(135deg, ${ep.color}, ${ep.color}aa)`
                  : "rgba(255,255,255,0.08)",
                boxShadow: hovered ? `0 0 25px ${ep.color}60` : "none",
                transform: hovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <span className="text-white text-lg ml-1">▶</span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30">{ep.duration}</span>
            <span className="text-xs text-white/20">·</span>
            <span className="text-xs text-white/30">{ep.date}</span>
          </div>
        </div>
        <h3
          className="font-black text-base mb-2"
          style={{ color: isUpcoming ? "rgba(255,255,255,0.25)" : "#fff" }}
        >
          {ep.title}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: isUpcoming ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)" }}
        >
          {ep.desc}
        </p>

        {/* Bottom action row */}
        {!isUpcoming && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: ep.color }} />
              <span className="text-xs font-bold" style={{ color: ep.color }}>Available</span>
            </div>
            <button
              className="text-xs font-black tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: `${ep.color}20`,
                color: ep.color,
                border: `1px solid ${ep.color}35`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = ep.color; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = ep.color + "20"; e.currentTarget.style.color = ep.color; }}
            >
              Watch →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EpisodeCard() {
  return (
    <section className="py-24 px-6" id="episodes" style={{ background: "var(--c-surface)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-black tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(0,229,255,0.6)" }}>
            Season 1 · 6 Episodes
          </p>
          <h2
            className="font-black uppercase"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Episodes
          </h2>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.5))" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#00E5FF" }} />
            <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, rgba(0,229,255,0.5), transparent)" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EPISODES.map((ep) => (
            <EpisodeItem key={ep.id} ep={ep} />
          ))}
        </div>
      </div>
    </section>
  );
}
