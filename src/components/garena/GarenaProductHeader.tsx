import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AccountDropdown } from "@/components/AccountDropdown";
import productGarena from "@/assets/product-garena.jpg";

export const GarenaProductHeader = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <img 
              src={productGarena}
              alt="Garena Shell" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Garena Shell</h1>
              <p className="text-xs text-muted-foreground">Instant Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Credits</p>
              <p className="text-sm font-bold text-primary">
                ₹{profile?.balance?.toLocaleString() || "0"}
              </p>
            </div>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};
