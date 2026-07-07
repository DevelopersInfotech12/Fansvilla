"use client";
import { useState, useEffect } from "react";

const BannerImage = ({ image, mobileImage }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const src = isMobile && mobileImage ? mobileImage : image;
  if (!src) return null;

  return (
    <section style={{ position: "relative", background: "#050000", userSelect: "none", lineHeight: 0, marginTop: "50px" }}>

      {/* Gold top edge */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px", zIndex: 20,
        background: "linear-gradient(90deg, transparent 0%, #c9a84c 40%, #8b0000 60%, transparent 100%)",
      }} />

      {/* Image */}
      <img
        src={src}
        alt="Banner"
        draggable={false}
        style={{
          display: "block",
          width: "95%",
          height: "50%",
          margin: "0 auto",
        }}
      />

      {/* Bottom fade overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", zIndex: 5,
        background: "linear-gradient(to bottom, transparent, rgba(5,0,0,0.8))",
        pointerEvents: "none",
      }} />
    </section>
  );
};

export default BannerImage;