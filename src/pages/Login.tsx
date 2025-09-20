import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import agriverselogo from "@/assets/agriverse-logo.png";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to send user data to n8n webhook on login
  const notifyLoginWebhook = async (userId: string, fullName: string) => {
    try {
      const response = await fetch('https://n8n.srv1012569.hstgr.cloud/webhook-test/314767d0-c760-4b50-8921-4e8663729f2e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docId: userId,
          fullName: fullName
        }),
      });

      if (!response.ok) {
        console.error('Webhook notification failed:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to notify login webhook:', error);
      // Don't block the login process if webhook fails
    }
  };

  // Function to get user data from Firestore
  const getUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'farmers', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.fullName || '';
      }
      return '';
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { user, error } = await login(email, password);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      // Get user data and send to webhook
      if (user) {
        const fullName = await getUserData(user.uid);
        await notifyLoginWebhook(user.uid, fullName);
      }
      
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate('/home');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-growth flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <img 
            src={agriverselogo} 
            alt="Agriverse" 
            className="h-16 w-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-primary-foreground">
            Welcome to <span className="bg-gradient-harvest bg-clip-text text-transparent">Agriverse</span>
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            Sign in to your farming dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-card/80 backdrop-blur-sm border-primary-foreground/20 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Access your personalized farming insights
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
