import Hero from "../Components/Hero";
import AboutSection from "../Components/AboutSection";
import ContestantsSection from "../Components/ContestantsSection";
import EpisodesSection from "../Components/EpisodesSection";
import ChallengesSection from "../Components/ChallengesSection";
import ScoreboardSection from "../Components/ScoreboardSection";
import SponsorsSection from "../Components/SponsorsSection";
import Season2Section from "../Components/Season2Section";
import BannerSlider from "../Components/BannerSlider";
import BannerImageSlider from "../Components/BannerImageSlider";

const BANNERS = [
  "/banner1.png",
  "/bannernew3.png",
  // "/images/banner3.png",
];

const HomeScreen = () => (
  <main>
    <Hero />
    <AboutSection />
    <BannerImageSlider images={BANNERS} interval={4000} height="500px" />
    <BannerSlider />
    <ContestantsSection />
    <EpisodesSection />
    <ChallengesSection />
    <ScoreboardSection />
    <SponsorsSection />
    <Season2Section />
  </main>
);

export default HomeScreen;