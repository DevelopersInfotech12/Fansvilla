"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Influencers", href: "/influencers" },
    { label: "Challenges", href: "/challenges" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl shadow-orange-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/40 group-hover:scale-110 transition-transform duration-300">
              S
            </div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
          </div>
          <span className="font-black text-xl tracking-widest uppercase">
            <span className="text-white">Split</span>
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Villa
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-300 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 text-sm font-bold tracking-widest uppercase text-orange-400 border border-orange-400/50 rounded-full hover:bg-orange-400/10 transition-all duration-300">
            Login
          </button>
          <button className="px-5 py-2 text-sm font-bold tracking-widest uppercase text-white bg-gradient-to-r from-orange-500 to-pink-600 rounded-full hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300">
            Join Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-orange-400 font-semibold tracking-widest uppercase text-sm transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 py-2 text-sm font-bold text-orange-400 border border-orange-400/50 rounded-full">Login</button>
            <button className="flex-1 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 rounded-full">Join Now</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
