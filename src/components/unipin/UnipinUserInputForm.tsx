import { useState, useEffect } from "react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().optional().refine(
    (val) => !val || /^\+?[1-9]\d{9,14}$/.test(val.replace(/\s/g, '')),
    { message: "Invalid WhatsApp number" }
  ),
});

export type UnipinFormData = z.infer<typeof formSchema>;

interface UnipinUserInputFormProps {
  onDataChange: (data: UnipinFormData | null, isValid: boolean) => void;
  initialData?: Partial<UnipinFormData>;
}

export const UnipinUserInputForm = ({ onDataChange, initialData }: UnipinUserInputFormProps) => {
  const [email, setEmail] = useState(initialData?.email || "");
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const formData = { email, whatsapp };
    const result = formSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      onDataChange(result.data, true);
    } else {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      onDataChange(null, false);
    }
  }, [email, whatsapp, onDataChange]);

  return (
    <Card className="p-6 glass-card border-border/50">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
          1
        </span>
        Enter Details
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={`bg-background/50 border-border/50 focus:border-primary ${
              errors.email ? "border-destructive" : ""
            }`}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
            WhatsApp Number <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            className={`bg-background/50 border-border/50 focus:border-primary ${
              errors.whatsapp ? "border-destructive" : ""
            }`}
          />
          {errors.whatsapp && (
            <p className="text-xs text-destructive">{errors.whatsapp}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
