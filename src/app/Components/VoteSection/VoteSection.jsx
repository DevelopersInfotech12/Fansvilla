"use client";
import { useState, useEffect } from "react";

const VOTE_CONTESTANTS = [
  { id: 1, name: "Ananya Roy", handle: "@ananyaroy", niche: "Dance", color: "#FF2D78", votes: 14500, img: "💃" },
  { id: 2, name: "Neha Kapoor", handle: "@nehakay", niche: "Beauty", color: "#9B4DFF", votes: 11230, img: "✨" },
  { id: 3, name: "Priya Sharma", handle: "@priyavibes", niche: "Fashion", color: "#6C63FF", votes: 9102, img: "👗" },
  { id: 4, name: "Zara Khan", handle: "@zarakofficial", niche: "Travel", color: "#00FFC8", votes: 8990, img: "🌍" },
  { id: 5, name: "Aryan Mehta", handle: "@aryanmehta", niche: "Lifestyle", color: "#00E5FF", votes: 8421, img: "🔥" },
  { id: 6, name: "Isha Bose", handle: "@ishabose", niche: "Food", color: "#FFB347", votes: 7890, img: "🍜" },
];

const total = VOTE_CONTESTANTS.reduce((s, c) => s + c.votes, 0);

export default function VoteSection() {
  const [voted, setVoted] = useState(null);
  const [localVotes, setLocalVotes] = useState({});
  const [animatedVoted, setAnimatedVoted] = useState(null);

  const handleVote = (id) => {
    if (voted) return;
    setAnimatedVoted(id);
    setTimeout(() => {
      setVoted(id);
      setLocalVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }, 300);
  };

  const totalWithLocal = total + Object.values(localVotes).reduce((s, v) => s + v, 0);

  return (
    <section
      id="vote"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--c-bg)" }}
    >
      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 70%)" }} />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-black tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(255,45,120,0.7)" }}>
            Live Voting · Round 5
          </p>
          <h2
            className="font-black uppercase mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #6C63FF, #FF2D78)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Save Your Favourite
          </h2>

          {/* Voting deadline bar */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{ background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.25)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FF2D78" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#FF2D78" }} />
            </span>
            <p className="text-white/60 text-sm font-bold">
              {voted ? "✓ Your vote has been counted. Come back tomorrow!" : "Voting closes at midnight · Every vote counts"}
            </p>
          </div>
        </div>

        {/* Vote rows */}
        <div className="flex flex-col gap-3">
          {VOTE_CONTESTANTS.map((c, i) => {
            const voteCount = c.votes + (localVotes[c.id] || 0);
            const pct = Math.round((voteCount / totalWithLocal) * 100);
            const isVoted = voted === c.id;
            const isAnimating = animatedVoted === c.id;

            return (
              <div
                key={c.id}
                className="relative rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: isVoted ? `${c.color}12` : "rgba(10,10,26,0.8)",
                  border: `1px solid ${isVoted ? c.color + "50" : "rgba(108,99,255,0.12)"}`,
                  transform: isAnimating ? "scale(1.02)" : "scale(1)",
                  boxShadow: isVoted ? `0 0 30px ${c.color}20` : "none",
                }}
              >
                {/* Progress fill */}
                <div
                  className="absolute left-0 top-0 h-full pointer-events-none transition-all duration-700"
                  style={{
                    width: voted ? `${pct}%` : "0%",
                    background: `linear-gradient(90deg, ${c.color}18, transparent)`,
                  }}
                />

                <div className="relative flex items-center gap-3 p-4 flex-wrap sm:flex-nowrap">
                  {/* Rank */}
                  <span
                    className="text-lg font-black w-9 text-center flex-shrink-0"
                    style={{ color: i === 0 ? "#FFD700" : "rgba(255,255,255,0.2)" }}
                  >
                    {i === 0 ? "👑" : `#${i + 1}`}
                  </span>

                  {/* Avatar with emoji */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 font-black"
                    style={{
                      background: `linear-gradient(135deg, ${c.color}30, ${c.color}10)`,
                      border: `1.5px solid ${c.color}40`,
                      boxShadow: isVoted ? `0 0 15px ${c.color}40` : "none",
                    }}
                  >
                    {c.img}
                  </div>

                  {/* Name + handle */}
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-white text-sm">{c.name}</p>
                    <p className="text-xs" style={{ color: isVoted ? c.color : "rgba(255,255,255,0.3)" }}>{c.handle}</p>
                  </div>

                  {/* Niche tag */}
                  <div
                    className="hidden sm:block text-xs font-black px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}
                  >
                    {c.niche}
                  </div>

                  {/* Stats after voting */}
                  {voted && (
                    <div className="text-right mr-2 flex-shrink-0">
                      <p className="font-black text-white text-base">{pct}%</p>
                      <p className="text-xs text-white/30">{voteCount.toLocaleString()}</p>
                    </div>
                  )}

                  {/* Vote button */}
                  <button
                    onClick={() => handleVote(c.id)}
                    disabled={!!voted}
                    className="px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 flex-shrink-0"
                    style={{
                      background: isVoted
                        ? `linear-gradient(135deg, ${c.color}, ${c.color}aa)`
                        : voted
                        ? "rgba(255,255,255,0.04)"
                        : "linear-gradient(135deg, #6C63FF, #9B4DFF)",
                      color: isVoted ? "#fff" : voted ? "rgba(255,255,255,0.15)" : "#fff",
                      cursor: voted ? "default" : "pointer",
                      boxShadow: !voted ? "0 0 20px rgba(108,99,255,0.4)" : isVoted ? `0 0 20px ${c.color}40` : "none",
                    }}
                    onMouseEnter={e => { if (!voted) { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 0 35px rgba(108,99,255,0.7)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; if (!voted) e.currentTarget.style.boxShadow = "0 0 20px rgba(108,99,255,0.4)"; }}
                  >
                    {isVoted ? "✓ Voted" : "Vote"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {!voted && (
          <p className="text-center text-white/20 text-xs mt-6 tracking-wider">
            Vote once per day · Results update in real-time
          </p>
        )}

        {voted && (
          <div
            className="mt-8 rounded-2xl p-6 text-center"
            style={{
              background: "rgba(108,99,255,0.08)",
              border: "1px solid rgba(108,99,255,0.2)",
            }}
          >
            <p className="font-black text-white text-lg mb-1">🎉 Thank you for voting!</p>
            <p className="text-white/40 text-sm">Come back tomorrow to vote again. Tell your friends!</p>
          </div>
        )}
      </div>
    </section>
  );
}
