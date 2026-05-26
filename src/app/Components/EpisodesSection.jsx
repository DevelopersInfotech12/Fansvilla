"use client";
import { EPISODES } from "../Data";

const THUMB_IMGS = [
  "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&fit=crop",
];

const EpisodesSection = () => (
  <section
    id="episodes"
    className="py-28 px-4 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #0a0005 0%, #0d0507 100%)" }}
  >
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139,0,0,0.1) 0%, transparent 70%)" }} />

    <div className="max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
          <span className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: "#c9a84c" }}>Watch Now</span>
          <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
        </div>
        <h2 className="font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#ffffff" }}>
          The <span className="shimmer-text italic">Episodes</span>
        </h2>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
          All 3 episodes streaming on YouTube
        </p>
      </div>

      {/* Episode cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EPISODES.map((ep, i) => (
          <a
            key={i}
            href={ep.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden cursor-pointer block transition-all duration-300 hover:-translate-y-2"
            style={{
              border: "1px solid rgba(201,168,76,0.12)",
              background: "#0a0005",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = "1px solid rgba(201,168,76,0.45)";
              e.currentTarget.style.boxShadow = "0 20px 52px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "1px solid rgba(201,168,76,0.12)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={THUMB_IMGS[i]}
                alt={ep.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: "brightness(0.55) saturate(1.2)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,0,0,1) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

              {/* Episode tag */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded"
                  style={{ background: "rgba(0,0,0,0.7)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(6px)" }}>
                  {ep.tag}
                </span>
              </div>

              {/* Views */}
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded"
                  style={{ background: "rgba(0,0,0,0.7)", color: "#c9a84c", backdropFilter: "blur(6px)" }}>
                  👁 {ep.views} views
                </span>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.9)", boxShadow: "0 0 30px rgba(201,168,76,0.6)" }}>
                  <span className="text-black text-xl ml-1">▶</span>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1 text-white">{ep.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{ep.desc}</p>
              <div className="mt-4 flex items-center gap-1.5" style={{ color: "#c9a84c" }}>
                <span className="text-xs font-bold">Watch on YouTube →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default EpisodesSection;
