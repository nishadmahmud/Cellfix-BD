import ShopCategories from "../../components/ShopCategories/ShopCategories";
import { getCategoriesFromServer, getBestDealsFromServer } from "../../lib/api";

export const metadata = {
  title: "All Categories | CellfixBD",
  description: "Browse all gadget categories at CellfixBD. Smartphones, Tablets, Accessories and more.",
};

export default async function CategoryListingPage() {
  let categories = [];
  let flashSaleProducts = [];

  try {
    const [catRes, dealsRes] = await Promise.all([
      getCategoriesFromServer(),
      getBestDealsFromServer()
    ]);

    if (catRes?.success) {
      categories = catRes.data;
    }

    if (dealsRes?.success) {
      flashSaleProducts = dealsRes.data?.data || dealsRes.data || [];
    }
  } catch (error) {
    console.error("Error fetching categories for listing page:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Category Banner/Header */}
      <div className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Our <span className="text-brand-orange">Collections</span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg font-medium">
            Explore our wide range of premium gadgets and accessories perfectly curated for your needs.
          </p>
        </div>
      </div>

      <ShopCategories 
        categories={categories} 
        flashSaleProducts={flashSaleProducts} 
        hideTitle={true}
      />
    </main>
  );
}
