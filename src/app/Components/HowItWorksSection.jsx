"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Apply",
    desc: "Submit your profile. We review your content, engagement, and vibe.",
    icon: "📝",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    step: "02",
    title: "Enter The Villa",
    desc: "Selected influencers get exclusive access to the SplitVilla ecosystem.",
    icon: "🏠",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    step: "03",
    title: "Compete",
    desc: "Take on weekly challenges. Build alliances. Grow your audience.",
    icon: "⚔️",
    gradient: "from-purple-500 to-blue-600",
  },
  {
    step: "04",
    title: "Win",
    desc: "Top the leaderboard. Claim the crown and ₹50 Lakh grand prize.",
    icon: "👑",
    gradient: "from-yellow-500 to-orange-500",
  },
];

const HowItWorksSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #000 0%, #050010 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-purple-400 text-xs font-bold tracking-[0.4em] uppercase">The Journey</span>
          <h2 className="mt-3 text-5xl md:text-6xl font-black text-white">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-yellow-500 opacity-30" />

          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Icon circle */}
              <div className="relative inline-flex mb-6">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center text-4xl shadow-2xl`}
                  style={{ boxShadow: i === 0 ? "0 0 40px rgba(249,115,22,0.4)" : i === 3 ? "0 0 40px rgba(234,179,8,0.4)" : "" }}
                >
                  {s.icon}
                </div>
                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                  <span className="text-xs font-black text-white">{s.step}</span>
                </div>
              </div>

              <h3 className="text-white font-black text-xl mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button className="px-12 py-5 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 rounded-full text-white font-black text-base tracking-widest uppercase shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300">
            Start Your Journey →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
