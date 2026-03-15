"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProductsByChildCategory, getCategoriesFromServer } from '../../../lib/api';
import ProductCard from '../../../components/Shared/ProductCard';

function mapProduct(p) {
    const originalPrice = Number(p.retails_price || 0);
    const discountValue = Number(p.discount || 0);
    const discountType = p.discount_type;
    const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';

    const discountedPrice = hasDiscount
        ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
        : originalPrice;

    const discount = hasDiscount
        ? (String(discountType).toLowerCase() === 'percentage' ? `-${discountValue}%` : `৳ ${discountValue.toLocaleString('en-IN')}`)
        : null;

    return {
        id: p.id,
        name: p.name,
        price: `৳ ${discountedPrice.toLocaleString('en-IN')}`,
        oldPrice: hasDiscount ? `৳ ${originalPrice.toLocaleString('en-IN')}` : null,
        discount,
        imageUrl: p.image_path || p.image_path1 || p.image_path2 || p.image_url || '/no-image.svg',
        brand: p.brand_name || p.brands?.name || '',
        stock: p.current_stock || 0,
        rawPrice: discountedPrice,
    };
}

export default function ChildCategoryPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const childId = params?.id;
    const urlPage = Math.max(1, parseInt(searchParams?.get('page') || '1', 10));

    const [childName, setChildName] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setIsLoading(true);

            // Resolve name from categories API
            try {
                const catRes = await getCategoriesFromServer();
                if (catRes?.success && Array.isArray(catRes.data)) {
                    for (const cat of catRes.data) {
                        for (const sub of (cat.sub_category || [])) {
                            const found = (sub.child_categories || []).find(c => String(c.id) === String(childId));
                            if (found) {
                                if (isMounted) setChildName(found.name);
                                break;
                            }
                        }
                        if (childName) break;
                    }
                }
            } catch (e) {
                console.error('Failed to resolve child category name:', e);
            }

            // Fetch products
            try {
                const firstPage = await getProductsByChildCategory(childId, 1);
                if (isMounted && firstPage?.success && Array.isArray(firstPage.data)) {
                    let globalProducts = [...firstPage.data];
                    setAllProducts(globalProducts.map(mapProduct));
                    setIsLoading(false);

                    const totalPages = firstPage.pagination?.last_page || 1;
                    if (totalPages > 1) {
                        for (let p = 2; p <= totalPages; p += 5) {
                            if (!isMounted) break;
                            const chunk = [];
                            for (let j = p; j < p + 5 && j <= totalPages; j++) chunk.push(j);
                            const results = await Promise.allSettled(
                                chunk.map(pg => getProductsByChildCategory(childId, pg))
                            );
                            results.forEach(r => {
                                if (r.status === 'fulfilled' && r.value?.success && Array.isArray(r.value.data)) {
                                    globalProducts.push(...r.value.data);
                                }
                            });
                            if (isMounted) setAllProducts([...globalProducts].map(mapProduct));
                        }
                    }
                } else if (isMounted) {
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Failed to fetch child category products:', err);
                if (isMounted) setIsLoading(false);
            }
        };

        if (childId) fetchData();
        return () => { isMounted = false; };
    }, [childId]);

    const itemsPerPage = 20;
    const totalPages = Math.max(1, Math.ceil(allProducts.length / itemsPerPage));
    const validPage = Math.min(urlPage, totalPages);
    const paginatedProducts = useMemo(() => {
        const start = (validPage - 1) * itemsPerPage;
        return allProducts.slice(start, start + itemsPerPage);
    }, [allProducts, validPage]);

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <div className="text-[12px] md:text-sm text-gray-500 mb-6 flex items-center gap-2 font-medium">
                    <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-brand-orange font-bold capitalize">{childName || 'Products'}</span>
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 capitalize">{childName || 'Products'}</h1>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                        <div className="w-8 h-8 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-400 font-medium">Loading products...</p>
                    </div>
                ) : paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
                        {paginatedProducts.map((product, idx) => (
                            <ProductCard key={product.id || idx} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                        <p className="text-gray-400 font-medium">No products found in this category.</p>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                        {Array.from({ length: totalPages }, (_, i) => {
                            let pageNum = i + 1;
                            if (totalPages > 6) {
                                if (pageNum < validPage - 2 && pageNum !== 1) return null;
                                if (pageNum > validPage + 2 && pageNum !== totalPages) return null;
                                if (pageNum === validPage - 2 && pageNum > 2) return <span key={`e-${pageNum}`} className="px-2 text-gray-400">...</span>;
                                if (pageNum === validPage + 2 && pageNum < totalPages - 1) return <span key={`e-${pageNum}`} className="px-2 text-gray-400">...</span>;
                            }
                            return (
                                <Link
                                    key={pageNum}
                                    href={`/child-category/${childId}?page=${pageNum}`}
                                    scroll={true}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${pageNum === validPage
                                        ? 'bg-brand-orange text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {pageNum}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
