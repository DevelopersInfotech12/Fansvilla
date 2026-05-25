"use client";
import { useState, useEffect } from "react";
import { CHALLENGES } from "../Data";

const CHALLENGE_IMGS = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&fit=crop",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&fit=crop",
];

const SHOW_CARDS = [
  {
    icon: "🎬",
    title: "Reel War",
    desc: "Create a viral reel in 60 mins. Most views wins immunity.",
    ends: "2h 14m",
    urgent: true,
    img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80&fit=crop",
    episodeTag: "Ep 14 • Live",
  },
  {
    icon: "👗",
    title: "Style Duel",
    desc: "Style your partner with villa wardrobe. Oracle picks the winner.",
    ends: "Tomorrow",
    urgent: false,
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop",
    episodeTag: "Ep 15 • Fri",
  },
  {
    icon: "📱",
    title: "Followers Faceoff",
    desc: "Go live. Whoever gains more followers in 30 mins stays.",
    ends: "3 days",
    urgent: false,
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80&fit=crop",
    episodeTag: "Ep 16 • Next",
  },
];

const ChallengesSection = () => {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(true);
  const c = CHALLENGES[active];

  useEffect(() => {
    const t = setInterval(() => setLive((l) => !l), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="challenges"
      className="py-28 px-4"
      style={{ background: "var(--bg-deep)" }}
    >
      
      <div className="max-w-6xl mx-auto">

        {/* ── Section Banner ── */}
        <div className="relative w-full h-48 mb-10 overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=80&fit=crop"
            alt="Challenges banner"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(1.3)", objectPosition: "center 30%" }}
          />
          {/* diagonal grid lines overlay */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.07 }}
          >
            <line x1="0" y1="48" x2="100%" y2="48" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="0" y1="144" x2="100%" y2="144" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="55%" y1="0" x2="55%" y2="100%" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="83%" y1="0" x2="83%" y2="100%" stroke="#c9a84c" strokeWidth="0.5" />
          </svg>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(22,17,26,0.92) 0%, rgba(22,17,26,0.60) 55%, rgba(22,17,26,0.10) 100%)",
            }}
          />
          {/* radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 75% 50%, rgba(185,28,58,0.15) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-0 flex items-center px-10">
            <div>
              <div
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-3"
                style={{
                  background: "rgba(185,28,58,0.18)",
                  border: "1px solid rgba(185,28,58,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full transition-opacity duration-300"
                  style={{ background: "#ef3a5a", opacity: live ? 1 : 0.2 }}
                />
                <span
                  className="text-xs font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "#ef3a5a" }}
                >
                  Live Challenges
                </span>
              </div>
              <h2
                className="font-black text-white leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                }}
              >
                The{" "}
                <span
                  className="italic"
                  style={{
                    background: "linear-gradient(135deg, #ef3a5a, #c9a84c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Arena
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ── Active Challenge Strip ── */}
        <div
          className="relative rounded-3xl overflow-hidden mb-4"
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* bg layer */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(185,28,58,0.12) 0%, #16111a 50%, rgba(201,168,76,0.06) 100%)",
            }}
          />
          {/* background image */}
          <div className="absolute inset-0">
            <img
              src={CHALLENGE_IMGS[active % CHALLENGE_IMGS.length]}
              alt={c.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: "brightness(0.38) saturate(1.1)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(22,17,26,0.95) 0%, rgba(22,17,26,0.75) 60%, rgba(22,17,26,0.30) 100%)",
              }}
            />
          </div>
          {/* gold top line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)",
            }}
          />

          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start gap-8">
            <div className="text-7xl">{c.icon}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3
                  className="font-black text-3xl" style={{ color: "#ffffff" }}
                >
                  {c.title}
                </h3>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{
                    background: "rgba(185,28,58,0.25)",
                    color: "#ef3a5a",
                    border: "1px solid rgba(185,28,58,0.45)",
                  }}
                >
                  Active
                </span>
              </div>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#fff", fontWeight: 300 }}
              >
                {c.desc}
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <div
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "#fff" }}
                  >
                    Prize
                  </div>
                  <div className="font-bold" style={{ color: "#e8c97a" }}>
                    {c.prize}
                  </div>
                </div>
                <div>
                  <div
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "#fff" }}
                  >
                    Ends
                  </div>
                  <div className="font-bold" style={{ color: "#ef3a5a" }}>
                    {c.ends}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="text-white font-bold px-8 py-4 rounded-2xl transition-all whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #b91c3a 0%, #8b1030 50%, #c9a84c 150%)",
                boxShadow: "0 8px 30px rgba(185,28,58,0.5)",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(185,28,58,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(185,28,58,0.5)";
              }}
            >
              Vote Now
            </button>
          </div>
        </div>

        {/* ── Episode / Show Cards ── */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {SHOW_CARDS.map((card, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                border: card.urgent
                  ? "1px solid rgba(185,28,58,0.45)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: card.urgent ? "0 0 0 1px rgba(185,28,58,0.15)" : "none",
                background: "#200d18",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.border = card.urgent
                  ? "1px solid rgba(185,28,58,0.7)"
                  : "1px solid rgba(201,168,76,0.35)";
                e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(0,0,0,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.border = card.urgent
                  ? "1px solid rgba(185,28,58,0.45)"
                  : "1px solid rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = card.urgent
                  ? "0 0 0 1px rgba(185,28,58,0.15)"
                  : "none";
              }}
            >
              {/* Card image */}
              <div className="relative h-70 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "brightness(0.60) saturate(1.3)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(22,17,26,1) 0%, rgba(22,17,26,0.08) 55%, transparent 100%)",
                  }}
                />
                {/* Episode tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(0,0,0,0.65)",
                      color: "rgba(255,255,255,0.72)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {card.episodeTag}
                  </span>
                </div>
                {/* Icon */}
                <div className="absolute bottom-3 left-4 text-3xl">{card.icon}</div>
                {/* Live badge */}
                {card.urgent && (
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(185,28,58,0.8)",
                      border: "1px solid rgba(185,28,58,0.95)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                    />
                    <span className="text-white text-[10px] font-bold">LIVE</span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-bold text-xl mb-1" style={{ color: "#ef3a5a" }}>{card.title}</h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}
                >
                  {card.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: "#fff" }}>
                      Ends in
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: card.urgent
                          ? "#ef3a5a"
                          : card.ends === "Tomorrow"
                          ? "#e8c97a"
                          : "#34d399",
                      }}
                    >
                      {card.ends}
                    </span>
                  </div>
                  <button
                    className="text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:scale-105"
                    style={{
                      background: card.urgent
                        ? "rgba(185,28,58,0.2)"
                        : "rgba(201,168,76,0.12)",
                      color: card.urgent ? "#ef3a5a" : "#e8c97a",
                      border: `1px solid ${
                        card.urgent
                          ? "rgba(185,28,58,0.4)"
                          : "rgba(201,168,76,0.3)"
                      }`,
                    }}
                  >
                    {card.urgent ? "Vote →" : "Remind Me"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;