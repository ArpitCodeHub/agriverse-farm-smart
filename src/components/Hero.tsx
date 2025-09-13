import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Users, Shield } from "lucide-react";
import agriverselogo from "@/assets/agriverse-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-growth px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary via-transparent to-secondary" />
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src={agriverselogo} 
            alt="Agriverse Logo" 
            className="h-16 w-auto animate-grow-bounce"
          />
        </div>
        
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
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button 
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg font-semibold shadow-harvest hover-grow"
          >
            Get Started Today
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg"
          >
            Learn More
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