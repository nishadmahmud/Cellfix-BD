"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoriesFromServer, getCategoryWiseProducts, getProductsBySubcategory } from '../../../lib/api';
import CategorySidebar from '../../../components/Category/CategorySidebar';
import ProductGrid from '../../../components/Category/ProductGrid';
import { FiGrid } from 'react-icons/fi';

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
        rawImeis: p.imeis || []
    };
}

export default function CategoryPage() {
    const params = useParams();
    const searchParams = useSearchParams();

    const rawSlug = params?.slug || '';

    // Read the requested page exclusively from URL parameters.
    const urlPage = Math.max(1, parseInt(searchParams?.get('page') || '1', 10));

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [categoryId, setCategoryId] = useState(rawSlug);
    const [categoryName, setCategoryName] = useState(() =>
        decodeURIComponent(rawSlug)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
    );

    // Instead of holding 1 page, we hold ALL products for this category.
    const [allProducts, setAllProducts] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcatName, setSelectedSubcatName] = useState('');
    const [filterOptions, setFilterOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [bannerImage, setBannerImage] = useState("https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2000&auto=format&fit=crop");

    const subcatId = searchParams?.get('subcategory');
    const isRepairCategory = useMemo(() => {
        const n = categoryName.toLowerCase();
        return n.includes('repair') || n.includes('unlock');
    }, [categoryName]);

    // Filter State
    const [selectedBrands, setSelectedBrands] = useState(['All']);
    const [selectedPrice, setSelectedPrice] = useState({ min: '', max: '' });
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState('All');

    useEffect(() => {
        let isMounted = true;

        const fetchCategoryData = async () => {
            setIsLoading(true);
            let resolvedCatId = rawSlug;

            try {
                const catRes = await getCategoriesFromServer();
                if (catRes?.success && Array.isArray(catRes.data)) {
                    const normalize = (val) => val ? String(val).toLowerCase().trim().replace(/[\s_]+/g, '-') : '';
                    const decodedSlug = decodeURIComponent(rawSlug);
                    const slugLower = normalize(decodedSlug);

                    const found = catRes.data.find((c) =>
                        String(c.category_id) === String(rawSlug) ||
                        String(c.id) === String(rawSlug) ||
                        normalize(c.name) === slugLower ||
                        normalize(c.slug) === slugLower ||
                        String(c.name).toLowerCase() === String(decodedSlug).toLowerCase()
                    );

                    if (found) {
                        resolvedCatId = found.category_id ?? found.id ?? resolvedCatId;
                        if (isMounted) {
                            setCategoryId(resolvedCatId);
                            if (found.name) setCategoryName(found.name);
                            setSubcategories(found.sub_category || []);

                            if (subcatId && found.sub_category) {
                                const sub = found.sub_category.find(s => String(s.id) === String(subcatId));
                                if (sub) setSelectedSubcatName(sub.name);
                            }

                            // Use banner from API with fallbacks
                            const apiBanner = found.banner || found.banner_image || found.image_path || found.image_url;
                            if (apiBanner) {
                                setBannerImage(apiBanner);
                            }
                        }
                    }

                    // If we have subcategories but NO subcatId selected, we DON'T fetch products yet (show subcat list)
                    // EXCEPT if it's a repair category (we show products directly there now as per user request)
                    const n = found?.name?.toLowerCase() || '';
                    const isRepair = n.includes('repair') || n.includes('unlock');

                    if (!subcatId && found?.sub_category?.length > 0 && !isRepair) {
                        if (isMounted) {
                            setAllProducts([]);
                            setIsLoading(false);
                        }
                        return;
                    }
                }
            } catch (err) {
                console.error('Failed to resolve category:', err);
            }

            try {
                setIsProductLoading(true);
                // Fetch products based on whether we have a subcategory or just a category
                const fetchFn = subcatId ? 
                    () => getProductsBySubcategory(subcatId, 1) : 
                    () => getCategoryWiseProducts(resolvedCatId, 1);
                
                const firstPageData = await fetchFn();

                if (isMounted && firstPageData?.success && Array.isArray(firstPageData.data)) {
                    let globalProductsArray = [...firstPageData.data];
                    setAllProducts(globalProductsArray.map(mapProduct).sort((a, b) => b.stock - a.stock));

                    if (firstPageData.filter_options) setFilterOptions(firstPageData.filter_options);
                    setIsLoading(false);
                    setIsProductLoading(false);

                    // Fetch remaining pages
                    const totalPages = firstPageData.pagination?.last_page || 1;
                    if (totalPages > 1) {
                        const remainingPagesToFetch = [];
                        for (let p = 2; p <= totalPages; p++) {
                            remainingPagesToFetch.push(p);
                        }

                        for (let i = 0; i < remainingPagesToFetch.length; i += 5) {
                            if (!isMounted) break;
                            const chunk = remainingPagesToFetch.slice(i, i + 5);
                            const chunkResults = await Promise.allSettled(
                                chunk.map(page => subcatId ? getProductsBySubcategory(subcatId, page) : getCategoryWiseProducts(resolvedCatId, page))
                            );

                            chunkResults.forEach((res) => {
                                if (res.status === 'fulfilled' && res.value?.success && Array.isArray(res.value.data)) {
                                    globalProductsArray.push(...res.value.data);
                                }
                            });

                            if (isMounted) {
                                setAllProducts([...globalProductsArray].map(mapProduct).sort((a, b) => b.stock - a.stock));
                            }
                        }
                    }
                } else if (isMounted) {
                    setIsLoading(false);
                    setIsProductLoading(false);
                }
            } catch (err) {
                console.error('Failed to fetch category products:', err);
                if (isMounted) {
                    setIsLoading(false);
                    setIsProductLoading(false);
                }
            }
        };

        if (rawSlug) fetchCategoryData();

        return () => { isMounted = false; };
    }, [rawSlug, subcatId]); // Re-fetch when slug OR subcat query changes

    // Compute dynamic filter lists using ALL background-fetched products + Server rules.
    const derivedFilters = useMemo(() => {
        const brandsList = ['All'];
        if (filterOptions?.brands) {
            brandsList.push(...Object.values(filterOptions.brands));
        } else {
            brandsList.push(...new Set(allProducts.map(p => p.brand).filter(Boolean)));
        }

        // Storage List
        let storageList = [];
        if (filterOptions?.storages) {
            storageList = Object.values(filterOptions.storages);
        } else {
            const allImeis = allProducts.flatMap(p => p.rawImeis || []);
            storageList = [...new Set(allImeis.map(i => i.storage).filter(Boolean))].sort();
        }

        // Region List
        let regionList = [];
        if (filterOptions?.regions) {
            regionList = Object.values(filterOptions.regions);
        } else {
            const allImeis = allProducts.flatMap(p => p.rawImeis || []);
            regionList = [...new Set(allImeis.map(i => i.region).filter(Boolean))].sort();
        }

        // Color List
        let colorList = [];
        if (filterOptions?.colors && Array.isArray(filterOptions.colors) && filterOptions.colors.length > 0) {
            colorList = filterOptions.colors.map(c => ({
                name: c,
                hex: c.toLowerCase() === 'black' ? '#000000' :
                    c.toLowerCase() === 'white' ? '#ffffff' : '#cccccc'
            }));
        } else {
            const allImeis = allProducts.flatMap(p => p.rawImeis || []);
            const colorMap = new Map();
            allImeis.forEach(i => {
                if (i.color) {
                    if (!colorMap.has(i.color) || colorMap.get(i.color) === '#cccccc') {
                        colorMap.set(i.color, i.color_code || '#cccccc');
                    }
                }
            });
            colorList = Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
        }

        // Price Boundary Calculation
        let minPrice = Infinity;
        let maxPrice = 0;

        allProducts.forEach(p => {
            if (p.rawPrice > 0 && p.rawPrice < minPrice) minPrice = p.rawPrice;
            if (p.rawPrice > maxPrice) maxPrice = p.rawPrice;

            if (p.rawImeis && p.rawImeis.length > 0) {
                p.rawImeis.forEach(imei => {
                    const imeiPrice = Number(imei.discount_price || imei.price || 0);
                    if (imeiPrice > 0) {
                        if (imeiPrice < minPrice) minPrice = imeiPrice;
                        if (imeiPrice > maxPrice) maxPrice = imeiPrice;
                    }
                });
            }
        });

        if (minPrice === Infinity) minPrice = 0;

        const roundDown = val => Math.floor(val / 100) * 100;
        const roundUp = val => Math.ceil(val / 100) * 100;

        const globalMinPrice = roundDown(minPrice);
        const globalMaxPrice = roundUp(maxPrice);

        return {
            brandsList: [...new Set(brandsList)],
            storageList,
            regionList,
            colorList,
            globalMinPrice,
            globalMaxPrice
        };
    }, [allProducts, filterOptions]);

    // Apply Filters front-end across the ENTIRE product dataset
    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => {
            if (selectedBrands.length > 0 && selectedBrands[0] !== 'All') {
                if (!selectedBrands.includes(p.brand)) return false;
            }
            if (selectedPrice.min !== '' && p.rawPrice < Number(selectedPrice.min)) return false;
            if (selectedPrice.max !== '' && p.rawPrice > Number(selectedPrice.max)) return false;
            if (selectedAvailability === 'In Stock' && p.stock <= 0) return false;

            const hasImeiFilters = selectedStorage.length > 0 || selectedRegion.length > 0 || selectedColor.length > 0;
            if (hasImeiFilters) {
                const hasMatchingImei = (p.rawImeis || []).some(i => {
                    let match = true;
                    if (selectedStorage.length > 0 && !selectedStorage.includes(i.storage)) match = false;
                    if (selectedRegion.length > 0 && !selectedRegion.includes(i.region)) match = false;
                    if (selectedColor.length > 0 && !selectedColor.includes(i.color)) match = false;
                    return match;
                });
                if (!hasMatchingImei) return false;
            }

            return true;
        });
    }, [allProducts, selectedBrands, selectedPrice, selectedStorage, selectedRegion, selectedColor, selectedAvailability]);

    // Frontend pagination limits
    const itemsPerPage = 20;
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
    const validCurrentPage = Math.min(urlPage, totalPages); // Protect against invalid out-of-bounds ?page= variables.

    // Splice ONLY what is needed onto the screen instantly!
    const paginatedProductsForScreen = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, validCurrentPage, itemsPerPage]);

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Top Banner Image */}
                <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8" style={{ aspectRatio: '21/5' }}>
                    <Image
                        src={bannerImage}
                        alt={`${categoryName} Banner`}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent flex items-center p-8 md:p-16">
                        <div className="text-white">
                            <h1 className="text-3xl md:text-6xl font-black mb-2 tracking-tight capitalize">{categoryName}</h1>
                            <p className="text-lg md:text-2xl font-medium text-white/90">The latest : Have a look at a glance</p>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="text-[12px] md:text-sm text-gray-500 mb-6 md:mb-10 flex items-center gap-2 font-medium">
                    <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={isRepairCategory ? "/services" : "/category"} className="hover:text-brand-orange transition-colors">
                        {isRepairCategory ? "Services" : "Shop"}
                    </Link>
                    <span>/</span>
                    <Link href={`/category/${rawSlug}`} className={`hover:text-brand-orange transition-colors capitalize ${!subcatId ? 'text-brand-orange font-bold' : ''}`}>
                        {categoryName}
                    </Link>
                    {subcatId && (
                        <>
                            <span>/</span>
                            <span className="text-brand-orange font-bold">{selectedSubcatName || 'Model'}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 pt-2 lg:pt-0">

                    {/* Sidebar (Filters) - Left Side on Desktop */}
                    <aside className="lg:w-1/4 order-1">
                        <CategorySidebar
                            isOpen={isMobileFilterOpen}
                            onClose={() => setIsMobileFilterOpen(false)}
                            derivedFilters={derivedFilters}
                            globalMinPrice={derivedFilters.globalMinPrice}
                            globalMaxPrice={derivedFilters.globalMaxPrice}
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            selectedStorage={selectedStorage}
                            setSelectedStorage={setSelectedStorage}
                            selectedRegion={selectedRegion}
                            setSelectedRegion={setSelectedRegion}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            selectedAvailability={selectedAvailability}
                            setSelectedAvailability={setSelectedAvailability}
                        />
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:w-3/4 order-2">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                                <div className="w-8 h-8 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-400 font-medium">Loading...</p>
                            </div>
                        ) : !subcatId && subcategories.length > 0 && !isRepairCategory ? (
                            /* Subcategory Grid - Only for non-repair categories */
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-brand-orange rounded-full"></span>
                                    Select Your Model
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                                    {subcategories.map((sub) => (
                                        <Link
                                            key={sub.id}
                                            href={`/category/${rawSlug}?subcategory=${sub.id}`}
                                            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-orange/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                                        >
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-xl flex items-center justify-center text-2xl md:text-3xl text-gray-400 group-hover:text-brand-orange group-hover:bg-orange-50 transition-all duration-300 mb-4 shadow-sm">
                                                <FiGrid />
                                            </div>
                                            <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-brand-orange transition-colors line-clamp-2">
                                                {sub.name}
                                            </h3>
                                            <span className="mt-3 text-[10px] md:text-xs font-bold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                                                See Repairs &rarr;
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : paginatedProductsForScreen.length > 0 ? (
                            <ProductGrid
                                products={paginatedProductsForScreen}
                                onOpenFilter={() => setIsMobileFilterOpen(true)}
                                categoryName={subcatId ? selectedSubcatName : categoryName}
                                brandsList={derivedFilters.brandsList}
                                activeBrand={selectedBrands[0] || 'All'}
                                onSelectBrand={(b) => setSelectedBrands([b])}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                                <p className="text-gray-400 font-medium">
                                    {isProductLoading ? 'Searching for products...' : 'No products found here yet.'}
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {!isLoading && !isProductLoading && totalPages > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                                {Array.from({ length: totalPages }, (_, i) => {
                                    let pageNum = i + 1;
                                    if (totalPages > 6) {
                                        if (pageNum < validCurrentPage - 2 && pageNum !== 1) return null;
                                        if (pageNum > validCurrentPage + 2 && pageNum !== totalPages) return null;
                                        if (pageNum === validCurrentPage - 2 && pageNum > 2) return <span key={`ellipsis-${pageNum}`} className="px-2 text-gray-400">...</span>;
                                        if (pageNum === validCurrentPage + 2 && pageNum < totalPages - 1) return <span key={`ellipsis-${pageNum}`} className="px-2 text-gray-400">...</span>;
                                    }

                                    return (
                                        <Link
                                            key={pageNum}
                                            href={`/category/${rawSlug}?page=${pageNum}${subcatId ? `&subcategory=${subcatId}` : ''}`}
                                            scroll={true}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${pageNum === validCurrentPage
                                                ? 'bg-brand-orange text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}
