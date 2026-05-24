"use client";

const tickers = [
  "🏆 Season 16 Applications Open",
  "🔥 Aarav Singh leads with 98,420 pts",
  "⚡ New challenge: Reel Royale — 2 days left",
  "💰 ₹50 Lakh Grand Prize",
  "🌟 500+ Influencers Competing",
  "🎬 Priya Sharma goes viral",
];

const testimonials = [
  {
    quote: "SplitVilla took my account from 50K to 2M followers in one season. This is real.",
    name: "Aarav Singh",
    role: "Season 15 Champion",
    gradient: "from-orange-500 to-pink-600",
  },
  {
    quote: "The challenges pushed me to create content I never thought I could. Life-changing.",
    name: "Priya Sharma",
    role: "Season 15 Finalist",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    quote: "Got brand deals worth ₹80L after appearing here. Nothing else comes close.",
    name: "Karan Mehta",
    role: "Season 14 Winner",
    gradient: "from-purple-500 to-blue-600",
  },
];

const MarqueeSection = () => (
  <div className="py-4 bg-gradient-to-r from-orange-600 to-pink-600 overflow-hidden relative">
    <div className="flex gap-16 animate-marquee whitespace-nowrap">
      {[...tickers, ...tickers].map((t, i) => (
        <span key={i} className="text-white font-bold text-sm tracking-wider shrink-0">
          {t} <span className="mx-6 opacity-50">|</span>
        </span>
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => (
  <section className="py-24 px-6 bg-black relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-orange-400 text-xs font-bold tracking-[0.4em] uppercase">Testimonials</span>
        <h2 className="mt-3 text-5xl md:text-6xl font-black text-white">
          They{" "}
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Made It
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative p-7 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/30 hover:bg-white/8 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10"
          >
            {/* Quote mark */}
            <div className={`text-6xl font-black bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent opacity-30 leading-none mb-4`}>
              "
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 -mt-4">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-sm`}>
                {t.name[0]}
              </div>
              <div>
                <div className="text-white font-bold text-sm">{t.name}</div>
                <div className="text-gray-600 text-xs">{t.role}</div>
              </div>
            </div>

            {/* Stars */}
            <div className="absolute top-5 right-5 flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <span key={j} className="text-orange-400 text-xs">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export { MarqueeSection, TestimonialsSection };
