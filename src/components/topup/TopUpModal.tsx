import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import qrCode from "@/assets/ug-gaming-topup-qr.jpg";

interface TopUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const TopUpModal = ({ open, onOpenChange, onSuccess }: TopUpModalProps) => {
  const { user, profile } = useAuth();
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        toast.error("Only PNG and JPG files are allowed");
        return;
      }
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'ug-gaming-payment-qr.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 1) {
      toast.error("Please enter a valid amount (minimum Rs.1)");
      return;
    }
    
    if (!screenshot) {
      toast.error("Please upload a payment screenshot");
      return;
    }

    if (!user || !profile) {
      toast.error("Please log in to submit a request");
      return;
    }

    setLoading(true);

    try {
      // Upload screenshot to storage
      const fileExt = screenshot.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, screenshot);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(fileName);

      // Call edge function to submit request
      const { data, error } = await supabase.functions.invoke('submit-credit-request', {
        body: {
          amount: parseFloat(amount),
          screenshot_url: publicUrl,
          user_name: profile.full_name || profile.username || 'User',
          user_email: profile.email,
          remarks: remarks || undefined
        }
      });

      if (error) throw error;

      toast.success("Credit request submitted successfully! Status: Pending");
      
      // Reset form
      setAmount("");
      setScreenshot(null);
      setRemarks("");
      setPreviewUrl(null);
      
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || "Failed to submit credit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="topup-modal-content max-w-[500px] bg-gradient-to-b from-card to-card/95 border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Credit Top-Up Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* QR Code Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Scan to Pay
            </Label>
            <div className="topup-qr-container">
              <img 
                src={qrCode} 
                alt="Payment QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleDownloadQR}
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
            <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              Add your Name <span className="font-semibold text-foreground">(G_D Gaming PC)</span> on the remarks registered on the website of payment
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Credits to Top-Up
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-background/50 border-border focus:border-primary"
            />
            <p className="text-xs text-muted-foreground">
              Rs.1 = 1 Credit
            </p>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-2">
            <Label htmlFor="screenshot" className="text-sm font-medium">
              Payment Screenshot
            </Label>
            <div className="topup-file-upload p-4 text-center cursor-pointer">
              <input
                id="screenshot"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label htmlFor="screenshot" className="cursor-pointer block">
                {previewUrl ? (
                  <div className="space-y-2">
                    <img src={previewUrl} alt="Preview" className="max-h-32 mx-auto rounded" />
                    <p className="text-xs text-muted-foreground">
                      {screenshot?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG or JPG (max 2MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-sm font-medium">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="remarks"
              placeholder="Any additional information..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="bg-background/50 border-border focus:border-primary min-h-20"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 topup-submit-button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Top-Up"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
