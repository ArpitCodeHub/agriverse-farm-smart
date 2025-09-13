import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Wheat, Droplets, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FarmerProfile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Personal details
    fullName: "",
    email: "",
    phone: "",
    farmName: "",
    location: "",
    farmSize: "",
    experience: "",
    
    // Farming details
    primaryCrop: "",
    secondaryCrops: "",
    currentSeason: "",
    soilType: "",
    irrigationType: "",
    waterSource: "",
    
    // Management details
    fertilizerUsage: "",
    pesticideUsage: "",
    seedVariety: "",
    plantingMethod: "",
    expectedYield: "",
    lastYearYield: "",
    
    // Additional info
    challenges: "",
    goals: "",
    equipment: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Saved Successfully!",
      description: "Your farming profile has been saved. Our AI will analyze your data to provide personalized recommendations.",
    });
  };

  return (
    <section id="profile" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Farmer Registration
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Create Your Farming Profile
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us understand your farming operations to provide personalized advisory services and recommendations
          </p>
        </div>

        <Card className="shadow-farm">
          <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <div>
                <CardTitle className="text-2xl">Farmer Information</CardTitle>
                <CardDescription className="text-white/80">
                  Complete your profile to get started with personalized farming insights
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Personal Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input
                      id="farmName"
                      placeholder="Green Valley Farm"
                      value={formData.farmName}
                      onChange={(e) => handleInputChange("farmName", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Farm Location & Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Farm Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="City, State, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size (acres) *</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      placeholder="50"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange("farmSize", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Farming Experience (years)</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-20">11-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Crop Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wheat className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Crop Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryCrop">Primary Crop *</Label>
                    <Select value={formData.primaryCrop} onValueChange={(value) => handleInputChange("primaryCrop", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentSeason">Current Season</Label>
                    <Select value={formData.currentSeason} onValueChange={(value) => handleInputChange("currentSeason", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="monsoon">Monsoon</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="silty">Silty</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seedVariety">Seed Variety</Label>
                    <Input
                      id="seedVariety"
                      placeholder="e.g., High-yield variety, Organic seeds"
                      value={formData.seedVariety}
                      onChange={(e) => handleInputChange("seedVariety", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryCrops">Secondary Crops (if any)</Label>
                  <Input
                    id="secondaryCrops"
                    placeholder="List other crops you grow"
                    value={formData.secondaryCrops}
                    onChange={(e) => handleInputChange("secondaryCrops", e.target.value)}
                  />
                </div>
              </div>

              {/* Irrigation & Water Management */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Water Management</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="irrigationType">Irrigation Type</Label>
                    <Select value={formData.irrigationType} onValueChange={(value) => handleInputChange("irrigationType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select irrigation method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drip">Drip Irrigation</SelectItem>
                        <SelectItem value="sprinkler">Sprinkler</SelectItem>
                        <SelectItem value="flood">Flood Irrigation</SelectItem>
                        <SelectItem value="rainwater">Rainwater Dependent</SelectItem>
                        <SelectItem value="mixed">Mixed Methods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="waterSource">Water Source</Label>
                    <Select value={formData.waterSource} onValueChange={(value) => handleInputChange("waterSource", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select water source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="borewell">Borewell</SelectItem>
                        <SelectItem value="canal">Canal</SelectItem>
                        <SelectItem value="river">River</SelectItem>
                        <SelectItem value="rainwater">Rainwater Harvesting</SelectItem>
                        <SelectItem value="mixed">Multiple Sources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Input Management */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Input Management & Yield</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerUsage">Fertilizer Usage</Label>
                    <Input
                      id="fertilizerUsage"
                      placeholder="Type and quantity of fertilizers used"
                      value={formData.fertilizerUsage}
                      onChange={(e) => handleInputChange("fertilizerUsage", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pesticideUsage">Pesticide Usage</Label>
                    <Input
                      id="pesticideUsage"
                      placeholder="Type and frequency of pesticide application"
                      value={formData.pesticideUsage}
                      onChange={(e) => handleInputChange("pesticideUsage", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expectedYield">Expected Yield (per acre)</Label>
                    <Input
                      id="expectedYield"
                      placeholder="e.g., 25 quintals per acre"
                      value={formData.expectedYield}
                      onChange={(e) => handleInputChange("expectedYield", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastYearYield">Last Year's Yield</Label>
                    <Input
                      id="lastYearYield"
                      placeholder="Previous season's yield"
                      value={formData.lastYearYield}
                      onChange={(e) => handleInputChange("lastYearYield", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Additional Information</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="challenges">Current Farming Challenges</Label>
                    <Textarea
                      id="challenges"
                      placeholder="Describe any challenges you're currently facing (pest issues, weather concerns, market problems, etc.)"
                      value={formData.challenges}
                      onChange={(e) => handleInputChange("challenges", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="goals">Farming Goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="What are your main goals? (increase yield, reduce costs, sustainable farming, etc.)"
                      value={formData.goals}
                      onChange={(e) => handleInputChange("goals", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Available Equipment</Label>
                    <Input
                      id="equipment"
                      placeholder="List major farming equipment you own"
                      value={formData.equipment}
                      onChange={(e) => handleInputChange("equipment", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-growth text-primary-foreground hover:shadow-growth transition-farm"
                >
                  Save Farmer Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FarmerProfile;