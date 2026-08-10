"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "../Data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-500"
      style={{
        top: "36px",
        background: scrolled ? "rgba(10,5,5,0.97)" : "rgba(10,5,5,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.25)" : "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/blinfoldlogochat.png"
            alt="Blindfold Villa"
            width={220}
            height={95}
            priority
            className="h-20 md:h-24 -my-3 md:-my-4 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center py-4 gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 group"
              style={{ color: "rgba(255, 255, 255, 0.88)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "linear-gradient(90deg, #c9a84c, #8b0000)" }} />
            </Link>
          ))}
        </div>

        {/* Watch Now CTA */}
        <div className="hidden md:flex items-center py-4 gap-3">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-bold tracking-widest uppercase text-black rounded-full hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)", boxShadow: "0 4px 20px rgba(201,168,76,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 30px rgba(201,168,76,0.65)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.4)")}
          >
            ▶ Watch Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px]"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <span className={`block w-[18px] h-[2px] transition-all duration-300 origin-center bg-white ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-[18px] h-[2px] transition-all duration-300 bg-white ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-[18px] h-[2px] transition-all duration-300 origin-center bg-white ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-4"
          style={{ background: "rgba(10,5,5,0.98)", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-medium tracking-widest uppercase text-sm py-1 transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {link.label}
            </Link>
          ))}


          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 py-3 text-sm font-bold text-center text-black rounded-full"
            style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)" }}
          >
            ▶ Watch Now
          </a>
        </div>
      </div >
    </nav >
  );
};

export default Navbar;