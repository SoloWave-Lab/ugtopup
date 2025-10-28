import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AccountDropdown } from "@/components/AccountDropdown";
import { useAuth } from "@/contexts/AuthContext";
import productSmile from "@/assets/product-smile.jpg";

export const SmileCoinProductHeader = () => {
  const { user, profile } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src={productSmile} 
                alt="Smile Coin" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-base sm:text-lg font-bold text-foreground">Smile Coin</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Smile Coin Top-Up</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {user && profile && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/40">
              <span className="text-sm text-muted-foreground">Balance:</span>
              <span className="font-bold text-dashboard-green">₹{profile.balance?.toLocaleString() || 0}</span>
            </div>
          )}
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
};
