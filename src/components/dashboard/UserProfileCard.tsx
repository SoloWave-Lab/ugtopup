import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileCardProps {
  username: string;
  email: string;
}

export const UserProfileCard = ({ username, email }: UserProfileCardProps) => {
  const firstLetter = username.charAt(0).toUpperCase();
  
  return (
    <Card className="bg-card border-border dashboard-card-hover">
      <CardContent className="flex flex-col items-center justify-center py-8 px-6">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-400 text-white text-2xl font-bold">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {username}
        </h3>
        <p className="text-sm text-muted-foreground">
          {email}
        </p>
      </CardContent>
    </Card>
  );
};
