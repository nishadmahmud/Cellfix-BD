"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function DiscountedParts() {
    const [activeTab, setActiveTab] = useState('Battery');

    const tabs = ['Battery', 'Screens'];

    // Using a generic bare-bones battery and screen image for all items in that category as requested
    const batteryImage = "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?q=80&w=1095&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Specific bare battery image requested by user
    const screenImage = "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=400"; // Bare iPhone screen/glass

    const products = {
        'Battery': [
            { id: 1, name: "iPhone X Battery", price: "2200 TK", oldPrice: "3000", discount: "-27%" },
            { id: 2, name: "iPhone 8 Plus Battery", price: "1500 TK", oldPrice: "1800", discount: "-17%" },
            { id: 3, name: "iPhone 8 Battery", price: "1500 TK", oldPrice: "1800", discount: "-17%" },
            { id: 4, name: "iPhone 7 Battery", price: "900 TK", oldPrice: "1200", discount: "-25%" },
            { id: 5, name: "iPhone 7 Plus Battery", price: "900 TK", oldPrice: "1200", discount: "-25%" },
            { id: 6, name: "iPhone 6s Plus Battery", price: "700 TK", oldPrice: "900", discount: "-22%" },
            { id: 7, name: "iPhone 6 Battery", price: "700 TK", oldPrice: "900", discount: "-22%" },
        ],
        'Screens': [
            { id: 8, name: "iPhone 13 Pro Max Screen", price: "12500 TK", oldPrice: "15000", discount: "-16%" },
            { id: 9, name: "iPhone 12 Screen OLED", price: "8500 TK", oldPrice: "10000", discount: "-15%" },
            { id: 10, name: "iPhone 11 Screen Premium", price: "4500 TK", oldPrice: "5500", discount: "-18%" },
            { id: 11, name: "iPhone X Screen OLED", price: "3500 TK", oldPrice: "4500", discount: "-22%" },
            { id: 12, name: "iPhone 8 Plus Screen", price: "2000 TK", oldPrice: "2500", discount: "-20%" },
            { id: 13, name: "iPhone 7 LCD Assembly", price: "1500 TK", oldPrice: "2000", discount: "-25%" },
        ]
    };

    const activeProducts = products[activeTab];

    return (
        <section className="bg-white py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                        <span className="text-brand-orange">MOST</span> DISCOUNTED
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex justify-center border-b border-gray-200 mb-10">
                    <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-[-1px]">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-bold uppercase transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'text-brand-orange border-b-2 border-brand-orange'
                                    : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Scrollable Product List with Hidden Scrollbar */}
                <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory flex-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {activeProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-100 rounded-xl p-4 min-w-[200px] w-[200px] md:min-w-[240px] md:w-[240px] flex-shrink-0 flex flex-col relative group cursor-pointer hover:shadow-xl hover:shadow-orange-100/50 hover:border-brand-orange/30 transition-all duration-300 snap-center"
                        >
                            {/* Discount Tag */}
                            <div className="absolute top-3 right-3 z-10">
                                <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                    {product.discount}
                                </span>
                            </div>

                            {/* Image Container */}
                            <div className="w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center p-4">
                                <Image
                                    src={activeTab === 'Battery' ? batteryImage : screenImage}
                                    alt={product.name}
                                    fill
                                    unoptimized
                                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex flex-col text-center mt-auto">
                                <h4 className="text-gray-800 font-bold text-xs md:text-sm mb-2 line-clamp-2 h-8">
                                    {product.name}
                                </h4>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-gray-400 font-medium text-xs line-through decoration-brand-orange decoration-2">
                                        {product.oldPrice}
                                    </span>
                                    <span className="text-gray-900 font-black text-sm md:text-base">
                                        {product.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
