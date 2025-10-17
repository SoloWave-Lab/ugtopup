import GenericProductPage from "@/components/product/GenericProductPage";
import { chatgptConfig } from "@/config/products";

export default function ChatGPTSubscription() {
  return <GenericProductPage config={chatgptConfig} />;
}
