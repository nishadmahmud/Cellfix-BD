import Hero from "../components/Hero/Hero";
import TrustStats from "../components/TrustStats/TrustStats";
import RepairServices from "../components/RepairServices/RepairServices";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ShopCategories from "../components/ShopCategories/ShopCategories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import DiscountedParts from "../components/DiscountedParts/DiscountedParts";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <RepairServices />

      <ShopCategories />
      <DiscountedParts />
      <FeaturedProducts />
      <HowItWorks />
    </>
  );
}
