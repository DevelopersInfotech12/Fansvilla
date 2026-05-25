"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "../Data";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const isDark = theme === "dark";
 const iconColor = isDark ? "#ffffff" : scrolled ? "#1a0a1e" : "#ffffff";
const iconBg = isDark ? "rgba(255,255,255,0.18)" : scrolled ? "rgba(20,10,30,0.1)" : "rgba(255,255,255,0.18)";
const iconBorder = isDark ? "1.5px solid rgba(255,255,255,0.35)" : scrolled ? "1.5px solid rgba(20,10,30,0.25)" : "1.5px solid rgba(255,255,255,0.35)";
  const linkColor = isDark
    ? "rgba(255,255,255,0.7)"
    : scrolled
      ? "rgba(20,10,30,0.7)"
      : "rgba(255,255,255,0.7)";

  return (
    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-500"
      style={{
        top: "36px",
        background: scrolled
          ? isDark ? "rgba(22,17,26,0.96)" : "rgba(255,255,255,0.97)"
          : "rgba(22,17,26,0.55)",  // always dark when not scrolled
        backdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? isDark ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(160,120,40,0.2)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #c9a84c, #ef3a5a)" }}
            >
              BV
            </div>
            <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #c9a84c, #ef3a5a)" }} />
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em", fontSize: "1.35rem" }}>
            <span style={{ color: isDark ? "#facc15" : "#92400e" }}>Blindfold</span>
            <span className="shimmer-text">Villa</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-300 group"
              style={{ color: linkColor }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#c9a84c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = linkColor)
              }
            >
              {link.label}

              <span
                className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #c9a84c, #ef3a5a)",
                }}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: iconBg, border: iconBorder, color: iconColor }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.25)"; e.currentTarget.style.color = "#c9a84c"; }}
            onMouseLeave={e => { e.currentTarget.style.background = iconBg; e.currentTarget.style.color = iconColor; }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="px-5 py-2 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300"
            style={{ color: isDark ? "#e8c97a" : "#a07828", border: `1px solid ${isDark ? "rgba(201,168,76,0.4)" : "rgba(160,120,40,0.4)"}` }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Sign In
          </button>

          <button
            className="px-5 py-2 text-xs font-bold tracking-widest uppercase text-white rounded-full hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #b91c3a, #c9a84c)", boxShadow: "0 4px 20px rgba(185,28,58,0.35)" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 30px rgba(185,28,58,0.6)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(185,28,58,0.35)"}
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: iconBg, border: iconBorder, color: iconColor }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px]"
            style={{ background: iconBg, border: iconBorder }}
          >
            <span className={`block w-[18px] h-[2px] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              style={{ background: iconColor }} />
            <span className={`block w-[18px] h-[2px] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              style={{ background: iconColor }} />
            <span className={`block w-[18px] h-[2px] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              style={{ background: iconColor }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-4"
          style={{
            background: isDark ? "rgba(22,17,26,0.97)" : "rgba(255,255,255,0.98)",
            borderTop: `1px solid ${isDark ? "rgba(201,168,76,0.15)" : "rgba(160,120,40,0.15)"}`,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-medium tracking-widest uppercase text-sm py-1 transition-colors duration-300"
              style={{ color: linkColor }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--border-faint)" }}>
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-full"
              style={{ color: isDark ? "#e8c97a" : "#a07828", border: `1px solid ${isDark ? "rgba(201,168,76,0.4)" : "rgba(160,120,40,0.4)"}` }}>
              Sign In
            </button>
            <button className="flex-1 py-2.5 text-sm font-bold text-white rounded-full"
              style={{ background: "linear-gradient(135deg, #b91c3a, #c9a84c)" }}>
              Apply Now
            </button>
          </div>
        </div>
      </div >
    </nav >
  );
};

export default Navbar;