import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Leaf, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  Target,
  Heart,
  Award
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze your farm data to provide intelligent recommendations for optimal crop management.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Yield Optimization",
      description: "Data-driven strategies to maximize your crop yields while minimizing resource waste and environmental impact.",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Proactive identification and mitigation of farming risks including weather, pests, diseases, and market fluctuations.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Access to agricultural experts, extension officers, and experienced farmers for personalized guidance and support.",
      color: "text-secondary"
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Promote environmentally friendly farming techniques that ensure long-term soil health and ecosystem balance.",
      color: "text-success"
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Continuous monitoring of weather conditions, soil moisture, and crop health with instant alerts and recommendations.",
      color: "text-accent"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To empower farmers with cutting-edge technology and expert knowledge, enabling them to make informed decisions that boost productivity and profitability."
    },
    {
      icon: Heart,
      title: "Vision",
      description: "Creating a sustainable agricultural future where every farmer has access to personalized, AI-driven advisory services for optimal farming success."
    },
    {
      icon: Award,
      title: "Values",
      description: "Innovation, sustainability, farmer-centricity, and continuous learning drive everything we do to transform modern agriculture."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            About Agriverse
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Revolutionizing Agriculture with{" "}
            <span className="bg-gradient-growth bg-clip-text text-transparent">
              Smart Technology
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Agriverse is a comprehensive agricultural advisory platform that combines artificial intelligence, 
            expert knowledge, and sustainable farming practices to help farmers achieve unprecedented success. 
            Our mission is to bridge the gap between traditional farming wisdom and modern technology.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={value.title} className="text-center shadow-farm hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-growth rounded-full flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose Agriverse?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="shadow-farm hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-background rounded-lg">
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-growth rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-8">
            Trusted by Farmers Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Farmers" },
              { number: "50+", label: "Crop Types Supported" },
              { number: "95%", label: "Yield Improvement" },
              { number: "24/7", label: "Expert Support" }
            ].map((stat, index) => (
              <div key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            Powered by Advanced Technology
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Machine Learning",
              "Satellite Imagery",
              "Weather Analytics",
              "Soil Analysis",
              "IoT Sensors",
              "Blockchain",
              "Mobile Technology",
              "Cloud Computing"
            ].map((tech, index) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="px-4 py-2 text-sm animate-fade-in hover-grow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;