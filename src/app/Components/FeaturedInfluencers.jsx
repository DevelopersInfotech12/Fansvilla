"use client";
import { useEffect, useRef, useState } from "react";

const influencers = [
  {
    id: 1,
    name: "Aarav Singh",
    handle: "@aaravofficial",
    category: "Lifestyle",
    followers: "2.3M",
    rank: 1,
    status: "Champion",
    gradient: "from-orange-500 to-pink-600",
    avatar: "AS",
  },
  {
    id: 2,
    name: "Priya Sharma",
    handle: "@priyavibes",
    category: "Fashion",
    followers: "1.8M",
    rank: 2,
    status: "Finalist",
    gradient: "from-pink-500 to-purple-600",
    avatar: "PS",
  },
  {
    id: 3,
    name: "Karan Mehta",
    handle: "@karanmehta_",
    category: "Travel",
    followers: "3.1M",
    rank: 3,
    status: "Contestant",
    gradient: "from-purple-500 to-blue-600",
    avatar: "KM",
  },
  {
    id: 4,
    name: "Sneha Rao",
    handle: "@sneha.creates",
    category: "Beauty",
    followers: "920K",
    rank: 4,
    status: "Contestant",
    gradient: "from-rose-500 to-orange-500",
    avatar: "SR",
  },
  {
    id: 5,
    name: "Dev Kapoor",
    handle: "@devkapoor",
    category: "Fitness",
    followers: "1.5M",
    rank: 5,
    status: "Contestant",
    gradient: "from-amber-500 to-red-500",
    avatar: "DK",
  },
  {
    id: 6,
    name: "Isha Malhotra",
    handle: "@isha.m",
    category: "Food",
    followers: "780K",
    rank: 6,
    status: "Contestant",
    gradient: "from-teal-500 to-purple-600",
    avatar: "IM",
  },
];

const InfluencerCard = ({ inf, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative cursor-pointer transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:bg-white/8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
        {/* Rank badge */}
        <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <span className="text-xs font-black text-orange-400">#{inf.rank}</span>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            inf.status === "Champion" ? "bg-orange-500/30 text-orange-300 border border-orange-500/50" :
            inf.status === "Finalist" ? "bg-pink-500/30 text-pink-300 border border-pink-500/50" :
            "bg-white/10 text-gray-400 border border-white/20"
          }`}>
            {inf.status}
          </span>
        </div>

        {/* Avatar area */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${inf.gradient} opacity-80`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white text-3xl font-black shadow-2xl">
              {inf.avatar}
            </div>
          </div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="mb-1">
            <span className="text-xs text-orange-400 font-bold tracking-widest uppercase">{inf.category}</span>
          </div>
          <h3 className="text-white font-black text-lg leading-tight">{inf.name}</h3>
          <p className="text-gray-500 text-sm mt-0.5">{inf.handle}</p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-white font-black text-xl">{inf.followers}</div>
              <div className="text-gray-600 text-xs uppercase tracking-wider">Followers</div>
            </div>
            <button className={`px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${inf.gradient} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedInfluencers = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-orange-400 text-xs font-bold tracking-[0.4em] uppercase">Season 16</span>
          <h2 className="mt-3 text-5xl md:text-6xl font-black text-white">
            Meet The{" "}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Squad
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Top influencers battling it out for the ultimate crown. Who will you root for?
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((inf, i) => (
            <InfluencerCard key={inf.id} inf={inf} index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <button className="px-10 py-4 rounded-full border border-orange-500/50 text-orange-400 font-black text-sm tracking-widest uppercase hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-300">
            View All Influencers →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInfluencers;
