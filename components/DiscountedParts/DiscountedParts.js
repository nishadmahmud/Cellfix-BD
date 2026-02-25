"use client";

import { useState } from 'react';
import ProductCard from '../Shared/ProductCard';

export default function DiscountedParts() {
    const [activeTab, setActiveTab] = useState('Battery');

    const tabs = ['Battery', 'Screens'];

    const batteryImage = "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?q=80&w=1095&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const screenImage = "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=400";

    const products = {
        'Battery': [
            { id: 1, name: "iPhone X Battery", price: "2200 TK", oldPrice: "3000", discount: "-27%", imageUrl: batteryImage },
            { id: 2, name: "iPhone 8 Plus Battery", price: "1500 TK", oldPrice: "1800", discount: "-17%", imageUrl: batteryImage },
            { id: 3, name: "iPhone 8 Battery", price: "1500 TK", oldPrice: "1800", discount: "-17%", imageUrl: batteryImage },
            { id: 4, name: "iPhone 7 Battery", price: "900 TK", oldPrice: "1200", discount: "-25%", imageUrl: batteryImage },
            { id: 5, name: "iPhone 7 Plus Battery", price: "900 TK", oldPrice: "1200", discount: "-25%", imageUrl: batteryImage },
            { id: 6, name: "iPhone 6s Plus Battery", price: "700 TK", oldPrice: "900", discount: "-22%", imageUrl: batteryImage },
            { id: 7, name: "iPhone 6 Battery", price: "700 TK", oldPrice: "900", discount: "-22%", imageUrl: batteryImage },
        ],
        'Screens': [
            { id: 8, name: "iPhone 13 Pro Max Screen", price: "12500 TK", oldPrice: "15000", discount: "-16%", imageUrl: screenImage },
            { id: 9, name: "iPhone 12 Screen OLED", price: "8500 TK", oldPrice: "10000", discount: "-15%", imageUrl: screenImage },
            { id: 10, name: "iPhone 11 Screen", price: "4500 TK", oldPrice: "5500", discount: "-18%", imageUrl: screenImage },
            { id: 11, name: "iPhone X Screen OLED", price: "3500 TK", oldPrice: "4500", discount: "-22%", imageUrl: screenImage },
            { id: 12, name: "iPhone 8 Plus Screen", price: "2000 TK", oldPrice: "2500", discount: "-20%", imageUrl: screenImage },
            { id: 13, name: "iPhone 7 LCD Assembly", price: "1500 TK", oldPrice: "2000", discount: "-25%", imageUrl: screenImage },
        ]
    };

    const activeProducts = products[activeTab];

    return (
        <section className="bg-white py-8 md:py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-5 md:mb-10">
                    <h2 className="text-lg md:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                        <span className="text-brand-orange">MOST</span> DISCOUNTED
                    </h2>
                </div>

                <div className="flex justify-center border-b border-gray-200 mb-5 md:mb-10">
                    <div className="flex gap-6 md:gap-8 overflow-x-auto hide-scrollbar pb-[-1px]">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 md:pb-3 text-xs md:text-sm font-bold uppercase transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'text-brand-orange border-b-2 border-brand-orange'
                                    : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-3 md:gap-6 pb-2 snap-x snap-mandatory flex-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {activeProducts.map((product) => (
                        <div key={product.id} className="min-w-[150px] w-[150px] md:min-w-[240px] md:w-[240px] flex-shrink-0 snap-center">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
