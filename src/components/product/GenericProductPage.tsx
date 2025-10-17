import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductHeader } from "@/components/freefire/ProductHeader";
import { GenericUserInputForm } from "@/components/freefire/GenericUserInputForm";
import { GenericPackageSelector } from "@/components/freefire/GenericPackageSelector";
import { OrderReview } from "@/components/freefire/OrderReview";
import { SuccessModal } from "@/components/freefire/SuccessModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { generateShortOrderId } from "@/utils/orderGenerator";
import { ProductConfig, SelectedPackage } from "@/types/product";
import { Package } from "@/data/freefirePackages";

interface GenericProductPageProps {
  config: ProductConfig;
}

export default function GenericProductPage({ config }: GenericProductPageProps) {
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<Map<string, SelectedPackage>>(new Map());
  const [showReview, setShowReview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, updateBalance } = useAuth();
  const { toast } = useToast();

  const handleFormChange = (data: Record<string, any>) => {
    setFormData(data);
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackages(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(pkg.id);
      
      if (existing) {
        newMap.set(pkg.id, { ...pkg, selectedQuantity: existing.selectedQuantity + 1 });
      } else {
        newMap.set(pkg.id, { ...pkg, selectedQuantity: 1 });
      }
      
      return newMap;
    });
  };

  const handleIncreaseQuantity = (pkgId: string) => {
    setSelectedPackages(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(pkgId);
      
      if (existing) {
        newMap.set(pkgId, { ...existing, selectedQuantity: existing.selectedQuantity + 1 });
      }
      
      return newMap;
    });
  };

  const handleDecreaseQuantity = (pkgId: string) => {
    setSelectedPackages(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(pkgId);
      
      if (existing && existing.selectedQuantity > 1) {
        newMap.set(pkgId, { ...existing, selectedQuantity: existing.selectedQuantity - 1 });
      } else {
        newMap.delete(pkgId);
      }
      
      return newMap;
    });
  };

  const calculateTotal = (): number => {
    return Array.from(selectedPackages.values())
      .reduce((total, pkg) => total + (pkg.price * pkg.selectedQuantity), 0);
  };

  const handleReviewOrder = () => {
    if (!formData) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedPackages.size === 0) {
      toast({
        title: "No Package Selected",
        description: "Please select at least one package",
        variant: "destructive",
      });
      return;
    }

    const newOrderId = generateShortOrderId(config.orderPrefix);
    setOrderId(newOrderId);
    setShowReview(true);
  };

  const handleConfirmPurchase = async () => {
    if (!user) return;

    const totalAmount = calculateTotal();
    
    if (user.balance < totalAmount) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${config.priceSymbol}${totalAmount} but only have ${config.priceSymbol}${user.balance}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateBalance(user.balance - totalAmount);
      
      toast({
        title: "✅ Order Confirmed!",
        description: `Order ${orderId} has been placed successfully`,
        className: "bg-dashboard-green/20 border-dashboard-green-bright",
      });
      
      setShowReview(false);
      setShowSuccess(true);
      
      setFormData(null);
      setSelectedPackages(new Map());
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTopUpAgain = () => {
    setShowSuccess(false);
    setOrderId("");
  };

  const isFormValid = formData !== null;
  const hasSelectedPackages = selectedPackages.size > 0;
  const totalAmount = calculateTotal();

  // Convert selectedPackages to array for compatibility with existing components
  const selectedPackageForReview = selectedPackages.size > 0 
    ? Array.from(selectedPackages.values())[0] 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <ProductHeader 
        productTitle={config.title}
        productIcon={config.icon}
        productSubtitle={config.subtitle}
        productImage={config.image}
      />

      <main className="flex-1 pb-32">
        {/* Product Info Section */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <img 
              src={config.image} 
              alt={config.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {config.title}
              </h2>
              <p className="text-sm text-muted-foreground font-normal">
                {config.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* User Input Section */}
        <section className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 tracking-tight">
              Enter Details
            </h3>
            <GenericUserInputForm 
              onDataChange={handleFormChange}
              initialData={formData || {}}
              fields={config.fields}
            />
          </div>
        </section>

        {/* Package Selection Section */}
        <section className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 tracking-tight">
              Select Package
            </h3>
            <GenericPackageSelector 
              selectedPackages={selectedPackages}
              onSelectPackage={handlePackageSelect}
              onIncreaseQuantity={handleIncreaseQuantity}
              packages={config.packages}
            />
          </div>
        </section>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="container mx-auto max-w-3xl">
          {/* Progress Indicators */}
          <div className="flex gap-2 justify-center mb-3">
            <div className={`w-2 h-2 rounded-full transition-all ${isFormValid ? 'bg-primary' : 'bg-border'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${hasSelectedPackages ? 'bg-primary' : 'bg-border'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${showSuccess ? 'bg-primary' : 'bg-border'}`} />
          </div>
          
          <Button 
            onClick={handleReviewOrder}
            disabled={!isFormValid || !hasSelectedPackages}
            size="lg"
            className="w-full h-14 text-base font-semibold tracking-wide bg-gradient-to-r from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500"
          >
            {!isFormValid 
              ? "Enter Details to Continue"
              : !hasSelectedPackages
              ? "Select a Package"
              : `Review Order - ${config.priceSymbol}${totalAmount}`
            }
          </Button>
        </div>
      </div>

      {/* Order Review Modal */}
      <OrderReview
        isOpen={showReview}
        onClose={() => setShowReview(false)}
        onConfirm={handleConfirmPurchase}
        selectedPackage={selectedPackageForReview}
        formData={formData}
        orderId={orderId}
        isSubmitting={isSubmitting}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        orderId={orderId}
        onTopUpAgain={handleTopUpAgain}
      />

      <Footer />
    </div>
  );
}
