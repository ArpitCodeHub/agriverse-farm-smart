import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/src/assets/agriverse-logo.png" 
            alt="Agriverse" 
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-primary">Agriverse</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/profile" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/profile") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Profile
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/about") ? "text-primary" : "text-muted-foreground"
            )}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/contact") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;