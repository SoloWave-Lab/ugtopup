import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PubgSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onTopUpAgain: () => void;
}

export const PubgSuccessModal = ({
  isOpen,
  onClose,
  orderId,
  onTopUpAgain,
}: PubgSuccessModalProps) => {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate("/dashboard");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative">
              <CheckCircle2 className="w-20 h-20 text-green-500 animate-scale-in" />
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-foreground">
              Order Placed Successfully!
            </DialogTitle>
          </div>
          <DialogDescription className="text-center space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Your Order ID</p>
              <p className="font-mono font-bold text-lg text-primary">{orderId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Your order has been received and is pending admin confirmation. 
              You'll receive your UC after admin approval.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onTopUpAgain}
            className="w-full hover:bg-muted"
          >
            Top-Up Again
          </Button>
          <Button
            onClick={handleViewOrders}
            className="w-full bg-gradient-to-r from-primary via-red-600 to-secondary hover:opacity-90"
          >
            View My Orders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
