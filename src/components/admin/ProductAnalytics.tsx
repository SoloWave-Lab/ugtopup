import { useEffect, useState } from "react";
import { getProductAnalytics, ProductAnalytics as Analytics } from "@/lib/productApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

export const ProductAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getProductAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics) return null;

  const stats = [
    {
      title: "Total Products",
      value: analytics.totalProducts,
      icon: Package,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Top Selling",
      value: analytics.topSelling,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      isText: true,
    },
    {
      title: "Average Price",
      value: `₹${analytics.averagePrice.toFixed(0)}`,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
      isText: true,
    },
    {
      title: "Out of Stock",
      value: analytics.outOfStock,
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
