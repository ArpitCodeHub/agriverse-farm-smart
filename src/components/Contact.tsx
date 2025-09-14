import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. Our team will get back to you within 24 hours.",
    });
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@agriverse.com",
      description: "Send us your queries anytime",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91- 9990005555 ",
      description: "Mon-Fri, 8AM-8PM",
      color: "text-success"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Noida",
      description: "Our headquarters",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "24/7 Emergency Support",
      description: "We're here when you need us",
      color: "text-secondary"
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/agriverse",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/agriverse",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-50"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/agriverse",
      color: "hover:text-pink-600",
      bgColor: "hover:bg-pink-50"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Get in Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Connect with{" "}
            <span className="bg-gradient-growth bg-clip-text text-transparent">
              Our Experts
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions about your farming operations? Need personalized advice? 
            Our agricultural experts are here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-farm">
            <CardHeader className="bg-gradient-earth text-white">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription className="text-white/80">
                    Fill out the form below and we'll get back to you soon
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="What is this message about?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your farming challenges, questions, or how we can help you..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-growth text-primary-foreground hover:shadow-growth transition-farm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Choose the most convenient way to reach out to us. Our team of agricultural 
                experts is ready to assist you with personalized farming solutions.
              </p>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card 
                    key={info.title} 
                    className="shadow-farm hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <info.icon className={`h-6 w-6 ${info.color}`} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-1 text-foreground">
                            {info.title}
                          </h4>
                          <p className="font-medium text-foreground mb-1">
                            {info.details}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <Card className="shadow-farm">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold mb-4 text-foreground">
                  Follow Us on Social Media
                </h4>
                <p className="text-muted-foreground mb-6">
                  Stay updated with the latest farming tips, success stories, and platform updates.
                </p>
                
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg border transition-all duration-200 ${social.bgColor} ${social.color} hover-grow`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ CTA */}
            <Card className="shadow-farm bg-gradient-harvest">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-semibold mb-3 text-secondary-foreground">
                  Need Quick Answers?
                </h4>
                <p className="text-secondary-foreground/80 mb-6">
                  Check out our FAQ section for instant answers to common farming questions.
                </p>
                <Button variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;