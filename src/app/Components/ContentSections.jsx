"use client";

import { useState } from "react";
import { GAMES, XTRA_DOSE, VILLA_BUZZ, PROMOS } from '../Data';

/* ── Design tokens ───────────────────────────── */
const T = {
  bg:      "#080808",
  surface: "#111111",
  border:  "#222222",
  pink:    "#FF2D6B",
  yellow:  "#F5C518",
  cyan:    "#00E5CC",
  white:   "#F0EDE8",
  muted:   "rgba(240,237,232,0.35)",
};

/* ── Reusable section header ─────────────────── */
function SectionHead({ label, issue, accent = T.pink }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, borderBottom: `1px solid ${T.border}`, paddingBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 5, height: 42, background: accent, flexShrink: 0 }} />
        <h2 style={{ fontFamily: "'Bebas Neue', 'Impact', cursive", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: T.white, letterSpacing: "0.03em", lineHeight: 1, margin: 0 }}>
          {label}
        </h2>
      </div>
      {issue && (
        <span style={{ fontFamily: "monospace", fontSize: 11, color: T.muted, letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: 2 }}>
          {issue}
        </span>
      )}
    </div>
  );
}

/* ── Game Card ───────────────────────────────── */
function GameCard({ g }) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        padding: "24px 16px 20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = g.color;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 28px 28px 0", borderColor: `transparent ${g.color} transparent transparent` }} />
      <div style={{ fontSize: 32, marginBottom: 12, filter: "saturate(0.9)" }}>{g.icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 15, color: T.white, letterSpacing: "0.08em", lineHeight: 1.2 }}>{g.label}</div>
    </div>
  );
}

/* ── Shared YouTube Card ─────────────────────── */
function YouTubeCard({ youtubeId, title, label, badge, accent }) {
  const [playing, setPlaying] = useState(false);

  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const thumbFallback = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const displayTitle = title || label;

  return (
    <div
      style={{ background: T.surface, border: `1px solid ${T.border}`, cursor: "pointer", transition: "border-color 0.2s, transform 0.2s", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "relative", aspectRatio: "16/9", background: "#000", overflow: "hidden" }}>
        {playing ? (
          <iframe
            src={embedUrl}
            title={displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        ) : (
          <div style={{ position: "relative", width: "100%", height: "100%" }} onClick={() => setPlaying(true)}>
            <img
              src={thumb}
              alt={displayTitle}
              onError={e => { e.currentTarget.src = thumbFallback; }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.15) 60%)" }} />
            <div style={{ position: "absolute", top: 10, left: 10, background: "#080808", border: `1px solid ${accent}`, padding: "2px 8px", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>{badge}</div>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(255,0,0,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "#fff",
              boxShadow: "0 4px 20px rgba(255,0,0,0.5)",
            }}>▶</div>
            <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 2 }}>YouTube</div>
          </div>
        )}
      </div>
      <div style={{ padding: "14px 18px 16px" }}>
        <p style={{ color: T.white, fontSize: 13, fontWeight: 600, lineHeight: 1.55, margin: "0 0 12px" }}>{displayTitle}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: accent, fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", textDecoration: "none" }}
            onClick={e => e.stopPropagation()}
          >
            WATCH ON YT →
          </a>
          <span style={{ color: T.muted, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Splitsvilla X6</span>
        </div>
      </div>
    </div>
  );
}

/* ── Gallery Images ──────────────────────────── */
const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=70&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=70&fit=crop",
];

