"use client";

import { NAV_LINKS } from '@/app/Data';
import { useState } from 'react';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        .desktop-nav { display: flex; gap: 8px; align-items: center; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.85); font-size: 22px; padding: 8px; }
        .mobile-menu { display: none; flex-direction: column; background: rgba(18,18,30,0.97); backdrop-filter: blur(12px); padding: 12px 5%; border-top: 1px solid rgba(255,255,255,0.08); }
        .mobile-menu.open { display: flex; }
        .mobile-menu button { background: none; border: none; color: rgba(255,255,255,0.85); font-family: Nunito,sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; padding: 12px 0; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mobile-menu .mobile-sub a { display: block; padding: 8px 16px; color: rgba(255,255,255,0.6); font-family: Nunito,sans-serif; font-size: 14px; text-decoration: none; }
        .mobile-login { margin-top: 12px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-login { display: none !important; }
          .hamburger { display: block; }
        }
      `}</style>

      <nav
        className="glass"
        style={{ position: 'sticky', top: 0, zIndex: 200, padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#FF3CAC,#784BA0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
          <span style={{ fontFamily: 'Bebas Neue,cursive', fontSize: 24, background: 'linear-gradient(90deg,#FF3CAC,#F5A623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 1 }}>FANSVILLA</span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav">
          {NAV_LINKS.map(n => (
            <div
              key={n.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => n.sub && setOpenNav(n.label)}
              onMouseLeave={() => setOpenNav(null)}
            >
              <button style={{ background: 'none', border: 'none', color: openNav === n.label ? '#FF3CAC' : 'rgba(255,255,255,0.85)', fontFamily: 'Nunito,sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: '8px 14px', borderRadius: 8, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 5 }}>
                {n.label} {n.sub && <span style={{ fontSize: 10 }}>▾</span>}
              </button>
              {n.sub && openNav === n.label && (
                <div className="nav-dropdown">
                  {n.sub.map(s => <a key={s}>{s}</a>)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn-pink desktop-login" style={{ padding: '9px 24px', fontSize: 13 }}>Login</button>
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(n => (
          <div key={n.label}>
            <button onClick={() => setOpenNav(openNav === n.label ? null : n.label)}>
              {n.label} {n.sub && <span style={{ fontSize: 10 }}>{openNav === n.label ? '▴' : '▾'}</span>}
            </button>
            {n.sub && openNav === n.label && (
              <div className="mobile-sub">
                {n.sub.map(s => <a key={s}>{s}</a>)}
              </div>
            )}
          </div>
        ))}
        <button className="btn-pink mobile-login" style={{ padding: '10px 24px', fontSize: 13, width: '100%' }}>Login</button>
      </div>

      {/* Ticker */}
      <div style={{ background: 'linear-gradient(90deg,#FF3CAC,#784BA0,#2B86C5)', padding: '6px 0', overflow: 'hidden' }}>
        <div className="ticker-wrap">
          <span className="ticker" style={{ color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>
            🏆 TOP 100 WIN ₹7000 NEWME VOUCHERS &nbsp;&nbsp; 🌟 SEASON FINALE THIS WEEK! &nbsp;&nbsp; 💘 NEW IDEAL MATCH RESULTS OUT &nbsp;&nbsp; 🎮 PLAY NOW & CLIMB THE LEADERBOARD &nbsp;&nbsp; 🔥 VIP MEET & GREET FOR TOP 10 &nbsp;&nbsp;
          </span>
        </div>
      </div>
    </>
  );
}