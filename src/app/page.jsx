import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Banner from "./Components/Banner/Banner";
import HomeScreen from "./screens/HomeScreen";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Banner />
      <HomeScreen />
    </>
  );
}
