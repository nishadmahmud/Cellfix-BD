import Hero from "../components/Hero/Hero";
import TrustStats from "../components/TrustStats/TrustStats";
import RepairServices from "../components/RepairServices/RepairServices";
import RepairPricing from "../components/RepairPricing/RepairPricing";
import HowItWorks from "../components/HowItWorks/HowItWorks";
// import ShopCategories from "../components/ShopCategories/ShopCategories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import DiscountedParts from "../components/DiscountedParts/DiscountedParts";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import BestDeals from "../components/BestDeals/BestDeals";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import BlogTips from "../components/BlogTips/BlogTips";
import CTABanner from "../components/CTABanner/CTABanner";

import {
  getSlidersFromServer,
  getCategoriesFromServer,
  getNewArrivalsFromServer,
  getBestSellersFromServer,
  getBestDealsFromServer,
  getBlogs,
  getBannerFromServer
} from "../lib/api";

export default async function Home() {
  let categories = [];
  let newArrivals = [];
  let heroSlides = [];
  let homeBanners = [];
  let bestDealsCards = [];
  let flashSaleProducts = [];
  let featuredProducts = [];
  let blogPosts = [];
  let discountedProductsByBrand = {};

  const toMoney = (v) => `৳ ${Number(v || 0).toLocaleString("en-IN")}`;
  const normalizeDiscount = (discount, type) => {
    const d = Number(discount || 0);
    if (!d || d <= 0) return null;
    return String(type).toLowerCase() === "percentage"
      ? `-${d}%`
      : `৳ ${d.toLocaleString("en-IN")}`;
  };

  // Fetch all data
  try {
    const [
      catRes, sliderRes, arrivalRes, sellerRes, dealsRes, blogRes, bannerRes
    ] = await Promise.all([
      getCategoriesFromServer({ noStore: true }).catch(() => null),
      getSlidersFromServer().catch(() => null),
      getNewArrivalsFromServer().catch(() => null),
      getBestSellersFromServer().catch(() => null),
      getBestDealsFromServer().catch(() => null),
      getBlogs().catch(() => null),
      getBannerFromServer().catch(() => null)
    ]);

    if (catRes?.success && catRes?.data) categories = catRes.data;

    if (bannerRes?.success && Array.isArray(bannerRes?.banners)) {
      homeBanners = bannerRes.banners.map(b => ({
        id: b.id,
        image: b.image_path,
        link: b.button_url || "/"
      }));
    }

    if (sliderRes?.success && Array.isArray(sliderRes?.sliders) && sliderRes.sliders.length > 0) {
      heroSlides = sliderRes.sliders
        .filter((s) => s?.status === 1 && s?.image_path)
        .map((s, idx) => ({
          id: s.id ?? idx,
          image: s.image_path,
        }));
    }

    if (arrivalRes?.success && Array.isArray(arrivalRes?.data?.data)) {
      newArrivals = arrivalRes.data.data.slice(0, 10).map(p => {
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';
        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        return {
          id: p.id,
          name: p.name,
          brand: p.brands?.name || "Others",
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl: p.image_path || "/no-image.svg",
        };
      });
    }

    if (sellerRes?.success) {
      const items = sellerRes.data?.data || sellerRes.data;
      if (Array.isArray(items)) {
        featuredProducts = items.map(p => {
          const discountValue = Number(p.discount || 0);
          const discountType = p.discount_type;
          const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';
          const originalPrice = Number(p.retails_price || 0);
          const discountedPrice = hasDiscount
            ? (String(discountType).toLowerCase() === 'percentage'
              ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
              : Math.max(0, originalPrice - discountValue))
            : originalPrice;

          return {
            id: p.id,
            name: p.name,
            price: toMoney(discountedPrice),
            oldPrice: hasDiscount ? toMoney(originalPrice) : null,
            discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
            imageUrl: p.image_path || "/no-image.svg",
          };
        });
      }
    }

    if (dealsRes?.success && Array.isArray(dealsRes?.data)) {
      const items = dealsRes.data.sort((a, b) => Number(b.retails_price || 0) - Number(a.retails_price || 0));
      bestDealsCards = items.slice(0, 2).map((p, idx) => {
        const originalPrice = Number(p.retails_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';
        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;
        const savingsValue = Math.max(0, originalPrice - discountedPrice);

        return {
          id: p.id,
          title: p.name,
          description: p.brands?.name || "Limited time offer.",
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          savings: savingsValue > 0 ? `Save ৳ ${savingsValue.toLocaleString("en-IN")}` : null,
          imageUrl: p.image_path || "/no-image.svg",
          badge: hasDiscount ? (String(discountType).toLowerCase() === 'percentage' ? `-${discountValue}%` : `Save ৳${discountValue}`) : (idx === 0 ? "BEST DEAL" : "HOT DEAL"),

          link: `/product/${p.name?.toLowerCase().replace(/\s+/g, "-")}-${p.id}`,
        };
      });

      flashSaleProducts = items.filter(p => p.image_path).slice(0, 10).map(p => {
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';
        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        return {
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl: p.image_path || "/no-image.svg",
        };
      });

      // Group for DiscountedParts component
      items.forEach(p => {
        const brandName = p.brands?.name || "Others";
        if (!discountedProductsByBrand[brandName]) {
          discountedProductsByBrand[brandName] = [];
        }

        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';
        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        discountedProductsByBrand[brandName].push({
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl: p.image_path || "/no-image.svg",
        });
      });
    }

    if (blogRes?.success && Array.isArray(blogRes?.data)) {
      blogPosts = blogRes.data.slice(0, 3).map(b => ({
        id: b.id,
        title: b.title,
        excerpt: b.content ? b.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : 'Read our latest insights...',
        date: new Date(b.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        category: b.category_id || 'Tech News',
        readTime: '5 min read',
        image: b.image || "/images/blog-fallback.jpg",
        slug: b.title ? b.title.toLowerCase().replace(/\s+/g, '-') : String(b.id)
      }));
    }

  } catch (err) {
    console.error("Critical error in home page data fetching:", err);
  }

  return (
    <>
      <Hero slides={heroSlides} banners={homeBanners} />
      <TrustStats />
      {/* <ShopCategories categories={categories} flashSaleProducts={flashSaleProducts} /> */}
      <RepairServices categories={categories} />
      <RepairPricing />

      <NewArrivals products={newArrivals} />
      <DiscountedParts products={discountedProductsByBrand} />
      <FeaturedProducts products={featuredProducts} />
      <BestDeals deals={bestDealsCards} />

      <HowItWorks />
      <Testimonials />
      <FAQ />
      <BlogTips posts={blogPosts} />
      <CTABanner />
    </>
  );
}
