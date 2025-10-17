import { Package } from "@/data/freefirePackages";
import { SelectedPackage } from "@/types/product";
import { PackageCard } from "./PackageCard";

interface GenericPackageSelectorProps {
  selectedPackages: Map<string, SelectedPackage>;
  onSelectPackage: (pkg: Package) => void;
  onIncreaseQuantity: (pkgId: string) => void;
  packages: Package[];
}

export const GenericPackageSelector = ({ 
  selectedPackages, 
  onSelectPackage, 
  onIncreaseQuantity,
  packages 
}: GenericPackageSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {packages.map((pkg) => {
          const selected = selectedPackages.get(pkg.id);
          return (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isSelected={!!selected}
              selectedQuantity={selected?.selectedQuantity || 0}
              onSelect={() => onSelectPackage(pkg)}
              onIncreaseQuantity={() => onIncreaseQuantity(pkg.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
