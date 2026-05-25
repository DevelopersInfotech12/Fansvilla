// ─── Splitsvilla Influencer Data ─────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Villa", href: "#villa" },
  { label: "Contestants", href: "#contestants" },
  { label: "Challenges", href: "#challenges" },
  { label: "Leaderboard", href: "#leaderboard" },
];

export const HERO_TAGLINES = [
  "Find Your Match.",
  "Rule The Villa.",
  "Own The Game.",
];

export const HERO_STATS = [
  { num: "20", label: "Influencers" },
  { num: "90", label: "Days" },
  { num: "₹25L", label: "Prize" },
];

export const CONTESTANTS = [
  {
    name: "Ananya Sharma",
    handle: "@ananya.glam",
    followers: "4.2M",
    category: "Fashion",
    emoji: "👑",
    color: "from-rose-500 to-pink-700",
    status: "Villa",
  },
  {
    name: "Rohan Kapoor",
    handle: "@rohan.fitness",
    followers: "3.8M",
    category: "Fitness",
    emoji: "💪",
    color: "from-amber-500 to-orange-700",
    status: "Villa",
  },
  {
    name: "Priya Nair",
    handle: "@priya.beats",
    followers: "6.1M",
    category: "Music",
    emoji: "🎤",
    color: "from-violet-500 to-purple-700",
    status: "Wild Card",
  },
  {
    name: "Dev Malhotra",
    handle: "@devchef",
    followers: "2.9M",
    category: "Food",
    emoji: "🍳",
    color: "from-emerald-500 to-teal-700",
    status: "Villa",
  },
  {
    name: "Simran Bedi",
    handle: "@simran.travel",
    followers: "5.3M",
    category: "Travel",
    emoji: "✈️",
    color: "from-cyan-500 to-blue-700",
    status: "Eliminated",
  },
  {
    name: "Karan Mehta",
    handle: "@karan.tech",
    followers: "1.8M",
    category: "Tech",
    emoji: "⚡",
    color: "from-yellow-500 to-amber-700",
    status: "Villa",
  },
];

export const STATUS_COLORS = {
  Villa: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Wild Card": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  Eliminated: "bg-white/10 text-white/40 border-white/20",
};

export const CHALLENGES = [
  {
    title: "Reel War",
    desc: "Create a viral reel in 60 mins. Most views wins immunity.",
    icon: "🎬",
    prize: "Immunity + Golden Key",
    ends: "2h 14m",
  },
  {
    title: "Style Duel",
    desc: "Style your partner with villa wardrobe. Oracle picks the winner.",
    icon: "👗",
    prize: "₹1 Lakh + Safe Pass",
    ends: "Tomorrow",
  },
  {
    title: "Followers Faceoff",
    desc: "Go live. Whoever gains more followers in 30 mins stays.",
    icon: "📱",
    prize: "Stay in Villa",
    ends: "3 days",
  },
];

export const COUPLES = [
  {
    rank: 1,
    names: "Ananya & Rohan",
    handles: "@ananya.glam + @rohan.fitness",
    score: 9840,
    trend: "+214",
    hearts: 97,
    emoji1: "👑",
    emoji2: "💪",
    color: "from-rose-500 to-amber-500",
  },
  {
    rank: 2,
    names: "Priya & Dev",
    handles: "@priya.beats + @devchef",
    score: 8720,
    trend: "+89",
    hearts: 91,
    emoji1: "🎤",
    emoji2: "🍳",
    color: "from-violet-500 to-pink-500",
  },
  {
    rank: 3,
    names: "Simran & Karan",
    handles: "@simran.travel + @karan.tech",
    score: 7310,
    trend: "-42",
    hearts: 83,
    emoji1: "✈️",
    emoji2: "⚡",
    color: "from-cyan-500 to-blue-500",
  },
];
