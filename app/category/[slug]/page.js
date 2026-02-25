"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FiFilter } from 'react-icons/fi';
import CategorySidebar from '../../../components/Category/CategorySidebar';
import ProductGrid from '../../../components/Category/ProductGrid';

export default function CategoryPage() {
    const params = useParams();
    const categoryName = decodeURIComponent(params.slug || 'Category');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Mock Products Data (replace with API call later)
    const products = [
        { id: 1, name: "Anker Soundcore R60i NC TWS Earbuds", price: "৳ 3,500", oldPrice: "৳ 4,200", discount: "৳ 700", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" },
        { id: 2, name: "OnePlus Nord Buds 3r", price: "৳ 2,750", oldPrice: "৳ 3,100", discount: "৳ 350", imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600" },
        { id: 3, name: "OnePlus Buds 4 ANC TWS Earbuds", price: "৳ 7,850", oldPrice: "৳ 9,500", discount: "৳ 1,650", imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600" },
        { id: 4, name: "PHILIPS QP2724/10 OneBlade Trimmer", price: "৳ 4,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1556228720-192a6af4e86e?q=80&w=600" },
        { id: 5, name: "Anker A1638 Nano Power Bank", price: "৳ 5,000", oldPrice: "৳ 5,500", discount: "৳ 500", imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600" },
        { id: 6, name: "Apple 20W USB-C Power Adapter", price: "৳ 2,200", oldPrice: "৳ 2,800", discount: "৳ 600", imageUrl: "https://images.unsplash.com/photo-1610945431131-c4214c7183e9?q=80&w=600" },
        { id: 7, name: "Samsung Galaxy S24 Ultra Back Cover", price: "৳ 1,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1695504236952-1ee7e3bb6dfc?q=80&w=600" },
        { id: 8, name: "Baseus 65W GaN Charger", price: "৳ 3,500", oldPrice: "৳ 4,500", discount: "৳ 1,000", imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Page Header */}
                <div className="mb-3 md:mb-8 pb-3 md:pb-6 border-b border-gray-200">
                    <div className="text-[11px] md:text-sm text-gray-400 mb-1 flex items-center gap-2">
                        <span>Home</span> / <span>Categories</span> / <span className="text-brand-orange font-semibold capitalize">{categoryName}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                        <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 capitalize tracking-tight">
                            {categoryName}
                        </h1>
                        <p className="text-gray-500 text-[12px] md:text-sm font-medium">
                            Showing <span className="font-bold text-gray-900">{products.length}</span> products
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 pt-2 lg:pt-0">

                    {/* Sidebar (Filters) - Left Side on Desktop */}
                    <aside className="lg:w-1/4 order-1">
                        <CategorySidebar
                            isOpen={isMobileFilterOpen}
                            onClose={() => setIsMobileFilterOpen(false)}
                        />
                    </aside>

                    {/* Main Content (Product Grid) - Right Side on Desktop */}
                    <main className="lg:w-3/4 order-2">
                        {products.length > 0 ? (
                            <ProductGrid products={products} onOpenFilter={() => setIsMobileFilterOpen(true)} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
                                <p className="text-gray-400 font-medium">No products found in this category.</p>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}
