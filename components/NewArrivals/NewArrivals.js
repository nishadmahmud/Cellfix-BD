"use client";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products: apiProducts = [] }) {
    const displayProducts = apiProducts;

    if (displayProducts.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header Container */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        New <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-purple-600">Arrival</span>
                    </h2>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex gap-2">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                            <FiChevronLeft size={20} />
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    <button className="px-5 py-2 rounded-full bg-black text-white text-xs md:text-sm font-bold whitespace-nowrap">
                        Gadgets
                    </button>
                    <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-xs md:text-sm font-semibold whitespace-nowrap">
                        Device
                    </button>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
