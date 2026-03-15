"use client";

import { useState } from 'react';
import ProductCard from '../Shared/ProductCard';

export default function DiscountedParts({ products: apiProducts = {} }) {
    const productsToDisplay = apiProducts;

    if (Object.keys(productsToDisplay).length === 0) {
        return null;
    }
    const tabs = Object.keys(productsToDisplay);

    const [activeTab, setActiveTab] = useState(tabs[0] || '');

    const currentTab = tabs.includes(activeTab) ? activeTab : (tabs[0] || '');
    const activeProducts = productsToDisplay[currentTab] || [];

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
