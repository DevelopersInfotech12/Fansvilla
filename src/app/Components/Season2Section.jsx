"use client";
import { useState, useEffect } from "react";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxGNadWtyIPmqfUp1kg4s_I8DCUKFvBbNSh9ZVx5wRVTvOPnDgwNNaXCxrkrKeT6oo9/exec";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// ─── Input Field ──────────────────────────────────────────────────────────────
const InputField = ({ label, type = "text", value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold tracking-[0.15em] uppercase"
      style={{ color: "rgba(201,168,76,0.8)" }}>
      {label} {required && <span style={{ color: "#8b0000" }}>*</span>}
    </label>
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-gray-600 transition-all duration-200"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", color: "#ffffff" }}
      onFocus={e => e.currentTarget.style.border = "1px solid rgba(201,168,76,0.6)"}
      onBlur={e => e.currentTarget.style.border = "1px solid rgba(201,168,76,0.2)"}
    />
  </div>
);

// ─── Google SVG ───────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.7-2.9-11.9-7.1l-6.6 5.1C9.5 39.6 16.3 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.5-4.5 5.9l6.2 5.2C40.8 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z" />
  </svg>
);

// ─── Auth Modal ───────────────────────────────────────────────────────────────
const AuthModal = ({ onClose, onAuthSuccess }) => {
  const [tab, setTab]         = useState("login"); // "login" | "signup"
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = tab === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const body = tab === "signup"
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res  = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!data.success) { setError(data.error); return; }

      localStorage.setItem("bv_token", data.token);
      localStorage.setItem("bv_user", JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: window.location.origin,
      response_type: "token",
      scope: "email profile",
      prompt: "select_account",
    });

    const popup = window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
      "google-login",
      "width=500,height=600,scrollbars=yes"
    );

    const timer = setInterval(async () => {
      try {
        const url = popup.location.href;
        if (url.includes("access_token")) {
          clearInterval(timer);
          popup.close();
          const hash  = new URLSearchParams(url.split("#")[1]);
          const token = hash.get("access_token");

          // Get Google user info
          const gRes  = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const gUser = await gRes.json();

          // Save to MongoDB
          const res  = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: gUser.name, email: gUser.email }),
          });
          const data = await res.json();

          if (!data.success) { setError(data.error); return; }

          localStorage.setItem("bv_token", data.token);
          localStorage.setItem("bv_user", JSON.stringify(data.user));
          onAuthSuccess(data.user);
        }
      } catch (e) {
        // cross-origin — still loading
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d0507 0%, #080003 100%)", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,0,0,0.3)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
          ✕
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">👁️</div>
            <h3 className="font-black text-2xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {tab === "login" ? "Welcome Back" : "Join the List"}
            </h3>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {tab === "login" ? "Login to get notified for Season 2" : "Sign up to be first for Season 2"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl mb-6 p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}>
            {["login", "signup"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); }}
                className="flex-1 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200"
                style={tab === t
                  ? { background: "linear-gradient(135deg,#c9a84c,#e8c97a)", color: "#000" }
                  : { color: "rgba(255,255,255,0.4)" }}>
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Google */}
          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold mb-5 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#ffffff" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"; }}>
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === "signup" && (
              <InputField label="Full Name" value={form.name} onChange={set("name")} placeholder="Your name" required />
            )}
            <InputField label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
            <InputField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" required />

            {error && (
              <p className="text-xs text-center py-2 px-4 rounded-lg"
                style={{ color: "#f87171", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-black mt-1 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#c9a84c,#e8c97a)", boxShadow: "0 6px 24px rgba(201,168,76,0.35)" }}>
              {loading ? "Please wait..." : tab === "login" ? "Login →" : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
            No spam. Only Season 2 updates.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Lead Form Modal ──────────────────────────────────────────────────────────
const LeadModal = ({ onClose, user }) => {
  const [form, setForm]       = useState({ name: user?.name || "", phone: "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("Please fill all fields."); return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email }),
      });
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d0507 0%, #080003 100%)", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,0,0,0.3)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
          ✕
        </button>

        <div className="p-8">
          {!success ? (
            <>
              <div className="text-center mb-7">
                <div className="text-3xl mb-3">🔔</div>
                <h3 className="font-black text-2xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  One Last Step
                </h3>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Confirm your details to get notified
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField label="Full Name" value={form.name} onChange={set("name")} placeholder="Your name" required />
                <InputField label="Phone Number" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" required />
                <InputField label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />

                {error && (
                  <p className="text-xs text-center py-2 px-4 rounded-lg"
                    style={{ color: "#f87171", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-black mt-1 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,#c9a84c,#e8c97a)", boxShadow: "0 6px 24px rgba(201,168,76,0.35)" }}>
                  {loading ? "Submitting..." : "🔔 Notify Me for Season 2"}
                </button>
              </form>

              <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
                No spam. Only Season 2 updates.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-black text-2xl text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                You're <span className="shimmer-text">In!</span>
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                We'll notify you the moment Season 2 drops.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <span style={{ color: "#c9a84c" }}>✓</span>
                <span className="text-sm font-medium" style={{ color: "#e8c97a" }}>Registered successfully</span>
              </div>
              <br />
              <button onClick={onClose} className="text-xs underline" style={{ color: "rgba(255,255,255,0.3)" }}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const Season2Section = () => {
  const [modal, setModal] = useState(null); // null | "auth" | "lead"
  const [user, setUser]   = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setModal("lead"); // auth done → open lead form
  };

  return (
    <>
      {modal === "auth" && <AuthModal onClose={() => setModal(null)} onAuthSuccess={handleAuthSuccess} />}
      {modal === "lead" && <LeadModal onClose={() => setModal(null)} user={user} />}

      <section id="season2" className="relative py-8 px-4 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #080003 0%, #050000 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,0,0,0.18) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute" style={{ top: 0, bottom: 0, left: "15%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.15), transparent)" }} />
          <div className="absolute" style={{ top: 0, bottom: 0, right: "15%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(139,0,0,0.2), transparent)" }} />
        </div>

        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(139,0,0,0.2)", border: "1px solid rgba(201,168,76,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c9a84c" }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#c9a84c" }}>Coming Soon</span>
          </div>

          <h2 className="font-black leading-none mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#ffffff" }}>
            Blindfold Villa<br />
            <span className="shimmer-text">Season 2</span>
          </h2>

          <p className="text-lg mb-4" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
            Aankhein Band. Dil Khula. Trust The Feeling.
          </p>
          <p className="text-sm mb-12" style={{ color: "rgba(201,168,76,0.6)" }}>
            Be the first to know when Season 2 drops.
          </p>

          <button onClick={() => setModal("auth")}
            className="px-10 py-4 rounded-full text-sm font-bold tracking-[0.15em] uppercase text-black hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)", boxShadow: "0 8px 32px rgba(201,168,76,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 48px rgba(201,168,76,0.65)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.4)"}>
            🔔 Get Notified First
          </button>
        </div>
      </section>
    </>
  );
};

export default Season2Section;