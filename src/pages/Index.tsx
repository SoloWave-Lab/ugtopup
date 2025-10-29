import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { BestDeals } from "@/components/BestDeals";
import { ProductTabs } from "@/components/ProductTabs";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-8 pb-4">
          <HeroBanner />
        </section>

        {/* Best Deals Banner */}
        <BestDeals />

        {/* Product Tabs */}
        <ProductTabs />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonials */}
        <Testimonials />
      </main>

      <Footer />

    </div>
  );
};

export default Index;
