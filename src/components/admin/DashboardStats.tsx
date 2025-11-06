import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardStats, refreshDashboardStats, DashboardStats as StatsType } from "@/lib/adminApi";
import { Users, CreditCard, ShoppingCart, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DashboardStats = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshDashboardStats();
      await loadStats();
      toast.success("Statistics refreshed successfully");
    } catch (error) {
      console.error("Error refreshing stats:", error);
      toast.error("Failed to refresh statistics");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-20 bg-muted/50" />
            <CardContent className="h-16 bg-muted/30" />
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
          <p className="text-muted-foreground">Failed to load statistics</p>
          <Button onClick={loadStats} variant="outline" className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users.toLocaleString(),
      subtitle: `+${stats.new_users_last_month} this month`,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Orders",
      value: stats.total_orders.toLocaleString(),
      subtitle: `${stats.pending_orders} pending`,
      icon: ShoppingCart,
      color: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.total_revenue.toLocaleString()}`,
      subtitle: `From ${stats.confirmed_orders} orders`,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Credits Added",
      value: stats.total_credits_added.toLocaleString(),
      subtitle: `${stats.pending_payment_requests} pending requests`,
      icon: CreditCard,
      color: "text-orange-500",
    },
    {
      title: "Pending Orders",
      value: stats.pending_orders.toLocaleString(),
      subtitle: "Awaiting confirmation",
      icon: ShoppingCart,
      color: "text-yellow-500",
    },
    {
      title: "Confirmed Orders",
      value: stats.confirmed_orders.toLocaleString(),
      subtitle: "Successfully processed",
      icon: ShoppingCart,
      color: "text-green-500",
    },
    {
      title: "Credits Spent",
      value: stats.total_credits_spent.toLocaleString(),
      subtitle: "Total deducted",
      icon: CreditCard,
      color: "text-red-500",
    },
    {
      title: "Balance Remaining",
      value: stats.total_balance_remaining.toLocaleString(),
      subtitle: "User balances",
      icon: CreditCard,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(stats.last_updated).toLocaleString()}
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