const ACCENTS = [T.pink, T.yellow, T.cyan];

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function ContentSections() {
  return (
    <div style={{ background: T.bg, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", overflowX: "hidden" }}>

      {/* ── GAME ZONE ─────────────────────────────── */}
      <section style={{ padding: "72px 5%" }}>
        <SectionHead label="Game Zone" issue="FansVilla · Season 01" accent={T.pink} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 0, border: `1px solid ${T.border}`, marginBottom: 24 }}>
          <div style={{ padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 36px)", borderRight: `1px solid ${T.border}` }}>
            <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1, color: T.white, margin: "0 0 16px" }}>
              Play more,<br /><span style={{ color: T.pink }}>Win more.</span>
            </p>
            <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.75, maxWidth: 340, margin: "0 0 24px" }}>
              Sign up, jump into 6 crazy-fun games, stack up points, and level up even faster by watching more content. Climb the leaderboard, claim the top spot.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.surface, border: `1px solid ${T.border}`, padding: "12px 20px" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: T.muted, letterSpacing: "0.15em" }}>TOP 10 WINNERS</span>
              <span style={{ width: 1, height: 14, background: T.border }} />
              <span style={{ fontSize: 12, color: T.yellow, fontWeight: 700 }}>Villa Merch + Meet & Greet</span>
            </div>
          </div>
          <div style={{ padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 36px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>Top 100 Prize</div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(3rem, 6vw, 5rem)", color: T.yellow, lineHeight: 1 }}>₹7,000</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 6 }}>NEWME vouchers · Guaranteed</div>
            </div>
            <div style={{ marginTop: 28, padding: "14px 0", borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: T.pink, textTransform: "uppercase", marginBottom: 4 }}>Season Prize Pool</div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2.2rem", color: T.white, lineHeight: 1 }}>₹50 Lakhs</div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 1, background: T.border }}>
          {GAMES.map(g => (
            <div key={g.label} style={{ background: T.bg }}><GameCard g={g} /></div>
          ))}
        </div>
      </section>

      {/* ── XTRA DOSE ─────────────────────────────── */}
      <section style={{ padding: "0 5% 72px" }}>
        <SectionHead label="Xtra Dose" issue="Latest Drops" accent={T.cyan} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 2, background: T.border }}>
          {XTRA_DOSE.map((v, i) => (
            <div key={i} style={{ background: T.bg }}>
              <YouTubeCard
                youtubeId={v.youtubeId}
                label={v.label}
                badge="XTRA"
                accent={ACCENTS[i % ACCENTS.length]}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST PROMOS ─────────────────────────── */}
      <section style={{ padding: "0 5% 72px" }}>
        <SectionHead label="Latest Promos" issue="Sponsored · S01" accent={T.yellow} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 2, background: T.border }}>
          {PROMOS.map((p, i) => (
            <div key={i} style={{ background: T.bg }}>
              <YouTubeCard
                youtubeId={p.youtubeId}
                label={p.label}
                badge="PROMO"
                accent={ACCENTS[i % ACCENTS.length]}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── VILLA BUZZ ────────────────────────────── */}
      <section style={{ padding: "0 5% 72px" }}>
        <SectionHead label="Villa Buzz" issue="Fan Reports" accent={T.pink} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(270px, 100%), 1fr))", gap: 2, background: T.border }}>
          {VILLA_BUZZ.map((b, i) => (
            <div key={i} style={{ background: T.bg }}>
              <YouTubeCard
                youtubeId={b.youtubeId}
                title={b.title}
                badge="BUZZ"
                accent={ACCENTS[i % ACCENTS.length]}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FAN GALLERY ───────────────────────────── */}
      <section style={{ padding: "0 5% 72px" }}>
        <div style={{ border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: `1px solid ${T.border}`, gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 5, height: 32, background: T.yellow }} />
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", color: T.white, margin: 0, letterSpacing: "0.03em" }}>Fan Gallery</h2>
            </div>
            <button
              style={{ background: "transparent", border: `1px solid ${T.pink}`, color: T.pink, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", padding: "9px 20px", cursor: "pointer", transition: "background 0.2s, color 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.pink; e.currentTarget.style.color = "#080808"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.pink; }}
            >Upload Yours ✦</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, calc(50% - 2px)), 1fr))", gap: 2, background: T.border, padding: 2 }}>
            {GALLERY_IMGS.map((src, i) => (
              <div key={i}
                style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer", position: "relative", background: T.surface }}
                onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.08)"; e.currentTarget.querySelector(".overlay").style.opacity = "1"; }}
                onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "0"; }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }} />
                <div className="overlay" style={{ position: "absolute", inset: 0, background: `${T.pink}22`, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 13, color: T.white, letterSpacing: "0.15em" }}>VIEW</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 28px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: T.muted, letterSpacing: "0.15em" }}>SHOWING 6 OF 2,847 UPLOADS</span>
            <span style={{ fontSize: 11, color: T.cyan, fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em" }}>LOAD MORE →</span>
          </div>
        </div>
      </section>

    </div>
  );
}