"use client";
import Link from "next/link";
import { EPISODES } from "../Data";

// Put files in /public/thumbnail/ (served from "/thumbnail/...")
// Export Ep1thumbnail.png at 1280x720
const THUMB_IMGS = [
  "/thumbnail/Ep1thumbnail.png",
  "/thumbnail/Ep2thumbnail.jpeg",
  "/thumbnail/Ep3thumbnail.jpeg",
];

// Link for the "Watch on YouTube" button
const WATCH_LINK = "https://yt.openinapp.co/3s0gu";

// Gold gradient shared with the "Watch Now" button
const GOLD_BTN_BG = "linear-gradient(135deg, #e6c76a 0%, #c9a84c 100%)";

const EpisodesSection = () => (
  <section
    id="episodes"
    className="py-28 px-4 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #0a0005 0%, #050000 100%)" }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139,0,0,0.1) 0%, transparent 70%)",
      }}
    />

    <div className="max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-4">
          <div
            className="h-px w-8"
            style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }}
          />
          <span
            className="text-sm font-semibold tracking-[0.28em] uppercase"
            style={{ color: "#c9a84c" }}
          >
            Watch Now
          </span>
          <div
            className="h-px w-8"
            style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }}
          />
        </div>
        <h2
          className="font-black leading-tight"
          style={{
            fontFamily: "'Poppins', 'system-ui', sans-serif",
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            color: "#ffffff",
          }}
        >
          The <span className="shimmer-text italic">Episodes</span>
        </h2>
        <p
          className="mt-3 text-sm"
          style={{ color: "rgba(255, 255, 255, 0.88)", fontWeight: 700 }}
        >
          All 3 episodes streaming on YouTube
        </p>
      </div>

      {/* Episode cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EPISODES.map((ep, i) => (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden block"
            style={{
              border: "1px solid rgba(201,168,76,0.12)",
              background: "#2a2a2a",
            }}
          >
            {/* Thumbnail: 16:9 = no heavy crop = sharper */}
            <Link
              href={ep.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-video overflow-hidden block cursor-pointer"
            >
              <img
                src={THUMB_IMGS[i]}
                alt={ep.title}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                // Lighter image: raise brightness, slight contrast + saturation
                style={{ filter: "brightness(1.05) contrast(1.05) saturate(1.1)" }}
              />

              {/* Episode tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded"
                  style={{
                    background: "rgba(0,0,0,0.7)",
                    color: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {ep.tag}
                </span>
              </div>

              {/* Views */}
              <div className="absolute top-3 right-3">
                <span
                  className="text-[10px] font-bold px-3 py-1 rounded"
                  style={{
                    background: "rgba(0,0,0,0.7)",
                    color: "#c9a84c",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  👁 {ep.views} views
                </span>
              </div>

              {/* Play button (smaller) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(201,168,76,0.9)" }}
                >
                  <span className="text-black text-xs ml-0.5">▶</span>
                </div>
              </div>
            </Link>

            {/* Card body */}
            <div className="p-5">
              <h3
                className="font-bold text-lg mb-1 text-white"
                style={{ fontFamily: "'Poppins', 'system-ui', sans-serif" }}
              >
                {ep.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255, 255, 255, 0.84)", fontWeight: 700 }}
              >
                {ep.desc}
              </p>

              {/* Watch on YouTube: same style as "Watch Now" button */}
              <Link
                href={WATCH_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{
                  background: GOLD_BTN_BG,
                  color: "#000",
                  boxShadow: "0 4px 16px rgba(201,168,76,0.25)",
                }}
              >
                {/* <span className="text-[10px]">▶</span> */}
                Watch on YouTube
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EpisodesSection;