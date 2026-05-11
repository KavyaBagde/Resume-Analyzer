import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import UploadSection from "../components/landing/UploadSection";
import Problem from "../components/landing/Problem";
import HowItWorks from "../components/landing/HowItWorks";
import Demo from "../components/landing/Demo";
import Pricing from "../components/landing/Pricing";
import CTA from "../components/landing/CTA";

const LandingPage = () => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <Hero />
      <UploadSection />
      <Problem />
      <HowItWorks />
      <Demo />
      <Pricing />
      <CTA />
    </div>
  );
};

export default LandingPage;
