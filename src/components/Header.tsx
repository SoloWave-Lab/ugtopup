import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { AccountDropdown } from "@/components/AccountDropdown";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex h-24 md:h-28 lg:h-32 items-center justify-between">
          <Link to="/" className="flex items-center py-2">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full" />
              <img 
                src="/logo.jpg" 
                alt="UG TOP-UP" 
                className="relative h-20 w-auto object-contain md:h-24 lg:h-28"
                loading="eager"
              />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <AccountDropdown />
            ) : (
              <Link to="/login">
                <Button 
                  className="bg-gradient-to-r from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/30"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
