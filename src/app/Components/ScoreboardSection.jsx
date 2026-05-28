"use client";
import { useState } from "react";

const SCORES = [
    { rank: 1, name: "Aarav Sharma", gender: "male", task1: 95, task2: 88, task3: 72, task4: 91, connection: 94, crowd: 89 },
    { rank: 2, name: "Priya Mehta", gender: "female", task1: 90, task2: 82, task3: 85, task4: 78, connection: 96, crowd: 91 },
    { rank: 3, name: "Rohan Kapoor", gender: "male", task1: 78, task2: 95, task3: 80, task4: 88, connection: 82, crowd: 85 },
    { rank: 4, name: "Sneha Patel", gender: "female", task1: 85, task2: 76, task3: 92, task4: 70, connection: 88, crowd: 79 },
    { rank: 5, name: "Karan Verma", gender: "male", task1: 70, task2: 88, task3: 65, task4: 95, connection: 75, crowd: 83 },
    { rank: 6, name: "Ishika Nair", gender: "female", task1: 82, task2: 65, task3: 78, task4: 72, connection: 80, crowd: 76 },
    { rank: 7, name: "Dev Malhotra", gender: "male", task1: 60, task2: 72, task3: 70, task4: 65, connection: 70, crowd: 68 },
    { rank: 8, name: "Riya Joshi", gender: "female", task1: 65, task2: 60, task3: 68, task4: 62, connection: 72, crowd: 64 },
];

const COLS = [
    { key: "task1", label: "Touch ID" },
    { key: "task2", label: "Baraf Paani" },
    { key: "task3", label: "Got Balls" },
    { key: "task4", label: "Get Wet" },
    { key: "connection", label: "Connection" },
    { key: "crowd", label: "Crowd ❤️" },
];

const MEDAL = ["🥇", "🥈", "🥉"];

const total = (row) => COLS.reduce((s, c) => s + row[c.key], 0);

const ScoreBar = ({ val }) => (
    <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                    width: `${val}%`,
                    background: val >= 85
                        ? "linear-gradient(90deg,#c9a84c,#e8c97a)"
                        : val >= 70
                            ? "linear-gradient(90deg,#cc0022,#c0392b)"
                            : "rgba(255,255,255,0.25)",
                }}
            />
        </div>
        <span className="text-xs font-bold w-7 text-right" style={{ color: val >= 85 ? "#c9a84c" : "rgba(255,255,255,0.55)" }}>
            {val}
        </span>
    </div>
);

