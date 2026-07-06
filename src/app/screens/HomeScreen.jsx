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
import TensionTicker from "../Components/TensionTicker";
import Jalajcomp from "../Components/Jalajcomp";

const DESKTOP_BANNERS = [
  "/chatgtbanner1.png",
  "/chatgtbanner2.png",
];

const MOBILE_BANNERS = [
  "/chatgtbanner1-mobile.png",
  "/chatgtbanner2-mobile.png",
];

const HomeScreen = () => (
  <main>
    <Hero />
    <TensionTicker />
    <BannerImageSlider
      images={DESKTOP_BANNERS}
      mobileImages={MOBILE_BANNERS}
      interval={4000}
    />
    <AboutSection />
    <BannerSlider />
    <Jalajcomp />
    <ContestantsSection />
    <EpisodesSection />
    <ChallengesSection />
    {/* <ScoreboardSection /> */}
    <SponsorsSection />
    <Season2Section />
  </main>
);

export default HomeScreen;
