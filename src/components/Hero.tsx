import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import agriverselogo from "@/assets/agriverse-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-growth px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary via-transparent to-secondary" />
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground animate-fade-in">
          Welcome to{" "}
          <span className="bg-gradient-harvest bg-clip-text text-transparent">
            Agriverse
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in">
          Smart agricultural advisory platform empowering farmers with AI-driven insights, 
          personalized recommendations, and modern farming solutions.
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { icon: Sprout, label: "Crop Optimization", color: "text-success" },
            { icon: TrendingUp, label: "Yield Prediction", color: "text-secondary" },
            { icon: Users, label: "Expert Advisory", color: "text-accent" },
            { icon: Shield, label: "Risk Management", color: "text-primary-glow" },
          ].map((feature, index) => (
            <div 
              key={feature.label}
              className="flex flex-col items-center p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <feature.icon className={`h-8 w-8 mb-3 ${feature.color}`} />
              <span className="text-sm font-medium text-primary-foreground">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
        
        {/* AI Chatbot Assistant Card */}
        <div className="flex justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="w-full max-w-2xl p-8 bg-card/20 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover-lift relative">
            {/* Glow effect overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/10 via-amber-300/5 to-orange-400/10 pointer-events-none" />
            
            <div className="relative z-10 text-center">
              {/* Glowing heading */}
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground relative">
                <span className="relative inline-block">
                  🌾 AgriVerse AI-Powered Personal Farming Assistant
                  <div className="absolute inset-0 blur-lg bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 opacity-30 -z-10" />
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-lg text-primary-foreground/80 mb-6 max-w-lg mx-auto">
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
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-16">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-foreground/30 text-black hover:bg-primary-foreground/10 hover:text-black px-8 py-4 text-lg"
            asChild
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;