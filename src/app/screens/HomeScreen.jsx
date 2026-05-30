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

const BANNERS = [
  "/banner1.png",
  "/bannernew3.png",
];

const HomeScreen = () => (
  <main>
    <Hero />
    <TensionTicker />
    <BannerImageSlider images={BANNERS} interval={4000} height="400px" />
    <AboutSection />
    <BannerSlider />
    <Jalajcomp/>
    <ContestantsSection />
    <EpisodesSection />
    <ChallengesSection />
    {/* <ScoreboardSection /> */}
    <SponsorsSection />
    <Season2Section />
  </main>
);

export default HomeScreen;
