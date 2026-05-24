"use client";

import { useState, useEffect, useRef } from 'react';

const SLIDES = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80',
    // Party/crowd scene — dramatic lights
    tag: '🔥 SEASON 1 · NOW CASTING',
    title: 'INFLUENZA',
    subtitle: 'THE INFLUENCE GAMES',
    desc: '18 influencers. One villa. Unlimited drama. Only the most authentic creator wins.',
    cta: 'Apply Now',
    ctaSecondary: 'Watch Trailer',
    accent: '#00D4FF',
    accentB: '#7B2FFF',
    stat: [['18', 'Creators'], ['₹50L', 'Prize'], ['90', 'Days']],
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80',
    // Concert / stage lights
    tag: '🎮 CHALLENGES · WEEKLY DROPS',
    title: 'PLAY THE',
    subtitle: 'GAME',
    desc: 'Vote, dare, and challenge your favorite creators. Every interaction counts toward the crown.',
    cta: 'Join the Game',
    ctaSecondary: 'Leaderboard',
    accent: '#FF3CAC',
    accentB: '#FF8C00',
    stat: [['6', 'Games'], ['10K+', 'Fans'], ['Weekly', 'Drops']],
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80',
    // Matrix / digital neon
    tag: '👑 FINAL EPISODE · VOTE NOW',
    title: 'ONLY ONE',
    subtitle: 'SURVIVES',
    desc: 'The villa has spoken. Cast your final vote and decide who walks away as the ultimate influencer.',
    cta: 'Cast Your Vote',
    ctaSecondary: 'See Results',
    accent: '#00FF94',
    accentB: '#00D4FF',
    stat: [['Final', 'Episode'], ['48H', 'Left'], ['1', 'Winner']],
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState({});
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 600);
  };

  const next = () => goTo((current + 1) % SLIDES.length);
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [current, transitioning]);

  const s = SLIDES[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .infl-hero { position: relative; width: 100%; height: 100vh; overflow: hidden; background: #050a18; font-family: 'DM Sans', sans-serif; }

        /* banner image */
        .infl-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          transition: opacity 0.7s ease, transform 0.7s ease;
          transform-origin: center;
        }
        .infl-img.out { opacity: 0; transform: scale(1.04); }
        .infl-img.in  { opacity: 1; transform: scale(1); }

        /* overlays */
        .infl-overlay-dark {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            rgba(5,10,24,0.97) 0%,
            rgba(5,10,24,0.75) 40%,
            rgba(5,10,24,0.25) 70%,
            rgba(5,10,24,0.05) 100%
          );
        }
        .infl-overlay-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to top, #050a18 0%, transparent 100%);
        }
        .infl-overlay-color {
          position: absolute; inset: 0;
          transition: background 0.8s ease;
          pointer-events: none;
        }

        /* content */
        .infl-content {
          position: absolute; inset: 0; z-index: 10;
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 7%;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .infl-content.out { opacity: 0; transform: translateY(16px); }
        .infl-content.in  { opacity: 1; transform: translateY(0); }

        .infl-tag {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 50px; padding: 6px 16px; width: fit-content;
          font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 24px;
          backdrop-filter: blur(12px);
          border: 1px solid;
          transition: all 0.6s ease;
        }
        .infl-tag-dot { width: 6px; height: 6px; border-radius: 50%; animation: pulse-dot 1.5s ease infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }

        .infl-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(72px, 11vw, 148px);
          line-height: 0.85; letter-spacing: 4px;
          color: #fff; margin-bottom: 0;
          transition: all 0.6s ease 0.1s;
        }
        .infl-subtitle {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(52px, 8vw, 108px);
          line-height: 0.85; letter-spacing: 6px;
          margin-bottom: 8px;
          transition: all 0.6s ease 0.15s;
          -webkit-text-stroke: 2px;
        }
        .infl-rule {
          height: 2px; width: 48px;
          margin-bottom: 20px; border-radius: 2px;
          transition: background 0.6s ease;
        }
        .infl-desc {
          color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.7;
          max-width: 460px; margin-bottom: 36px;
          font-weight: 300; letter-spacing: 0.3px;
          transition: all 0.6s ease 0.2s;
        }
        .infl-desc strong { color: #fff; font-weight: 600; }

        .infl-btns { display: flex; gap: 14px; align-items: center; margin-bottom: 48px; flex-wrap: wrap; }
        .infl-btn-primary {
          padding: 14px 32px; border: none; border-radius: 4px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          letter-spacing: 0.5px; cursor: pointer;
          transition: all 0.2s ease; text-transform: uppercase;
        }
        .infl-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
        .infl-btn-ghost {
          padding: 13px 30px; border-radius: 4px; background: transparent;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          letter-spacing: 0.5px; cursor: pointer;
          transition: all 0.2s ease; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.85);
        }
        .infl-btn-ghost:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }

        .infl-stats { display: flex; gap: 0; }
        .infl-stat {
          padding: 0 28px 0 0; margin-right: 28px;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .infl-stat:last-child { border-right: none; }
        .infl-stat-n {
          font-family: 'Bebas Neue', cursive; font-size: 36px; line-height: 1;
          transition: color 0.5s ease;
        }
        .infl-stat-l { font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 2px; }

        /* right side image frame */
        .infl-frame {
          position: absolute; right: 5%; top: 50%; transform: translateY(-50%);
          width: clamp(280px, 30vw, 420px); z-index: 8;
          transition: opacity 0.6s ease;
        }
        .infl-frame-inner {
          position: relative; border-radius: 2px; overflow: hidden;
          aspect-ratio: 9/14;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .infl-frame-inner img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: brightness(0.85) contrast(1.1); }
        .infl-frame-corner {
          position: absolute; width: 20px; height: 20px;
          border-color: inherit; border-style: solid; border-width: 0;
        }
        .infl-frame-corner.tl { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
        .infl-frame-corner.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
        .infl-frame-corner.bl { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }
        .infl-frame-corner.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }
        .infl-frame-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 32px 16px 14px;
          background: linear-gradient(to top, rgba(5,10,24,0.95) 0%, transparent 100%);
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          font-weight: 600; text-align: center;
          transition: color 0.5s ease;
        }

        /* bottom nav */
        .infl-nav {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 20;
          display: flex; height: 80px;
        }
        .infl-nav-item {
          flex: 1; position: relative; overflow: hidden;
          cursor: pointer; border: none; background: none; padding: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          transition: background 0.3s ease;
        }
        .infl-nav-item:hover { background: rgba(255,255,255,0.04); }
        .infl-nav-thumb { width: 100%; height: 100%; object-fit: cover; opacity: 0.15; transition: opacity 0.3s; }
        .infl-nav-item.active .infl-nav-thumb { opacity: 0.35; }
        .infl-nav-info {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'Bebas Neue', cursive; font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.4); transition: color 0.3s;
        }
        .infl-nav-item.active .infl-nav-info { color: #fff; }
        .infl-nav-dot { width: 5px; height: 5px; border-radius: 50%; opacity: 0; transition: opacity 0.3s; }
        .infl-nav-item.active .infl-nav-dot { opacity: 1; }
        .infl-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          transition: background 0.5s ease;
        }
        .infl-progress.running { animation: progressFill 6s linear forwards; }
        @keyframes progressFill { from { width: 0 } to { width: 100% } }

        /* arrows */
        .infl-arrow {
          position: absolute; top: calc(50% - 40px); z-index: 20;
          width: 48px; height: 48px; border-radius: 2px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
          color: #fff; font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }
        .infl-arrow:hover { background: rgba(255,255,255,0.14); }
        .infl-arrow.left  { left: 20px; }
        .infl-arrow.right { right: 20px; }

        /* floating influencer cards */
        .infl-card {
          position: absolute; z-index: 15;
          background: rgba(10,16,36,0.85); backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
          padding: 10px 14px; display: flex; align-items: center; gap: 10px;
          animation: floatCard 4s ease-in-out infinite;
          min-width: 160px;
        }
        .infl-card.top-left  { top: 12%; left: 2%; animation-delay: 0s; }
        .infl-card.bot-left  { bottom: 18%; left: 2%; animation-delay: 1.5s; }
        .infl-card.bot-right { bottom: 18%; right: 6%; animation-delay: 0.8s; }
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .infl-card-avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }
        .infl-card-name  { font-size: 12px; font-weight: 600; color: #fff; }
        .infl-card-sub   { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 1px; }
        .infl-card-live  { width: 6px; height: 6px; border-radius: 50%; background: #00FF94; margin-left: auto; box-shadow: 0 0 6px #00FF94; }

        /* season badge top center */
        .infl-season-badge {
          position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
          z-index: 20; display: flex; align-items: center; gap: 8px;
          background: rgba(10,16,36,0.7); backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.15); border-radius: 50px;
          padding: 7px 20px; color: #fff; font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; white-space: nowrap;
        }
      `}</style>

      <div className="infl-hero">

        {/* Banner image */}
        <img
          key={s.id}
          src={s.image}
          alt={s.title}
          className={`infl-img ${transitioning ? 'out' : 'in'}`}
        />

        {/* Overlays */}
        <div className="infl-overlay-dark" />
        <div className="infl-overlay-bottom" />
        <div className="infl-overlay-color" style={{ background: `radial-gradient(ellipse at 65% 40%, ${s.accentB}22 0%, transparent 60%)` }} />

        {/* Season badge */}
        <div className="infl-season-badge">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.accent, display: 'inline-block', boxShadow: `0 0 8px ${s.accent}` }} />
          {s.tag.replace(/^[^ ]+ /, '')}
        </div>

        {/* Floating influencer cards */}
        <div className="infl-card top-left">
          <img className="infl-card-avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="" />
          <div>
            <div className="infl-card-name">Ananya Roy</div>
            <div className="infl-card-sub">6.8M · Dance</div>
          </div>
          <div className="infl-card-live" />
        </div>

        <div className="infl-card bot-left">
          <img className="infl-card-avatar" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" alt="" />
          <div>
            <div className="infl-card-name">Zara Khan</div>
            <div className="infl-card-sub">4.1M · Travel</div>
          </div>
          <div className="infl-card-live" style={{ background: '#FF3CAC', boxShadow: '0 0 6px #FF3CAC' }} />
        </div>

        <div className="infl-card bot-right">
          <img className="infl-card-avatar" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&q=80" alt="" />
          <div>
            <div className="infl-card-name">Priya Sharma</div>
            <div className="infl-card-sub">3.4M · Fashion</div>
          </div>
          <div className="infl-card-live" style={{ background: s.accent, boxShadow: `0 0 6px ${s.accent}` }} />
        </div>

        {/* Right frame */}
        <div className={`infl-frame ${transitioning ? 'out' : ''}`} style={{ opacity: transitioning ? 0 : 1 }}>
          <div className="infl-frame-inner">
            <img src={s.image} alt="" />
            <div className="infl-frame-corner tl" style={{ borderColor: s.accent }} />
            <div className="infl-frame-corner tr" style={{ borderColor: s.accent }} />
            <div className="infl-frame-corner bl" style={{ borderColor: s.accent }} />
            <div className="infl-frame-corner br" style={{ borderColor: s.accent }} />
            <div className="infl-frame-label" style={{ color: s.accent }}>Now Casting</div>
          </div>
        </div>

        {/* Main content */}
        <div className={`infl-content ${transitioning ? 'out' : 'in'}`}>
          <div className="infl-tag" style={{ background: `${s.accent}18`, borderColor: `${s.accent}44`, color: s.accent }}>
            <span className="infl-tag-dot" style={{ background: s.accent }} />
            {s.tag}
          </div>

          <h1 className="infl-title">{s.title}</h1>
          <div className="infl-subtitle" style={{ color: s.accent, WebkitTextStrokeColor: s.accent }}>
            {s.subtitle}
          </div>

          <div className="infl-rule" style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accentB})` }} />

          <p className="infl-desc" dangerouslySetInnerHTML={{
            __html: s.desc.replace('Only the most authentic', `<strong>Only the most authentic</strong>`)
          }} />

          <div className="infl-btns">
            <button className="infl-btn-primary" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accentB})`, color: s.accent === '#00FF94' ? '#050a18' : '#fff' }}>
              {s.cta} →
            </button>
            <button className="infl-btn-ghost">{s.ctaSecondary}</button>
          </div>

          <div className="infl-stats">
            {s.stat.map(([n, l]) => (
              <div className="infl-stat" key={l}>
                <div className="infl-stat-n" style={{ color: s.accent }}>{n}</div>
                <div className="infl-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button className="infl-arrow left" onClick={prev}>‹</button>
        <button className="infl-arrow right" onClick={next}>›</button>

        {/* Bottom thumbnail nav */}
        <div className="infl-nav">
          {SLIDES.map((sl, i) => (
            <button
              key={sl.id}
              className={`infl-nav-item ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
            >
              <img className="infl-nav-thumb" src={sl.image} alt="" />
              <div className="infl-nav-info">
                <span className="infl-nav-dot" style={{ background: sl.accent }} />
                {sl.title} {sl.subtitle}
              </div>
              {i === current && (
                <div
                  key={current}
                  className="infl-progress running"
                  style={{ background: sl.accent }}
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}