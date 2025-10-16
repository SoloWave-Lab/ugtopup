import { Package } from "@/data/freefirePackages";
import { UserFormData } from "./UserInputForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, Loader2 } from "lucide-react";

interface OrderReviewProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPackage: Package | null;
  formData: UserFormData | null;
  orderId: string;
  isSubmitting?: boolean;
}

export const OrderReview = ({
  isOpen,
  onClose,
  onConfirm,
  selectedPackage,
  formData,
  orderId,
  isSubmitting = false,
}: OrderReviewProps) => {
  const { user } = useAuth();

  if (!selectedPackage || !formData) return null;

  const hasInsufficientBalance = (user?.balance || 0) < selectedPackage.price;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-card border-primary/20 max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
            Review Your Order
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Please verify your order details before confirming
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-border space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-xs sm:text-sm text-muted-foreground">Order ID</span>
              <span className="text-xs sm:text-sm font-mono text-foreground break-all">{orderId}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-xs sm:text-sm text-muted-foreground">Package</span>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-foreground">{selectedPackage.name}</p>
                <p className="text-xs text-muted-foreground">{selectedPackage.quantity} 💎</p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-xs sm:text-sm text-muted-foreground">In-Game UID</span>
              <span className="text-xs sm:text-sm font-mono text-foreground">{formData.uid}</span>
            </div>

            {formData.username && (
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-xs sm:text-sm text-muted-foreground">Username</span>
                <span className="text-xs sm:text-sm text-foreground truncate">{formData.username}</span>
              </div>
            )}

            {formData.zoneId && (
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-xs sm:text-sm text-muted-foreground">Zone ID</span>
                <span className="text-xs sm:text-sm font-mono text-foreground">{formData.zoneId}</span>
              </div>
            )}

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-xs sm:text-sm text-muted-foreground">Payment Method</span>
              <span className="text-xs sm:text-sm text-foreground">Credit Balance</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-xs sm:text-sm text-muted-foreground">Email</span>
              <span className="text-xs sm:text-sm text-foreground break-all">{user?.email}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-sm sm:text-base font-semibold text-foreground">Total Amount</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {selectedPackage.price}{selectedPackage.currency}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Current Balance</span>
              <span className="text-foreground">{user?.balance || 0}💵</span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">After Purchase</span>
              <span className={
                (user?.balance || 0) - selectedPackage.price >= 0 
                  ? "text-dashboard-green-bright" 
                  : "text-destructive"
              }>
                {(user?.balance || 0) - selectedPackage.price}💵
              </span>
            </div>
          </div>

          {hasInsufficientBalance && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm text-destructive">
                <p className="text-xs sm:text-sm">⚠️ Insufficient credits. Please add credits to your account.</p>
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            className="w-full sm:w-auto h-11 sm:h-10 bg-muted hover:bg-muted/80"
            disabled={isSubmitting}
          >
            Edit Order
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={hasInsufficientBalance || isSubmitting}
            className="w-full sm:w-auto h-11 sm:h-10 bg-gradient-to-r from-primary to-secondary hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Purchase"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
