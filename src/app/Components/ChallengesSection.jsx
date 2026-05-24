"use client";
import { useEffect, useRef, useState } from "react";

const challenges = [
  {
    id: 1,
    title: "Reel Royale",
    description: "Create the most viral reel in 24 hours. Highest engagement wins immunity.",
    prize: "₹5,00,000",
    deadline: "2 Days",
    participants: 48,
    category: "Content",
    hot: true,
    icon: "🎬",
    gradient: "from-orange-600 to-rose-600",
  },
  {
    id: 2,
    title: "Brand Alliance",
    description: "Negotiate a brand deal live on stream. Best ROI presentation takes the crown.",
    prize: "₹3,00,000",
    deadline: "5 Days",
    participants: 32,
    category: "Business",
    hot: false,
    icon: "🤝",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: 3,
    title: "Villa Takeover",
    description: "Run the official SplitVilla account for 48 hours. Grow followers to win.",
    prize: "₹2,50,000",
    deadline: "1 Week",
    participants: 60,
    category: "Social",
    hot: true,
    icon: "🏆",
    gradient: "from-pink-600 to-purple-600",
  },
];

const ChallengeCard = ({ ch, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {ch.hot && (
        <div className="absolute -top-3 left-6 z-20 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs font-black text-white tracking-wider shadow-lg shadow-orange-500/40">
          🔥 HOT
        </div>
      )}

      <div className="relative bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 group-hover:scale-[1.02]">
        {/* Top gradient bar */}
        <div className={`h-1.5 bg-gradient-to-r ${ch.gradient}`} />

        {/* Content */}
        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div className="text-4xl">{ch.icon}</div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${ch.gradient} bg-opacity-20 text-white/80 border border-white/20`}>
              {ch.category}
            </span>
          </div>

          <h3 className="text-white font-black text-2xl mb-2">{ch.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{ch.description}</p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
            <div className="text-center">
              <div className={`text-lg font-black bg-gradient-to-r ${ch.gradient} bg-clip-text text-transparent`}>{ch.prize}</div>
              <div className="text-xs text-gray-600 mt-0.5">Prize</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-lg font-black text-white">{ch.deadline}</div>
              <div className="text-xs text-gray-600 mt-0.5">Left</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-white">{ch.participants}</div>
              <div className="text-xs text-gray-600 mt-0.5">Joined</div>
            </div>
          </div>

          <button className={`w-full py-3 rounded-xl text-white font-black text-sm tracking-widest uppercase bg-gradient-to-r ${ch.gradient} hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300 active:scale-95`}>
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

const ChallengesSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #000 0%, #0a0005 100%)" }}>
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-pink-400 text-xs font-bold tracking-[0.4em] uppercase">Active Now</span>
          <h2 className="mt-3 text-5xl md:text-6xl font-black text-white">
            Live{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Challenges
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Prove your influence. Win real prizes. Make it to the Villa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((ch, i) => (
            <ChallengeCard key={ch.id} ch={ch} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
