import GenericProductPage from "@/components/product/GenericProductPage";
import { bannerDesignConfig } from "@/config/products";

export default function BannerDesign() {
  return <GenericProductPage config={bannerDesignConfig} />;
}
