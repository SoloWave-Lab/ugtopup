import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatisticsCardProps {
  topUps: number;
  orders: number;
  pendingTopUps: number;
  pendingOrders: number;
}

export const StatisticsCard = ({ 
  topUps, 
  orders, 
  pendingTopUps, 
  pendingOrders 
}: StatisticsCardProps) => {
  return (
    <Card className="bg-card border-border dashboard-card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold">Statistics</CardTitle>
        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Top-Ups
            </p>
            <p className="text-3xl font-bold text-foreground">
              {topUps}
            </p>
            <Badge 
              variant="outline" 
              className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/10"
            >
              {pendingTopUps} pending
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Orders
            </p>
            <p className="text-3xl font-bold text-foreground">
              {orders}
            </p>
            <Badge 
              variant="outline" 
              className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/10"
            >
              {pendingOrders} pending
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
