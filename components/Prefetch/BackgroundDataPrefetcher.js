"use client";

import { useEffect } from "react";
import {
  getCategoriesFromServer,
  getTopBrands,
  getCategoryWiseProducts,
  getProductsBySubcategory,
  getBrandwiseProducts,
} from "../../lib/api";

const PREFETCH_FLAG = "__cellfix_background_prefetch_done__";

async function runWithLimit(tasks, limit = 4) {
  const queue = [...tasks];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0) {
      const task = queue.shift();
      if (!task) break;
      try {
        await task();
      } catch {
        // silent by design
      }
    }
  });

  await Promise.all(workers);
}

export default function BackgroundDataPrefetcher() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window[PREFETCH_FLAG]) return;
    window[PREFETCH_FLAG] = true;

    const warmup = async () => {
      try {
        const [categoryRes, topBrandRes] = await Promise.all([
          getCategoriesFromServer().catch(() => null),
          getTopBrands().catch(() => null),
        ]);

        const categories =
          categoryRes?.success && Array.isArray(categoryRes?.data) ? categoryRes.data : [];
        const brands =
          topBrandRes?.success && Array.isArray(topBrandRes?.data) ? topBrandRes.data : [];

        const categoryTasks = [];
        const subcategoryTasks = [];
        const brandTasks = [];

        categories.forEach((cat) => {
          const catId = cat?.category_id ?? cat?.id;
          if (catId) {
            categoryTasks.push(() => getCategoryWiseProducts(catId, 1));
          }

          const subcats = Array.isArray(cat?.sub_category) ? cat.sub_category : [];
          subcats.forEach((sub) => {
            if (sub?.id) subcategoryTasks.push(() => getProductsBySubcategory(sub.id, 1));
          });
        });

        brands.forEach((brand) => {
          if (brand?.id) {
            brandTasks.push(() => getBrandwiseProducts(brand.id, 1, 20));
          }
        });

        await runWithLimit(categoryTasks, 4);
        await runWithLimit(subcategoryTasks, 4);
        await runWithLimit(brandTasks, 3);
      } catch (error) {
        console.error("Background prefetch failed:", error);
      }
    };

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 700);

    schedule(() => {
      warmup();
    });
  }, []);

  return null;
}
