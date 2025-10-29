import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GarenaProductHeader } from "@/components/garena/GarenaProductHeader";
import { GarenaUserInputForm, GarenaFormData } from "@/components/garena/GarenaUserInputForm";
import { GarenaPackageSelector } from "@/components/garena/GarenaPackageSelector";
import { GarenaOrderReview } from "@/components/garena/GarenaOrderReview";
import { GarenaSuccessModal } from "@/components/garena/GarenaSuccessModal";
import { GarenaPackage } from "@/data/garenaPackages";
import { Button } from "@/components/ui/button";

const GarenaShell = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<GarenaFormData | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<GarenaPackage | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleFormDataChange = (data: GarenaFormData | null, isValid: boolean) => {
    setFormData(data);
    setIsFormValid(isValid && !!data?.email);
  };

  const generateShortOrderId = (): string => {
    const lastOrderId = localStorage.getItem("lastOrderId");
    const nextId = lastOrderId ? parseInt(lastOrderId) + 1 : 1;
    localStorage.setItem("lastOrderId", nextId.toString());
    return `ORD-${nextId.toString().padStart(3, "0")}`;
  };

  const handleReviewOrder = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to make a purchase",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!formData || !formData.email) {
      toast({
        title: "Please enter your details",
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPackage) {
      toast({
        title: "Please select a package",
        description: "Choose a Garena Shell package to continue",
        variant: "destructive",
      });
      return;
    }

    const newOrderId = generateShortOrderId();
    setOrderId(newOrderId);
    setIsReviewOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPackage || !profile || !formData) return;

    const currentBalance = profile.balance || 0;
    const totalPrice = selectedPackage.price;

    if (currentBalance < totalPrice) {
      toast({
        title: "Insufficient Balance",
        description: "Please add credits to your account",
        variant: "destructive",
      });
      return;
    }

    const newBalance = currentBalance - totalPrice;

    try {
      await updateProfile({ balance: newBalance });

      const order = {
        id: orderId,
        product: "Garena Shell",
        package: selectedPackage.name,
        quantity: selectedPackage.quantity,
        price: totalPrice,
        email: formData.email,
        whatsapp: formData.whatsapp || "",
        userEmail: user?.email,
        date: new Date().toISOString(),
        status: "Processing",
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]));

      setIsReviewOpen(false);
      setIsSuccessOpen(true);

      toast({
        title: "Purchase Successful!",
        description: `Your order ${orderId} has been placed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTopUpAgain = () => {
    setIsSuccessOpen(false);
    setFormData(null);
    setSelectedPackage(null);
    setIsFormValid(false);
  };

  const canReviewOrder = isFormValid && selectedPackage;

  return (
    <div className="min-h-screen bg-background">
      <GarenaProductHeader />
      
      <main className="container mx-auto px-4 py-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
          <GarenaUserInputForm 
            onDataChange={handleFormDataChange}
            initialData={formData || undefined}
          />

          <GarenaPackageSelector
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
          />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border/40 z-40">
        <div className="container mx-auto max-w-4xl">
          <Button
            onClick={handleReviewOrder}
            disabled={!canReviewOrder}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary via-red-600 to-secondary hover:opacity-90 hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] transition-all duration-300 disabled:opacity-40"
          >
            {!isFormValid
              ? "Enter Your Email"
              : !selectedPackage
              ? "Select a Voucher Package"
              : `Buy Now - ₹${selectedPackage.price.toLocaleString()}`}
          </Button>
        </div>
      </div>

      <GarenaOrderReview
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handleConfirmPurchase}
        selectedPackage={selectedPackage}
        formData={formData}
        orderId={orderId}
      />

      <GarenaSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderId={orderId}
        onTopUpAgain={handleTopUpAgain}
      />
    </div>
  );
};

export default GarenaShell;
