"use client";
import { useState } from "react";

const Season2Section = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      id="season2"
      className="relative py-8 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080003 0%, #050000 100%)" }}
    >
      {/* Dark dramatic BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,0,0,0.18) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Vertical accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute" style={{ top: 0, bottom: 0, left: "15%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.15), transparent)" }} />
        <div className="absolute" style={{ top: 0, bottom: 0, right: "15%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(139,0,0,0.2), transparent)" }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(139,0,0,0.2)", border: "1px solid rgba(201,168,76,0.25)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c9a84c" }} />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c9a84c" }}>Coming Soon</span>
        </div>

        {/* Title */}
        <h2
          className="font-black leading-none mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#ffffff" }}
        >
          Blindfold Villa
          <br />
          <span className="shimmer-text">Season 2</span>
        </h2>

        {/* Subtext */}
        <p className="text-lg mb-4" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}>
          Aankhein Band. Dil Khula. Trust The Feeling.
        </p>
        <p className="text-sm mb-12" style={{ color: "rgba(201,168,76,0.6)" }}>
          Be the first to know when Season 2 drops.
        </p>

        {/* Email signup */}
        {!submitted ? (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full text-sm outline-none placeholder:text-gray-600"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(201,168,76,0.25)",
                color: "#ffffff",
              }}
              onFocus={e => e.currentTarget.style.border = "1px solid rgba(201,168,76,0.6)"}
              onBlur={e => e.currentTarget.style.border = "1px solid rgba(201,168,76,0.25)"}
              onKeyDown={e => e.key === "Enter" && handleSubmit(e)}
            />
            <button
              onClick={handleSubmit}
              className="px-7 py-3.5 rounded-full text-sm font-bold tracking-wide text-black whitespace-nowrap hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)", boxShadow: "0 6px 24px rgba(201,168,76,0.35)" }}
            >
              Get Notified First
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.35)" }}>
            <span style={{ color: "#c9a84c" }}>✓</span>
            <span className="text-sm font-medium" style={{ color: "#e8c97a" }}>You're on the list! We'll notify you.</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Season2Section;
