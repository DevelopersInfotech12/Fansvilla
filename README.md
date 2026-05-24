# SplitVilla Influencer Platform

A Splitvilla-themed influencer platform built with Next.js 14 + Tailwind CSS.

## Project Structure

```
src/app/
├── page.js                    # Entry point
├── layout.js                  # Root layout
├── globals.css               # Global styles + animations
├── screens/
│   └── HomeScreen.jsx        # Home page screen
└── components/
    ├── Navbar.jsx             # Sticky animated navbar
    ├── HeroSection.jsx        # Full-screen hero with parallax orbs
    ├── FeaturedInfluencers.jsx # Influencer cards grid
    ├── ChallengesSection.jsx   # Live challenges cards
    ├── LeaderboardSection.jsx  # Rankings table
    ├── HowItWorksSection.jsx   # 4-step process
    ├── MarqueeTestimonials.jsx # Ticker + testimonials
    └── Footer.jsx             # Footer with links
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Design

- **Colors**: Orange → Pink → Purple gradient system
- **Fonts**: Bebas Neue (display) + Syne (body)
- **Theme**: Dark luxury / MTV Splitvilla vibes
- **Animations**: Scroll-triggered reveal, mouse parallax, marquee ticker, floating particles
