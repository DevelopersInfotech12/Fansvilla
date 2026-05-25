"use client";

import React from 'react';
import TopBar from '../Components/TopBar';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import PromoSlider from '../Components/PromoSlider';
import ContestantsSection from '../Components/ContestantsSection';
import ChallengesSection from '../Components/ChallengesSection';
import LeaderboardSection from '../Components/LeaderboardSection';
import ApplyCTA from '../Components/ApplyCTA';
import Footer from '../Components/Footer';
import FeaturedBannerSlider from '../Components/FeaturedBannerSlider';

const HomeScreen = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)" }}>
      <TopBar />
      <Navbar />
      <Hero />
      <FeaturedBannerSlider />
      <PromoSlider />
      <ContestantsSection />
      <ChallengesSection />
      <LeaderboardSection />
      <ApplyCTA />
      <Footer />
    </div>
  );
};

export default HomeScreen;
