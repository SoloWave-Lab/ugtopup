import { useAuth } from "@/contexts/AuthContext";
import { AccountDropdown } from "@/components/AccountDropdown";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface ProductHeaderProps {
  productTitle: string;
  productIcon: string;
  productSubtitle: string;
}

export const ProductHeader = ({ productTitle, productIcon, productSubtitle }: ProductHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Link 
              to="/" 
              className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl">{productIcon}</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-foreground truncate">{productTitle}</h1>
                <p className="text-xs text-muted-foreground truncate">{productSubtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-card border border-border">
                <span className="text-xs sm:text-sm text-muted-foreground">Credits:</span>
                <span className="text-base sm:text-lg font-bold text-primary">{user.balance || 0}💵</span>
              </div>
            )}
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};