const ScoreboardSection = () => {
    const [sortKey, setSortKey] = useState("total");
    const [filter, setFilter] = useState("all");

    const sorted = [...SCORES]
        .filter(r => filter === "all" || r.gender === filter)
        .sort((a, b) => sortKey === "total" ? total(b) - total(a) : b[sortKey] - a[sortKey])
        .map((r, i) => ({ ...r, displayRank: i + 1 }));

    return (
        <section
            id="scoreboard"
            className="min-h-screen py-28 px-4 relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #050000 0%, #050000 100%)" }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(139,0,0,0.12) 0%, transparent 65%)" }}
            />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-px w-8" style={{ background: "linear-gradient(90deg,transparent,#c9a84c)" }} />
                        <span className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: "#c9a84c" }}>Season 1</span>
                        <div className="h-px w-8" style={{ background: "linear-gradient(90deg,#c9a84c,transparent)" }} />
                    </div>
                    <h1
                        className="font-black leading-tight mb-3"
                        style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff" }}
                    >
                        Official <span className="shimmer-text italic">Scoreboard</span>
                    </h1>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>
                        Rankings based on tasks, connection score &amp; crowd votes
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex gap-2">
                        {[["all", "All 8"], ["male", "Boys 👦"], ["female", "Girls 👧"]].map(([val, label]) => (
                            <button
                                key={val}
                                onClick={() => setFilter(val)}
                                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                                style={filter === val
                                    ? { background: "linear-gradient(135deg,#c9a84c,#e8c97a)", color: "#000" }
                                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "rgba(255,255,255,0.5)" }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Sort by:</span>
                        <select
                            value={sortKey}
                            onChange={e => setSortKey(e.target.value)}
                            className="px-3 py-2 rounded-full text-xs font-medium outline-none cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c" }}
                        >
                            <option value="total">Total Score</option>
                            {COLS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Top 3 Podium */}
                <div className="hidden sm:grid grid-cols-3 gap-4 mb-8">
                    {sorted.slice(0, 3).map((r, i) => (
                        <div
                            key={r.name}
                            className="rounded-2xl p-6 text-center relative overflow-hidden"
                            style={{
                                border: i === 0 ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.08)",
                                background: i === 0 ? "rgba(201,168,76,0.07)" : "rgba(255,255,255,0.02)",
                                order: i === 0 ? 1 : i === 1 ? 0 : 2,
                            }}
                        >
                            {i === 0 && (
                                <div className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: "linear-gradient(90deg,transparent,#c9a84c,transparent)" }} />
                            )}
                            <div className="text-3xl mb-2">{MEDAL[i]}</div>
                            <div className="font-bold text-white text-sm mb-1">{r.name}</div>
                            <div className="text-xs mb-3" style={{ color: r.gender === "male" ? "#60a5fa" : "#f9a8d4" }}>
                                {r.gender === "male" ? "♂ Male" : "♀ Female"}
                            </div>
                            <div className="font-black text-2xl shimmer-text" style={{ fontFamily: "'Playfair Display',serif" }}>
                                {total(r)}
                            </div>
                            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>total pts</div>
                        </div>
                    ))}
                </div>

                {/* Full Table */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.15)" }}>

                    {/* Table Header */}
                    <div
                        className="hidden md:grid px-5 py-3 text-xs font-semibold tracking-widest uppercase"
                        style={{
                            gridTemplateColumns: "48px 1fr repeat(6,1fr) 72px",
                            background: "rgba(201,168,76,0.06)",
                            color: "rgba(201,168,76,0.7)",
                            borderBottom: "1px solid rgba(201,168,76,0.12)",
                        }}
                    >
                        <span>#</span>
                        <span>Contestant</span>
                        {COLS.map(c => <span key={c.key}>{c.label}</span>)}
                        <span className="text-right">Total</span>
                    </div>

                    {/* Rows */}
                    {sorted.map((r, i) => (
                        <div
                            key={r.name}
                            className="px-5 py-4 flex flex-col md:grid gap-3 md:gap-0 transition-colors duration-200"
                            style={{
                                gridTemplateColumns: "48px 1fr repeat(6,1fr) 72px",
                                borderBottom: i < sorted.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                background: r.displayRank === 1 ? "rgba(201,168,76,0.04)" : "transparent",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                            onMouseLeave={e => e.currentTarget.style.background = r.displayRank === 1 ? "rgba(201,168,76,0.04)" : "transparent"}
                        >
                            {/* Rank */}
                            <div className="flex items-center">
                                <span className="font-black text-sm" style={{ color: r.displayRank <= 3 ? "#c9a84c" : "rgba(255,255,255,0.3)" }}>
                                    {r.displayRank <= 3 ? MEDAL[r.displayRank - 1] : `#${r.displayRank}`}
                                </span>
                            </div>

                            {/* Name */}
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                                    style={{
                                        background: r.gender === "male" ? "rgba(59,130,246,0.2)" : "rgba(249,168,212,0.2)",
                                        color: r.gender === "male" ? "#93c5fd" : "#f9a8d4",
                                    }}
                                >
                                    {r.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm text-white">{r.name}</div>
                                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                                        {r.gender === "male" ? "♂ Male" : "♀ Female"}
                                    </div>
                                </div>
                            </div>

                            {/* Score bars */}
                            {COLS.map(c => (
                                <div key={c.key} className="flex flex-col justify-center gap-0.5">
                                    <span className="text-xs md:hidden" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</span>
                                    <ScoreBar val={r[c.key]} />
                                </div>
                            ))}

                            {/* Total */}
                            <div className="flex items-center justify-end">
                                <span className="font-black text-base shimmer-text" style={{ fontFamily: "'Playfair Display',serif" }}>
                                    {total(r)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
                    * Placeholder scores · Final scores will be updated after episodes air
                </p>
            </div>
        </section>
    );
};

export default ScoreboardSection;