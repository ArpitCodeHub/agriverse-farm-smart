import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Preloader />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<><Navbar /><Home /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /></>} />
          <Route path="/about" element={<><Navbar /><AboutPage /></>} />
          <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
          <Route path="/login" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Login Page</h1><p>Connect Supabase to enable authentication</p></div></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
