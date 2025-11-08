import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PubgFormData {
  pubgId: string;
  username: string;
  whatsapp?: string;
}

interface PubgUserInputFormProps {
  onDataChange: (data: PubgFormData) => void;
  initialData?: PubgFormData;
}

export const PubgUserInputForm = ({ onDataChange, initialData }: PubgUserInputFormProps) => {
  const [pubgId, setPubgId] = useState(initialData?.pubgId || "");
  const [username, setUsername] = useState(initialData?.username || "");
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || "");
  const [errors, setErrors] = useState({ pubgId: "", username: "" });

  useEffect(() => {
    const newErrors = {
      pubgId: pubgId && pubgId.length < 6 ? "PUBG ID must be at least 6 digits" : "",
      username: username && username.length < 3 ? "Username must be at least 3 characters" : "",
    };
    setErrors(newErrors);

    onDataChange({ pubgId, username, whatsapp });
  }, [pubgId, username, whatsapp]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Enter Your Details</CardTitle>
        <CardDescription>Please provide your PUBG Mobile account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pubgId" className="text-base font-medium">
            PUBG ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="pubgId"
            type="text"
            placeholder="Enter your PUBG Mobile ID"
            value={pubgId}
            onChange={(e) => setPubgId(e.target.value)}
            className={`h-12 text-base ${errors.pubgId ? "border-destructive" : ""}`}
          />
          {errors.pubgId && (
            <p className="text-sm text-destructive">{errors.pubgId}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-base font-medium">
            PUBG Username <span className="text-destructive">*</span>
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your in-game username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`h-12 text-base ${errors.username ? "border-destructive" : ""}`}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-base font-medium">
            WhatsApp Number <span className="text-muted-foreground text-sm">(Optional)</span>
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="Enter your WhatsApp number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="h-12 text-base"
          />
        </div>
      </CardContent>
    </Card>
  );
};
