import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}