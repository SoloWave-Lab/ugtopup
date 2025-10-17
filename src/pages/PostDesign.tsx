import GenericProductPage from "@/components/product/GenericProductPage";
import { postDesignConfig } from "@/config/products";

export default function PostDesign() {
  return <GenericProductPage config={postDesignConfig} />;
}
