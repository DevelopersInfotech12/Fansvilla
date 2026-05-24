"use client";

import Navbar from '../Components/Navbar';
import HeroCarousel from '../Components/HeroCarousel';
import ContentSections from '../Components/ContentSections';
import Footer from '../Components/Footer';

export default function HomeScreen() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --pink: #FF3CAC; --purple: #784BA0; --blue: #2B86C5; --gold: #F5A623; --dark: #1a0a2e; }
        body { background: #1a0a2e; font-family: 'Nunito', sans-serif; }
        @keyframes float1 { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-30px) } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(20px) } }
        @keyframes shimmer { 0% { background-position: -200% center } 100% { background-position: 200% center } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1 } 100% { transform: scale(2.5); opacity: 0 } }
        @keyframes fadeSlide { 0% { opacity: 0; transform: translateY(20px) } 100% { opacity: 1; transform: translateY(0) } }
        @keyframes spin-slow { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        @keyframes badge-pop { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }
        @keyframes ticker { 0% { transform: translateX(100vw) } 100% { transform: translateX(-100%) } }
        .slide-content { animation: fadeSlide 0.5s ease forwards; }
        .shimmer-text { background: linear-gradient(90deg,#FF3CAC,#784BA0,#F5A623,#FF3CAC); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
        .glass { background: rgba(255,255,255,0.06); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12); }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 50px rgba(255,60,172,0.25); }
        .btn-pink { background: linear-gradient(135deg,#FF3CAC,#784BA0); color: #fff; border: none; border-radius: 50px; padding: 12px 32px; font-family: 'Nunito',sans-serif; font-weight: 900; font-size: 15px; cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.5px; text-transform: uppercase; }
        .btn-pink:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255,60,172,0.5); }
        .btn-outline { background: transparent; color: #FF3CAC; border: 2px solid #FF3CAC; border-radius: 50px; padding: 10px 28px; font-family: 'Nunito',sans-serif; font-weight: 800; font-size: 14px; cursor: pointer; transition: all 0.2s ease; text-transform: uppercase; }
        .btn-outline:hover { background: rgba(255,60,172,0.15); transform: scale(1.04); }
        .dot { width: 10px; height: 10px; border-radius: 50%; cursor: pointer; transition: all 0.3s ease; }
        .dot.active { width: 30px; border-radius: 5px; }
        .section-title { font-family: 'Bebas Neue',cursive; font-size: clamp(28px,4vw,42px); letter-spacing: 2px; background: linear-gradient(135deg,#fff 0%,#FF3CAC 60%,#F5A623 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .game-icon-wrap { width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; background: rgba(255,255,255,0.08); margin-bottom: 10px; transition: transform 0.3s ease; }
        .game-card:hover .game-icon-wrap { transform: scale(1.15) rotate(8deg); }
        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker { display: inline-block; animation: ticker 25s linear infinite; }
        .nav-dropdown { position: absolute; top: 100%; left: 0; background: rgba(26,10,46,0.98); backdrop-filter: blur(20px); border: 1px solid rgba(255,60,172,0.2); border-radius: 12px; padding: 8px 0; min-width: 180px; z-index: 100; animation: fadeSlide 0.2s ease; }
        .nav-dropdown a { display: block; padding: 10px 20px; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 600; transition: all 0.15s; cursor: pointer; text-decoration: none; }
        .nav-dropdown a:hover { color: #FF3CAC; background: rgba(255,60,172,0.1); padding-left: 26px; }
        .influencer-card { background: linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,60,172,0.08)); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; transition: all 0.3s ease; }
        .influencer-card:hover { border-color: rgba(255,60,172,0.5); transform: translateY(-8px); }
        .badge { display: inline-block; padding: 4px 14px; border-radius: 50px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; animation: badge-pop 2s ease infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a0a2e; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#FF3CAC,#784BA0); border-radius: 3px; }
      `}</style>

      <Navbar />
      <HeroCarousel />
      <ContentSections />
      <Footer />
    </>
  );
}