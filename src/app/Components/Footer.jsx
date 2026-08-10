"use client";
import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "../Data";

const IGIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const YTIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.858L1.172 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ICON_MAP = { IG: IGIcon, YT: YTIcon, X: XIcon };

const Footer = () => (
  <footer className="py-12 px-4 relative overflow-hidden" style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "#050000" }}>
    <div className="max-w-6xl mx-auto relative z-10">

      {/* Social row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">

        {/* Social icons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {SOCIAL_LINKS.map((s, i) => {
            const IconComp = ICON_MAP[s.icon];
            return (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${s.label} ${s.handle}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.45)"; e.currentTarget.style.color = "#c9a84c"; e.currentTarget.style.background = "rgba(201,168,76,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                {IconComp && <IconComp />}
                <span className="text-xs font-medium">{s.handle}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="pt-6 text-center text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.25)" }}>
        © 2026 BlindVilla. All rights reserved. |{" "}
        <Link
          href="http://developersinfotech.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
        >
          Developed by Developers Infotech Pvt Ltd
        </Link>
      </div>
    </div>
  </footer >
);

export default Footer;