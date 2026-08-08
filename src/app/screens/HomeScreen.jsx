import Hero from "../Components/Hero";
import AboutSection from "../Components/AboutSection";
import ContestantsSection from "../Components/ContestantsSection";
import EpisodesSection from "../Components/EpisodesSection";
import ChallengesSection from "../Components/ChallengesSection";
import ScoreboardSection from "../Components/ScoreboardSection";
import SponsorsSection from "../Components/SponsorsSection";
import Season2Section from "../Components/Season2Section";
import BannerSlider from "../Components/BannerSlider";
import BannerImage from "../Components/BannerImage";
// import TensionTicker from "../Components/TensionTicker";
import Jalajcomp from "../Components/Jalajcomp";

const DESKTOP_BANNER = "/chatgtbanner1.png";
const MOBILE_BANNER = "/chatgtbanner1-mobile.png";

const HomeScreen = () => (
  <main>
    <Hero />
    {/* <TensionTicker /> */}
    <BannerImage
      image={DESKTOP_BANNER}
      mobileImage={MOBILE_BANNER}
    />
    <AboutSection />
    <BannerSlider />
    {/* <Jalajcomp /> */}
    <ContestantsSection />
    <EpisodesSection />
    <ChallengesSection />
    {/* <ScoreboardSection /> */}
    <SponsorsSection />
    <Season2Section />
  </main>
);

export default HomeScreen;
