import Hero from "@/components/Hero";
import FarmerProfile from "@/components/FarmerProfile";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* AI Chatbot Assistant Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="container mx-auto max-w-4xl flex justify-center">
          <div className="w-full max-w-2xl p-8 bg-card/20 backdrop-blur-sm rounded-xl border border-primary/20 hover-lift relative animate-fade-in">
            {/* Glow effect overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/10 via-amber-300/5 to-orange-400/10 pointer-events-none" />
            
            <div className="relative z-10 text-center">
              {/* Glowing heading */}
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground relative">
                <span className="relative inline-block">
                  🌾 AgriVerse AI-Powered Personal Farming Assistant
                  <div className="absolute inset-0 blur-lg bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 opacity-30 -z-10" />
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
                Your intelligent farming assistant — available 24/7 to guide, support, and empower farmers.
              </p>
              
              {/* Glowing CTA Button */}
              <a 
                href="https://n8n.srv1012569.hstgr.cloud/webhook/4c1adee7-9c5b-4f8b-a85d-3985787ecf7d/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-white hover:from-yellow-300 hover:via-amber-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 relative group shadow-lg"
              >
                <span className="relative z-10">Chat with AgriVerse AI</span>
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <FarmerProfile />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
