import { Package } from "@/data/freefirePackages";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

interface PackageCardProps {
  package: Package;
  isSelected: boolean;
  selectedQuantity?: number;
  onSelect: () => void;
  onIncreaseQuantity?: () => void;
}

export const PackageCard = ({ 
  package: pkg, 
  isSelected, 
  selectedQuantity = 0,
  onSelect,
  onIncreaseQuantity
}: PackageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIncreaseQuantity) {
      onIncreaseQuantity();
    }
  };
  
  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIncreaseQuantity) {
      onIncreaseQuantity();
    }
  };

  return (
    <button
      onClick={onSelect}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative w-full rounded-xl p-3 sm:p-4 min-h-[80px] transition-all duration-300",
        "bg-card border-2 hover:bg-card/80 active:scale-95",
        isSelected
          ? "border-primary glow-border scale-105"
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-3 text-left min-w-0">
          <span className="text-2xl flex-shrink-0">💎</span>
          <div className="min-w-0">
            <p className={cn(
              "font-semibold transition-colors text-base sm:text-lg tracking-tight",
              isSelected ? "text-primary" : "text-foreground"
            )}>
              {pkg.quantity} {pkg.type === 'diamond' || pkg.type === 'zone' ? '💎' : ''}
            </p>
            <p className="text-xs text-muted-foreground truncate font-normal">{pkg.name}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={cn(
            "text-xl sm:text-2xl font-bold transition-colors whitespace-nowrap tracking-tight",
            isSelected ? "text-primary" : "text-foreground"
          )}>
            {pkg.currency}{pkg.price}
          </p>
        </div>
      </div>
      
      {/* Quantity Badge */}
      {selectedQuantity > 0 && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-scale-in z-10">
          <span className="text-sm font-bold text-primary-foreground">{selectedQuantity}×</span>
        </div>
      )}
      
      {/* Plus Button */}
      {(isSelected || isHovered) && onIncreaseQuantity && (
        <button
          onClick={handlePlusClick}
          className="absolute top-3 right-3 w-8 h-8 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg z-10"
        >
          <Plus className="w-4 h-4 text-primary hover:text-primary-foreground" />
        </button>
      )}
    </button>
  );
};
