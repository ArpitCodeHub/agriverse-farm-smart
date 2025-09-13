import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Sun, Droplets, Leaf } from "lucide-react";
import agriverselogo from "@/assets/agriverse-logo.png";

const Preloader = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const steps = [
      { delay: 0, duration: 1000 },      // Logo appear
      { delay: 1200, duration: 800 },    // Seeds growing
      { delay: 2200, duration: 800 },    // Sun rising
      { delay: 3200, duration: 800 },    // Water dropping
      { delay: 4200, duration: 1000 },   // Final growth
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, step.delay);
    });

    // Navigate to signup after animation completes
    setTimeout(() => {
      navigate("/signup");
    }, 5500);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-growth flex items-center justify-center overflow-hidden z-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary" />
      </div>

      <div className="text-center relative z-10">
        {/* Logo Animation */}
        <div className={`mb-8 transition-all duration-1000 ${currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <img 
            src={agriverselogo} 
            alt="Agriverse" 
            className="h-20 w-20 mx-auto animate-pulse"
          />
        </div>

        {/* Main Title */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
            <span className="bg-gradient-harvest bg-clip-text text-transparent">
              Agriverse
            </span>
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Growing the Future of Agriculture
          </p>
        </div>

        {/* Animation Sequence */}
        <div className="relative w-80 h-40 mx-auto mb-8">
          
          {/* Seeds/Sprouts Growing */}
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-800 ${currentStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
            <div className="flex space-x-4 items-end">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`transition-all duration-800 delay-${i * 200}`} style={{animationDelay: `${i * 0.2}s`}}>
                  <Sprout 
                    className={`h-8 w-8 text-success transition-all duration-1000 ${currentStep >= 2 ? 'animate-bounce' : ''}`}
                    style={{animationDelay: `${i * 0.3}s`}}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sun Rising */}
          <div className={`absolute top-0 right-8 transition-all duration-800 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <Sun className="h-12 w-12 text-yellow-400 animate-spin" style={{animationDuration: '4s'}} />
          </div>

          {/* Water Droplets */}
          <div className={`absolute top-8 left-8 transition-all duration-800 ${currentStep >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col space-y-2">
              {[1, 2, 3].map((i) => (
                <Droplets 
                  key={i} 
                  className={`h-4 w-4 text-blue-400 transition-all duration-500 ${currentStep >= 4 ? 'animate-bounce' : ''}`}
                  style={{animationDelay: `${i * 0.4}s`}}
                />
              ))}
            </div>
          </div>

          {/* Final Leaves Growing */}
          <div className={`absolute top-4 right-1/4 transition-all duration-1000 ${currentStep >= 5 ? 'opacity-100 scale-100 rotate-12' : 'opacity-0 scale-0'}`}>
            <Leaf className="h-6 w-6 text-success animate-pulse" />
          </div>
          <div className={`absolute bottom-8 left-1/4 transition-all duration-1000 delay-300 ${currentStep >= 5 ? 'opacity-100 scale-100 -rotate-12' : 'opacity-0 scale-0'}`}>
            <Leaf className="h-6 w-6 text-success animate-pulse" />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-64 h-1 bg-primary-foreground/20 rounded-full mx-auto mb-6">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Loading Text */}
        <div className={`transition-all duration-500 ${currentStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-primary-foreground/70 text-sm font-medium">
            {currentStep <= 1 && "Initializing..."}
            {currentStep === 2 && "Planting seeds..."}
            {currentStep === 3 && "Nurturing growth..."}
            {currentStep === 4 && "Watering crops..."}
            {currentStep >= 5 && "Ready to grow together!"}
          </p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;