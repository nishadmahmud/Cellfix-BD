"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSmartphone, FiMonitor, FiHeadphones, FiZap, FiBatteryCharging, FiTablet, FiSpeaker, FiCpu, FiHardDrive, FiWifi, FiPenTool, FiWatch, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function ShopCategories({ categories: apiCategories = [], flashSaleProducts: apiFlashSale = [] }) {
    // Countdown timer — starts at 23 Days 4h 4m 59s
    const [timeLeft, setTimeLeft] = useState(23 * 86400 + 4 * 3600 + 4 * 60 + 59);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 30 * 86400 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = String(Math.floor(timeLeft / 86400)).padStart(2, '0');
    const hours = String(Math.floor((timeLeft % 86400) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    const displayCategories = apiCategories.map((cat, idx) => {
        const iconMap = {
            'phones': <FiSmartphone />,
            'smartphones': <FiSmartphone />,
            'tablets': <FiTablet />,
            'laptops': <FiMonitor />,
            'accessories': <FiWatch />,
            'audio': <FiHeadphones />,
            'chargers': <FiZap />,
            'cables': <FiBatteryCharging />
        };
        const slug = cat.slug || cat.name.toLowerCase();
        return {
            id: cat.id,
            name: cat.name,
            image: cat.image_path || cat.image_url || "",
            icon: iconMap[slug] || iconMap[slug.replace(/s$/, '')] || <FiGrid />,
            slug: slug
        };
    });

    const displayFlashSale = apiFlashSale;

    if (displayCategories.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-purple-600">Categories</span>
                    </h2>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-y-8 md:gap-y-12 gap-x-2 mb-16 md:mb-24">
                    {displayCategories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.slug || cat.name.toLowerCase().replace(/ /g, '-')}`}
                            key={cat.id || idx}
                            className="flex flex-col items-center justify-start gap-3 md:gap-4 text-center group"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center text-3xl md:text-4xl text-gray-700 group-hover:scale-110 transition-transform duration-300">
                                {cat.image ? (
                                    <Image src={cat.image} alt={cat.name} fill unoptimized className="object-contain" />
                                ) : (
                                    cat.icon
                                )}
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-gray-700 leading-tight group-hover:text-brand-orange transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Flash Sale Banner */}
                {displayFlashSale.length > 0 && (
                    <div className="bg-brand-orange rounded-2xl p-4 md:p-8 relative">
                        {/* Header Strip */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4">
                            <div className="flex items-center gap-2 md:gap-3">
                                <h3 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-gray-900 leading-[1.15]">
                                    🔥 Flash Sale
                                </h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-800 tracking-wider">
                                    OFFER ENDING IN:
                                </div>
                                <div className="flex gap-2 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-gray-800 mb-1 font-semibold">Days</span>
                                        <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{days}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-gray-800 mb-1 font-semibold">Hour</span>
                                        <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{hours}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-gray-800 mb-1 font-semibold">Min</span>
                                        <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{minutes}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-gray-800 mb-1 font-semibold">Sec</span>
                                        <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{seconds}</span>
                                    </div>
                                </div>
                                <button className="bg-white text-gray-800 font-bold text-xs py-2 md:py-3 px-4 md:px-6 rounded-md transition-colors whitespace-nowrap shadow-sm hover:shadow-md hidden md:block">
                                    SEE ALL
                                </button>
                            </div>
                        </div>

                        {/* Product Row */}
                        <div className="relative group">
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 overflow-hidden">
                                {displayFlashSale.slice(0, 5).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
