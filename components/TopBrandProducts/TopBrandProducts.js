"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../Shared/ProductCard";
import { getTopBrands, getBrandwiseProducts } from "../../lib/api";

function mapProduct(p) {
  const originalPrice = Number(p.retails_price || 0);
  const discountValue = Number(p.discount || 0);
  const discountType = String(p.discount_type || "").toLowerCase();
  const hasDiscount = discountValue > 0 && discountType !== "0";

  const discountedPrice = hasDiscount
    ? discountType === "percentage"
      ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
      : Math.max(0, originalPrice - discountValue)
    : originalPrice;

  return {
    id: p.id,
    name: p.name,
    price: `Tk ${discountedPrice.toLocaleString("en-IN")}`,
    oldPrice: hasDiscount ? `Tk ${originalPrice.toLocaleString("en-IN")}` : null,
    discount: hasDiscount
      ? discountType === "percentage"
        ? `-${discountValue}%`
        : `Tk ${discountValue.toLocaleString("en-IN")}`
      : null,
    imageUrl: p.image_path || p.image_path1 || p.image_path2 || "/no-image.svg",
  };
}

export default function TopBrandProducts() {
  const [brands, setBrands] = useState([]);
  const [activeBrandId, setActiveBrandId] = useState("all");
  const [productsByBrand, setProductsByBrand] = useState({});
  const [loadingByBrand, setLoadingByBrand] = useState({});
  const [brandsLoading, setBrandsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBrandsAndProducts = async () => {
      setBrandsLoading(true);
      try {
        const brandRes = await getTopBrands();
        const brandList = brandRes?.success && Array.isArray(brandRes?.data) ? brandRes.data : [];

        if (!isMounted) return;
        setBrands(brandList);
        setBrandsLoading(false);

        brandList.forEach((brand) => {
          setLoadingByBrand((prev) => ({ ...prev, [brand.id]: true }));

          getBrandwiseProducts(brand.id, 1, 12)
            .then((res) => {
              if (!isMounted) return;
              const raw = Array.isArray(res?.data?.data)
                ? res.data.data
                : Array.isArray(res?.data)
                  ? res.data
                  : [];

              setProductsByBrand((prev) => ({
                ...prev,
                [brand.id]: raw.map(mapProduct),
              }));
            })
            .catch(() => {
              if (!isMounted) return;
              setProductsByBrand((prev) => ({ ...prev, [brand.id]: [] }));
            })
            .finally(() => {
              if (!isMounted) return;
              setLoadingByBrand((prev) => ({ ...prev, [brand.id]: false }));
            });
        });
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to fetch top brands:", error);
        setBrands([]);
        setBrandsLoading(false);
      }
    };

    fetchBrandsAndProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const allLoadedProducts = useMemo(() => {
    const seen = new Set();
    const merged = [];

    brands.forEach((brand) => {
      const items = productsByBrand[brand.id] || [];
      items.forEach((item) => {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          merged.push(item);
        }
      });
    });

    return merged.slice(0, 20);
  }, [brands, productsByBrand]);

  const visibleProducts = activeBrandId === "all"
    ? allLoadedProducts
    : (productsByBrand[activeBrandId] || []);

  const isVisibleLoading = activeBrandId === "all"
    ? brands.some((b) => loadingByBrand[b.id])
    : !!loadingByBrand[activeBrandId];

  return (
    <section className="bg-white py-10 md:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
          Top Brand Products
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2 mb-8" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

          <button
            onClick={() => setActiveBrandId("all")}
            disabled={brands.length === 0}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              activeBrandId === "all"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } ${brands.length === 0 ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            All
          </button>

          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setActiveBrandId(brand.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeBrandId === brand.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : !brandsLoading && brands.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-gray-500 text-sm font-medium">
            No top brands are available right now.
          </div>
        ) : isVisibleLoading || brandsLoading ? (
          <div className="flex items-center justify-center py-12 text-gray-500 text-sm font-medium">
            Loading brand products...
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-gray-500 text-sm font-medium">
            No products found for this brand.
          </div>
        )}
      </div>
    </section>
  );
}
