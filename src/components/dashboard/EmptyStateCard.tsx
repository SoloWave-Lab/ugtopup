import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface EmptyStateCardProps {
  title: string;
  total: number;
  icon: ReactNode;
  emptyTitle: string;
  emptySubtitle: string;
}

export const EmptyStateCard = ({ 
  title, 
  total, 
  icon, 
  emptyTitle, 
  emptySubtitle 
}: EmptyStateCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <span className="text-sm text-muted-foreground">{total} total</span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center dashboard-glow-green">
            {icon}
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-foreground">
              {emptyTitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {emptySubtitle}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
