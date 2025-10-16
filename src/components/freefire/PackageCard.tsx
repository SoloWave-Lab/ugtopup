import { Package } from "@/data/freefirePackages";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  package: Package;
  isSelected: boolean;
  onSelect: () => void;
}

export const PackageCard = ({ package: pkg, isSelected, onSelect }: PackageCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full rounded-lg p-3 sm:p-4 min-h-[72px] transition-all duration-300",
        "bg-card border-2 hover:bg-card/80 active:scale-95",
        isSelected
          ? "border-primary glow-border scale-105"
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 text-left min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">💎</span>
          <div className="min-w-0">
            <p className={cn(
              "font-semibold transition-colors text-sm sm:text-base",
              isSelected ? "text-primary" : "text-foreground"
            )}>
              {pkg.quantity} {pkg.type === 'diamond' || pkg.type === 'zone' ? '💎' : ''}
            </p>
            <p className="text-xs text-muted-foreground truncate">{pkg.name}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={cn(
            "text-base sm:text-xl font-bold transition-colors whitespace-nowrap",
            isSelected ? "text-primary" : "text-foreground"
          )}>
            {pkg.price}{pkg.currency}
          </p>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xs text-primary-foreground">✓</span>
        </div>
      )}
    </button>
  );
};
