"use client";
import { useEffect } from "react";

export default function GoogleCallback() {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const token = hash.get("access_token");
    if (token && window.opener) {
      window.opener.postMessage({ token }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div style={{ background: "#050000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#c9a84c" }}>Signing you in...</p>
    </div>
  );
}