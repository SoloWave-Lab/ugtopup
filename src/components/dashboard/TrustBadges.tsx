import { CheckCircle2, Shield, Star } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: CheckCircle2,
      text: "Verified Account"
    },
    {
      icon: Shield,
      text: "Secure Payment"
    },
    {
      icon: Star,
      text: "Trusted Seller"
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 py-8">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div 
            key={index} 
            className="flex items-center gap-2 text-green-500 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
};
