"use client";
import Link from "next/link";

const Footer = () => {
  const links = ["About", "Privacy", "Terms", "Careers", "Press", "Contact"];
  const socials = ["📸", "🎬", "🐦", "💬"];

  return (
    <footer
      className="py-12 px-4 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
    >
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./footer.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6) saturate(1.4)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #16111a 0%, rgba(22,17,26,0.75) 40%, rgba(22,17,26,0.9) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "linear-gradient(135deg, #c9a84c, #ef3a5a)" }}
            >
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em", fontSize: "1.15rem" }}>
              <span style={{ color: "#ffffff" }}>Split</span>
              <span className="shimmer-text">Villa</span>
            </span>
          </Link>

         <div className="flex flex-wrap justify-center gap-6">
  {links.map((item) => (
    <a
      key={item}
      href="#"
      className="text-xs tracking-widest uppercase transition-colors duration-200"
      style={{ color: "rgba(255,255,255,0.45)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "#e8c97a")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color =
          "rgba(255,255,255,0.45)")
      }
    >
      {item}
    </a>
  ))}
</div>

          <div className="flex items-center gap-3">
            {socials.map((icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.4)"; e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(201,168,76,0.15)"; e.currentTarget.style.background = "var(--border-faint)"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-8 text-center text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
        >
          © 2026 Splitvilla Influencer Network. All rights reserved. A Reality Reimagined Production.
        </div>
      </div>
    </footer>
  );
};

export default Footer;