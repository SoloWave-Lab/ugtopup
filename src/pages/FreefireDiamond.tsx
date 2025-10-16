import { useState } from "react";
import { ProductHeader } from "@/components/freefire/ProductHeader";
import { UserInputForm, UserFormData } from "@/components/freefire/UserInputForm";
import { PackageSelector } from "@/components/freefire/PackageSelector";
import { OrderReview } from "@/components/freefire/OrderReview";
import { SuccessModal } from "@/components/freefire/SuccessModal";
import { Package } from "@/data/freefirePackages";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import productImage from "@/assets/product-freefire.jpg";
import { Loader2 } from "lucide-react";

const FreefireDiamond = () => {
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormDataChange = (data: UserFormData) => {
    setFormData(data);
    setIsFormValid(data.uid.length >= 6 && /^\d+$/.test(data.uid));
  };

  const handleReviewOrder = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!isFormValid) {
      toast({
        title: "Invalid UID",
        description: "Please enter a valid UID (minimum 6 digits)",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPackage) {
      toast({
        title: "No Package Selected",
        description: "Please select a diamond package",
        variant: "destructive",
      });
      return;
    }

    const newOrderId = `FF-${Date.now()}`;
    setOrderId(newOrderId);
    setIsReviewOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!user || !selectedPackage || !formData) return;

    // Check sufficient balance
    if ((user.balance || 0) < selectedPackage.price) {
      toast({
        title: "Insufficient Credits",
        description: "Please add credits to your account",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create order object
      const order = {
        orderId,
        product: "Free Fire Diamond",
        package: selectedPackage.name,
        quantity: selectedPackage.quantity,
        price: selectedPackage.price,
        currency: selectedPackage.currency,
        uid: formData.uid,
        username: formData.username || "Not provided",
        zoneId: formData.zoneId || "Not provided",
        paymentMethod: "Credit",
        email: user.email,
        timestamp: new Date().toISOString(),
        status: "completed",
      };

      // Store order in localStorage (temporary - will integrate with backend later)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

      // Deduct credits from user balance
      const updatedUser = {
        ...user,
        balance: (user.balance || 0) - selectedPackage.price,
        orders: (user.orders || 0) + 1,
      };
      localStorage.setItem('tempUser', JSON.stringify(updatedUser));

      // Update user context (trigger re-render)
      window.dispatchEvent(new Event('storage'));

      // Close review, show success
      setIsReviewOpen(false);
      setIsSuccessOpen(true);

      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed`,
        className: "bg-dashboard-green/20 border-dashboard-green-bright",
      });
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
    setSelectedPackage(null);
    setFormData(null);
    setIsFormValid(false);
    setIsSuccessOpen(false);
  };

  const canReviewOrder = isFormValid && selectedPackage !== null;

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-8">
      <ProductHeader 
        productTitle="Free Fire Diamond"
        productIcon="🔥"
        productSubtitle="Top-Up Center"
      />

      {/* Product Info Section */}
      <section className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg bg-card border border-border max-w-4xl mx-auto">
          <img 
            src={productImage} 
            alt="Free Fire Diamond"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              Free Fire Diamond
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Official Top-Up • Fast Delivery • Secure Payment
            </p>
            {user && (
              <div className="flex sm:hidden items-center gap-2 mt-2 px-3 py-1.5 rounded-md bg-background border border-border w-fit">
                <span className="text-xs text-muted-foreground">Credits:</span>
                <span className="text-sm font-bold text-primary">{user.balance || 0}💵</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl animate-fade-in">
        {/* User Input Section */}
        <section>
          <UserInputForm
            onDataChange={handleFormDataChange}
            initialData={formData || undefined}
          />
        </section>

        {/* Package Selection Section */}
        <section>
          <PackageSelector
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
          />
        </section>
      </main>

      {/* Review Order Button - Fixed Sticky on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="container mx-auto max-w-4xl">
          {/* Progress Indicators */}
          <div className="flex gap-2 justify-center mb-3">
            <div className={`w-2 h-2 rounded-full transition-colors ${isFormValid ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${selectedPackage ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${canReviewOrder ? "bg-primary" : "bg-muted"}`} />
          </div>
          
          <Button
            onClick={handleReviewOrder}
            disabled={!canReviewOrder}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 active:scale-95 transition-all glow-border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isFormValid
              ? "Enter UID to Continue"
              : !selectedPackage
              ? "Select a Package"
              : `Review Order - ${selectedPackage.price}💵`}
          </Button>
        </div>
      </div>

      {/* Order Review Modal */}
      <OrderReview
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handleConfirmPurchase}
        selectedPackage={selectedPackage}
        formData={formData}
        orderId={orderId}
        isSubmitting={isSubmitting}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderId={orderId}
        onTopUpAgain={handleTopUpAgain}
      />
    </div>
  );
};

export default FreefireDiamond;
