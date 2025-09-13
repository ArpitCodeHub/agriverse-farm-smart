import Hero from "@/components/Hero";
import FarmerProfile from "@/components/FarmerProfile";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FarmerProfile />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
