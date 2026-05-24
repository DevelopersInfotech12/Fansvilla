"use client";

import { NAV_LINKS } from '@/app/Data';
import { useState } from 'react';
// import { NAV_LINKS } from './data';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(null);

  return (
    <>
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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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

        <button className="btn-pink" style={{ padding: '9px 24px', fontSize: 13 }}>Login</button>
      </nav>

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