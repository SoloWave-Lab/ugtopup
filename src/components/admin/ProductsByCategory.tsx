import { useState, useEffect } from "react";
import { fetchAllProducts, Product } from "@/lib/productApi";
import { supabase } from "@/integrations/supabase/client";
import { ProductsList } from "./ProductsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductsByCategoryProps {
  category: string;
}

const categoryNames: Record<string, { name: string; emoji: string }> = {
  freefire: { name: "Free Fire", emoji: "🔥" },
  mobile_legends: { name: "Mobile Legends", emoji: "🎮" },
  roblox: { name: "Roblox", emoji: "🎨" },
  tiktok: { name: "TikTok", emoji: "🎵" },
  netflix: { name: "Netflix", emoji: "🎬" },
  design: { name: "Design Services", emoji: "✨" },
};

export const ProductsByCategory = ({ category }: ProductsByCategoryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts({ category });
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`products-category-${category}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
          filter: `category=eq.${category}`,
        },
        () => {
          loadProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category]);

  const categoryInfo = categoryNames[category] || { name: category, emoji: "📦" };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="text-3xl">{categoryInfo.emoji}</span>
            <span>{categoryInfo.name} Products</span>
            <Badge variant="secondary" className="ml-auto">
              {products.length} {products.length === 1 ? "product" : "products"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage all {categoryInfo.name.toLowerCase()} products in one place
          </CardDescription>
        </CardHeader>
      </Card>

      <ProductsList initialCategory={category} />
    </div>
  );
};
