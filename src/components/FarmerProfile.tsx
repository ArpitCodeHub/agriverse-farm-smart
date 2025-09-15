import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Wheat, Droplets, Calendar, TrendingUp, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface CropData {
  cropName: string;
  cropType: string;
  season: string;
  soilType: string;
  seedVariety: string;
  irrigationType: string;
  waterSource: string;
  fertilizerUsage: string;
  pesticideUsage: string;
  expectedYield: string;
  lastYearYield: string;
  landSize: string;
  challenges: string;
}

interface FarmerData {
  fullName: string;
  email: string;
  phone: string;
  farmName: string;
  location: string;
  farmSize: string;
  experience: string;
  primaryCrop: string;
  secondaryCrops: string;
  currentSeason: string;
  soilType: string;
  irrigationType: string;
  waterSource: string;
  fertilizerUsage: string;
  pesticideUsage: string;
  seedVariety: string;
  plantingMethod: string;
  expectedYield: string;
  lastYearYield: string;
  challenges: string;
  goals: string;
  equipment: string;
  additionalCrops?: CropData[];
}

const FarmerProfile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(true);
  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [savedProfile, setSavedProfile] = useState<FarmerData | null>(null);
  const [formData, setFormData] = useState<FarmerData>({
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
    additionalCrops: [],
  });

  const [newCropData, setNewCropData] = useState<CropData>({
    cropName: "",
    cropType: "",
    season: "",
    soilType: "",
    seedVariety: "",
    irrigationType: "",
    waterSource: "",
    fertilizerUsage: "",
    pesticideUsage: "",
    expectedYield: "",
    lastYearYield: "",
    landSize: "",
    challenges: "",
  });

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) return;
      
      try {
        const docRef = doc(db, "farmers", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as FarmerData;
          setFormData(data);
          setSavedProfile(data);
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNewCropInputChange = (field: string, value: string) => {
    setNewCropData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.uid) {
      toast({
        title: "Error",
        description: "You must be logged in to save your profile.",
        variant: "destructive",
      });
      return;
    }

    try {
      const docRef = doc(db, "farmers", user.uid);
      await setDoc(docRef, formData, { merge: true });
      
      setSavedProfile(formData);
      setIsEditing(false);
      
      toast({
        title: "Profile Saved Successfully!",
        description: "Your farming profile has been saved. Our AI will analyze your data to provide personalized recommendations.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddCrop = () => {
    setIsAddingCrop(true);
  };

  const handleSaveNewCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.uid || !newCropData.cropName || !newCropData.cropType) {
      toast({
        title: "Error",
        description: "Please fill in at least the crop name and type.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedData = {
        ...formData,
        additionalCrops: [...(formData.additionalCrops || []), newCropData]
      };
      
      const docRef = doc(db, "farmers", user.uid);
      await setDoc(docRef, updatedData, { merge: true });
      
      setFormData(updatedData);
      setSavedProfile(updatedData);
      setIsAddingCrop(false);
      setNewCropData({
        cropName: "",
        cropType: "",
        season: "",
        soilType: "",
        seedVariety: "",
        irrigationType: "",
        waterSource: "",
        fertilizerUsage: "",
        pesticideUsage: "",
        expectedYield: "",
        lastYearYield: "",
        landSize: "",
        challenges: "",
      });

      toast({
        title: "Crop Added!",
        description: `${newCropData.cropName} has been added to your profile.`,
      });
    } catch (error) {
      console.error("Error adding crop:", error);
      toast({
        title: "Error",
        description: "Failed to add crop. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelAddCrop = () => {
    setIsAddingCrop(false);
    setNewCropData({
      cropName: "",
      cropType: "",
      season: "",
      soilType: "",
      seedVariety: "",
      irrigationType: "",
      waterSource: "",
      fertilizerUsage: "",
      pesticideUsage: "",
      expectedYield: "",
      lastYearYield: "",
      landSize: "",
      challenges: "",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!isEditing && savedProfile) {
    return (
      <section id="profile" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Farmer Profile
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Your Farming Profile
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's your complete farming profile information
            </p>
          </div>

          <Card className="shadow-farm">
            <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl">{savedProfile.fullName || "Farmer Profile"}</CardTitle>
                  <CardDescription className="text-white/80">
                    {savedProfile.farmName && `${savedProfile.farmName} - `}{savedProfile.location}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Personal Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Full Name:</strong> {savedProfile.fullName}</div>
                    <div><strong>Email:</strong> {savedProfile.email}</div>
                    <div><strong>Phone:</strong> {savedProfile.phone || "Not provided"}</div>
                    <div><strong>Farm Name:</strong> {savedProfile.farmName || "Not provided"}</div>
                  </div>
                </div>

                {/* Farm Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Farm Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><strong>Location:</strong> {savedProfile.location}</div>
                    <div><strong>Farm Size:</strong> {savedProfile.farmSize} acres</div>
                    <div><strong>Experience:</strong> {savedProfile.experience || "Not specified"}</div>
                  </div>
                </div>

                {/* Crop Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Wheat className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Crop Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Primary Crop:</strong> {savedProfile.primaryCrop || "Not specified"}</div>
                    <div><strong>Current Season:</strong> {savedProfile.currentSeason || "Not specified"}</div>
                    <div><strong>Soil Type:</strong> {savedProfile.soilType || "Not specified"}</div>
                    <div><strong>Seed Variety:</strong> {savedProfile.seedVariety || "Not specified"}</div>
                  </div>
                  {savedProfile.secondaryCrops && (
                    <div><strong>Secondary Crops:</strong> {savedProfile.secondaryCrops}</div>
                  )}
                  {savedProfile.additionalCrops && savedProfile.additionalCrops.length > 0 && (
                    <div>
                      <strong>Additional Crops:</strong>
                      <div className="mt-4 space-y-4">
                        {savedProfile.additionalCrops.map((crop, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-muted/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{crop.cropName}</Badge>
                              <Badge variant="outline">{crop.cropType}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              {crop.landSize && <div><strong>Land Size:</strong> {crop.landSize} acres</div>}
                              {crop.season && <div><strong>Season:</strong> {crop.season}</div>}
                              {crop.soilType && <div><strong>Soil Type:</strong> {crop.soilType}</div>}
                              {crop.seedVariety && <div><strong>Seed Variety:</strong> {crop.seedVariety}</div>}
                              {crop.irrigationType && <div><strong>Irrigation:</strong> {crop.irrigationType}</div>}
                              {crop.expectedYield && <div><strong>Expected Yield:</strong> {crop.expectedYield}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Water Management */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Droplets className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Water Management</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Irrigation Type:</strong> {savedProfile.irrigationType || "Not specified"}</div>
                    <div><strong>Water Source:</strong> {savedProfile.waterSource || "Not specified"}</div>
                  </div>
                </div>

                {/* Input Management & Yield */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Input Management & Yield</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Fertilizer Usage:</strong> {savedProfile.fertilizerUsage || "Not specified"}</div>
                    <div><strong>Pesticide Usage:</strong> {savedProfile.pesticideUsage || "Not specified"}</div>
                    <div><strong>Expected Yield:</strong> {savedProfile.expectedYield || "Not specified"}</div>
                    <div><strong>Last Year's Yield:</strong> {savedProfile.lastYearYield || "Not specified"}</div>
                  </div>
                </div>

                {/* Additional Information */}
                {(savedProfile.challenges || savedProfile.goals || savedProfile.equipment) && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Additional Information</h3>
                    {savedProfile.challenges && (
                      <div><strong>Current Challenges:</strong> {savedProfile.challenges}</div>
                    )}
                    {savedProfile.goals && (
                      <div><strong>Farming Goals:</strong> {savedProfile.goals}</div>
                    )}
                    {savedProfile.equipment && (
                      <div><strong>Available Equipment:</strong> {savedProfile.equipment}</div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button 
                    onClick={handleEdit}
                    size="lg" 
                    className="bg-gradient-growth text-primary-foreground hover:shadow-growth transition-farm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button 
                    onClick={handleAddCrop}
                    variant="outline"
                    size="lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Crop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="profile" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Farmer Registration
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {savedProfile ? "Update Your Farming Profile" : "Create Your Farming Profile"}
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

                {/* Additional Crops Display */}
                {formData.additionalCrops && formData.additionalCrops.length > 0 && (
                  <div className="space-y-2">
                    <Label>Additional Crops</Label>
                    <div className="flex gap-2 flex-wrap">
                      {formData.additionalCrops.map((crop, index) => (
                        <Badge key={index} variant="secondary">{crop.cropName}</Badge>
                      ))}
                    </div>
                  </div>
                )}
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
                  {savedProfile ? "Update Farmer Profile" : "Save Farmer Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Add New Crop Form - Available in both editing and viewing modes */}
      {isAddingCrop && (
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Card className="shadow-farm">
            <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <Wheat className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl">Add New Crop</CardTitle>
                  <CardDescription className="text-white/80">
                    Enter details for your additional crop
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSaveNewCrop} className="space-y-8">
                {/* Basic Crop Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wheat className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Crop Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cropName">Crop Name *</Label>
                      <Input
                        id="cropName"
                        placeholder="e.g., Tomatoes, Wheat, Rice"
                        value={newCropData.cropName}
                        onChange={(e) => handleNewCropInputChange("cropName", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cropType">Crop Type *</Label>
                      <Select value={newCropData.cropType} onValueChange={(value) => handleNewCropInputChange("cropType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop type" />
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
                      <Label htmlFor="landSize">Land Size (acres)</Label>
                      <Input
                        id="landSize"
                        type="number"
                        placeholder="e.g., 5"
                        value={newCropData.landSize}
                        onChange={(e) => handleNewCropInputChange("landSize", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="season">Season</Label>
                      <Select value={newCropData.season} onValueChange={(value) => handleNewCropInputChange("season", value)}>
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
                  </div>
                </div>

                {/* Land & Soil Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Land & Soil Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newSoilType">Soil Type</Label>
                      <Select value={newCropData.soilType} onValueChange={(value) => handleNewCropInputChange("soilType", value)}>
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
                      <Label htmlFor="newSeedVariety">Seed Variety</Label>
                      <Input
                        id="newSeedVariety"
                        placeholder="e.g., High-yield variety, Organic seeds"
                        value={newCropData.seedVariety}
                        onChange={(e) => handleNewCropInputChange("seedVariety", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Water Management */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Droplets className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Water Management</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newIrrigationType">Irrigation Type</Label>
                      <Select value={newCropData.irrigationType} onValueChange={(value) => handleNewCropInputChange("irrigationType", value)}>
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
                      <Label htmlFor="newWaterSource">Water Source</Label>
                      <Select value={newCropData.waterSource} onValueChange={(value) => handleNewCropInputChange("waterSource", value)}>
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

                {/* Input Management & Yield */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Input Management & Yield</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newFertilizerUsage">Fertilizer Usage</Label>
                      <Input
                        id="newFertilizerUsage"
                        placeholder="Type and quantity of fertilizers used"
                        value={newCropData.fertilizerUsage}
                        onChange={(e) => handleNewCropInputChange("fertilizerUsage", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPesticideUsage">Pesticide Usage</Label>
                      <Input
                        id="newPesticideUsage"
                        placeholder="Type and frequency of pesticide application"
                        value={newCropData.pesticideUsage}
                        onChange={(e) => handleNewCropInputChange("pesticideUsage", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newExpectedYield">Expected Yield (per acre)</Label>
                      <Input
                        id="newExpectedYield"
                        placeholder="e.g., 25 quintals per acre"
                        value={newCropData.expectedYield}
                        onChange={(e) => handleNewCropInputChange("expectedYield", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newLastYearYield">Last Year's Yield</Label>
                      <Input
                        id="newLastYearYield"
                        placeholder="Previous season's yield"
                        value={newCropData.lastYearYield}
                        onChange={(e) => handleNewCropInputChange("lastYearYield", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Additional Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newChallenges">Specific Challenges for this Crop</Label>
                    <Textarea
                      id="newChallenges"
                      placeholder="Describe any specific challenges for this crop (pest issues, weather concerns, etc.)"
                      value={newCropData.challenges}
                      onChange={(e) => handleNewCropInputChange("challenges", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-gradient-growth text-primary-foreground hover:shadow-growth transition-farm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Crop
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleCancelAddCrop}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default FarmerProfile;