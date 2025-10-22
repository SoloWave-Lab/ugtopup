import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const { isAuthenticated, profile, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <img 
              src="/logo.jpg" 
              alt="UG TOP-UP" 
              className="h-12 md:h-16 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Credit Balance */}
                <div className="hidden sm:flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl px-4 py-2">
                  <span className="text-sm font-semibold text-white">
                    {profile?.balance || 0} Cr.
                  </span>
                </div>

                {/* Add Credit Button */}
                <Button
                  size="icon"
                  className="neon-button h-10 w-10 rounded-xl"
                >
                  <Plus className="h-5 w-5" />
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden sm:flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl px-3 py-2 hover:border-primary/50 transition-colors">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-white max-w-[100px] truncate">
                        {profile?.username || user?.email?.split('@')[0]}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-black/95 border-white/10">
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="cursor-pointer">
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link to="/login">
                  <Button 
                    className="neon-button h-10 px-6 rounded-xl font-bold text-white"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white/60 hover:text-white hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/5 bg-black/98 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {profile?.username || user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-white/60">
                      {profile?.balance || 0} Cr.
                    </p>
                  </div>
                </div>
                <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-white">
                    Account
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-white">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="neon-button w-full font-bold">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
