"use client";
import { useState, useRef } from "react";

const CONTESTANTS = [
  { id: 1, name: "Aryan Mehta", handle: "@aryanmehta", followers: "2.1M", niche: "Lifestyle", eliminated: false, color: "#6C63FF", votes: 8421, img: "🔥", rank: 5 },
  { id: 2, name: "Priya Sharma", handle: "@priyavibes", followers: "3.4M", niche: "Fashion", eliminated: false, color: "#FF2D78", votes: 9102, img: "👗", rank: 3 },
  { id: 3, name: "Rohan Das", handle: "@rohandas_", followers: "1.8M", niche: "Fitness", eliminated: false, color: "#00E5FF", votes: 6734, img: "💪", rank: 7 },
  { id: 4, name: "Neha Kapoor", handle: "@nehakay", followers: "5.2M", niche: "Beauty", eliminated: false, color: "#9B4DFF", votes: 11230, img: "✨", rank: 2 },
  { id: 5, name: "Kabir Singh", handle: "@kabir.s", followers: "900K", niche: "Comedy", eliminated: true, color: "#555", votes: 3210, img: "😂", rank: 11 },
  { id: 6, name: "Zara Khan", handle: "@zarakofficial", followers: "4.1M", niche: "Travel", eliminated: false, color: "#00FFC8", votes: 8990, img: "🌍", rank: 4 },
  { id: 7, name: "Dev Malhotra", handle: "@devmalhotra", followers: "1.2M", niche: "Gaming", eliminated: false, color: "#FF4D6D", votes: 5560, img: "🎮", rank: 8 },
  { id: 8, name: "Isha Bose", handle: "@ishabose", followers: "2.7M", niche: "Food", eliminated: false, color: "#FFB347", votes: 7890, img: "🍜", rank: 6 },
  { id: 9, name: "Sid Verma", handle: "@sidverma", followers: "1.5M", niche: "Tech", eliminated: true, color: "#555", votes: 2100, img: "💻", rank: 12 },
  { id: 10, name: "Ananya Roy", handle: "@ananyaroy", followers: "6.8M", niche: "Dance", eliminated: false, color: "#FF2D78", votes: 14500, img: "💃", rank: 1 },
  { id: 11, name: "Karan Nair", handle: "@karannair", followers: "800K", niche: "Memes", eliminated: false, color: "#6C63FF", votes: 4320, img: "😤", rank: 9 },
  { id: 12, name: "Riya Joshi", handle: "@riyajoshi", followers: "3.0M", niche: "Wellness", eliminated: false, color: "#00FFC8", votes: 8100, img: "🧘", rank: 7 },
];

const NICHES = ["All", "Lifestyle", "Fashion", "Fitness", "Beauty", "Comedy", "Travel", "Gaming", "Food", "Tech", "Dance", "Memes", "Wellness"];

function ContestantCard({ contestant }) {
  const [hovered, setHovered] = useState(false);
  const isElim = contestant.eliminated;
  const c = contestant.color;

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: isElim
          ? "linear-gradient(135deg, #111120, #0a0a15)"
          : `linear-gradient(135deg, ${c}18, #0a0a1f)`,
        border: `1px solid ${isElim ? "rgba(255,255,255,0.06)" : c + "40"}`,
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered && !isElim ? `0 20px 50px ${c}25` : "0 4px 20px rgba(0,0,0,0.4)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rank badge */}
      {!isElim && contestant.rank <= 3 && (
        <div
          className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
          style={{
            background: contestant.rank === 1 ? "linear-gradient(135deg, #FFD700, #FF9500)" :
              contestant.rank === 2 ? "linear-gradient(135deg, #C0C0C0, #888)" :
              "linear-gradient(135deg, #CD7F32, #A0522D)",
            boxShadow: `0 0 12px ${c}60`,
          }}
        >
          {contestant.rank === 1 ? "👑" : `#${contestant.rank}`}
        </div>
      )}

      {/* Avatar area - fixed height, no aspect-square */}
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{
          height: "140px",
          background: isElim
            ? "linear-gradient(135deg, #15151f, #0d0d18)"
            : `linear-gradient(135deg, ${c}20, ${c}06)`,
        }}
      >
        {/* Decorative circles */}
        {!isElim && (
          <>
            <div className="absolute rounded-full pointer-events-none"
              style={{ width: 100, height: 100, border: `1px solid ${c}18`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
            <div className="absolute rounded-full pointer-events-none"
              style={{ width: 64, height: 64, border: `1px solid ${c}28`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          </>
        )}

        {isElim && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 backdrop-blur-sm">
            <span className="text-xs font-black tracking-widest uppercase text-red-400 border border-red-400/40 px-3 py-1 rounded-full" style={{ rotate: "-12deg" }}>
              Eliminated
            </span>
          </div>
        )}

        <span
          className="text-4xl relative z-10 transition-transform duration-300"
          style={{
            filter: isElim ? "grayscale(1) opacity(0.4)" : "none",
            transform: hovered && !isElim ? "scale(1.15)" : "scale(1)",
          }}
        >
          {contestant.img}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1 gap-1">
          <h3 className="font-black text-white text-xs leading-tight truncate">{contestant.name}</h3>
          <span
            className="text-xs font-black px-1.5 py-0.5 rounded-full flex-shrink-0 text-[10px]"
            style={{
              background: isElim ? "rgba(255,255,255,0.05)" : c + "18",
              color: isElim ? "#555" : c,
              border: `1px solid ${isElim ? "rgba(255,255,255,0.08)" : c + "35"}`,
            }}
          >
            {contestant.niche}
          </span>
        </div>
        <p className="text-white/30 text-[10px] mb-2">{contestant.handle}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-white/25 uppercase tracking-wider mb-0.5">Followers</p>
            <p className="text-xs font-black text-white">{contestant.followers}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-white/25 uppercase tracking-wider mb-0.5">Votes</p>
            <p className="text-xs font-black" style={{ color: isElim ? "#444" : c }}>
              {contestant.votes.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Vote bar */}
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(contestant.votes / 14500) * 100}%`,
              background: isElim ? "#222" : `linear-gradient(90deg, ${c}, ${c}70)`,
              boxShadow: !isElim ? `0 0 6px ${c}80` : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ContestantsGrid() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? CONTESTANTS
    : CONTESTANTS.filter((c) => c.niche === filter);

  return (
    <section className="py-20 px-6" style={{ background: "var(--c-bg)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-black tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(108,99,255,0.6)" }}>
            Season 1 · 12 Contestants
          </p>
          <h2
            className="font-black uppercase"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Contenders
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5))" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#6C63FF" }} />
            <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, rgba(108,99,255,0.5), transparent)" }} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {NICHES.map((niche) => (
            <button
              key={niche}
              onClick={() => setFilter(niche)}
              className="px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300"
              style={{
                background: filter === niche ? "linear-gradient(135deg, #6C63FF, #9B4DFF)" : "rgba(108,99,255,0.08)",
                color: filter === niche ? "#fff" : "rgba(255,255,255,0.45)",
                border: filter === niche ? "none" : "1px solid rgba(108,99,255,0.2)",
                boxShadow: filter === niche ? "0 0 20px rgba(108,99,255,0.4)" : "none",
                transform: filter === niche ? "scale(1.05)" : "scale(1)",
              }}
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Grid - 4 cols max to keep cards readable */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((c) => (
            <ContestantCard key={c.id} contestant={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
