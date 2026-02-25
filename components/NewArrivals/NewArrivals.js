"use client";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals() {
    const products = [
        { id: 1, name: "Anker Soundcore R60i NC TWS Earbuds", price: "৳ 3,500", oldPrice: "৳ 4,200", discount: "৳ 700", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" },
        { id: 2, name: "OnePlus Nord Buds 3r", price: "৳ 2,750", oldPrice: "৳ 3,100", discount: "৳ 350", imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600" },
        { id: 3, name: "OnePlus Buds 4 ANC TWS Earbuds", price: "৳ 7,850", oldPrice: "৳ 9,500", discount: "৳ 1,650", imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600" },
        { id: 4, name: "PHILIPS QP2724/10 OneBlade Trimmer", price: "৳ 4,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1556228720-192a6af4e86e?q=80&w=600" },
        { id: 5, name: "Anker A1638 Nano Power Bank with...", price: "৳ 5,000", oldPrice: "৳ 5,500", discount: "৳ 500", imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600" }
    ];

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
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
