import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">AgriVerse</span>
        </Link>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/home" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/home") ? "text-primary" : "text-muted-foreground"
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
            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* AI Assistant Link - Middle */}
          <a
            href="https://n8n.srv1012569.hstgr.cloud/webhook/4c1adee7-9c5b-4f8b-a85d-3985787ecf7d/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[hsl(var(--warning))] hover:opacity-80 transition-opacity"
          >
            Talk to AI Assistant
          </a>

          {/* Hamburger Menu - Right */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/home" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about" className="w-full">
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact" className="w-full">
                  Contact
                </Link>
              </DropdownMenuItem>
              {user ? (
                <DropdownMenuItem onClick={handleLogout} className="w-full">
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="w-full">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
