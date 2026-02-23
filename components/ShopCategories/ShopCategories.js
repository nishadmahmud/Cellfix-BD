"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../Button/Button';
import { FiSmartphone, FiMonitor, FiWatch, FiHeadphones, FiShield, FiBatteryCharging, FiZap, FiRefreshCcw, FiTablet, FiSpeaker, FiCpu, FiHardDrive, FiWifi, FiPenTool, FiLayers, FiCamera } from 'react-icons/fi';

export default function ShopCategories() {
    // Countdown timer — starts at 12h 45m 06s, counts down every second
    const [timeLeft, setTimeLeft] = useState(12 * 3600 + 45 * 60 + 6);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 24 * 3600 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    const categories = [
        { name: "iPhones", icon: <FiSmartphone /> },
        { name: "MacBooks", icon: <FiMonitor /> },
        { name: "Smart Watches", icon: <FiWatch /> },
        { name: "Audio", icon: <FiHeadphones /> },
        { name: "Cases & Covers", icon: <FiShield /> },
        { name: "Fast Chargers", icon: <FiZap /> },
        { name: "Power Banks", icon: <FiBatteryCharging /> },
        { name: "Used Phones", icon: <FiRefreshCcw /> },
        { name: "iPads & Tablets", icon: <FiTablet /> },
        { name: "Smart Speakers", icon: <FiSpeaker /> },
        { name: "Storage & Drives", icon: <FiHardDrive /> },
        { name: "Routers & WiFi", icon: <FiWifi /> },
        { name: "Smart Home", icon: <FiCpu /> },
        { name: "Repair Tools", icon: <FiPenTool /> },
        { name: "Screen Protectors", icon: <FiLayers /> },
        { name: "Cameras & Lenses", icon: <FiCamera /> },
    ];

    const flashSaleProducts = [
        { name: "iPhone 14 Pro - 256GB", price: "৳115,000", oldPrice: "৳130,000", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" },
        { name: "Apple Watch Series 8", price: "৳42,000", oldPrice: "৳48,000", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600" },
        { name: "Samsung Galaxy S23 Ultra", price: "৳125,000", oldPrice: "৳140,000", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600" },
        { name: "Anker 10000mAh Power Bank", price: "৳2,200", oldPrice: "৳3,000", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600" },
    ];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Shop by <span className="text-brand-orange">Categories</span>
                    </h2>
                    <Link href="/shop" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-orange uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-orange">
                        See All
                    </Link>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 mb-10 md:mb-20">
                    {categories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                            key={idx}
                            className="bg-white border border-gray-100 rounded-lg md:rounded-xl p-2 md:p-6 flex flex-col items-center justify-center gap-1 md:gap-4 text-center hover:-translate-y-1 hover:border-brand-orange hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 group"
                        >
                            <div className="text-xl md:text-4xl text-gray-400 group-hover:text-brand-orange transition-colors">
                                {cat.icon}
                            </div>
                            <span className="text-[9px] md:text-sm font-semibold text-gray-700 leading-tight">{cat.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Flash Sale Banner */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Compact Header Strip */}
                    <div className="bg-brand-orange px-3 md:px-6 py-2.5 md:py-3 flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-white text-sm md:text-lg">🔥</span>
                            <h3 className="text-sm md:text-lg font-extrabold text-white">Flash Sale</h3>
                            <div className="flex gap-1 md:gap-1.5 ml-1 md:ml-2">
                                <span className="bg-white/20 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">{hours}h</span>
                                <span className="bg-white/20 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">{minutes}m</span>
                                <span className="bg-white/20 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">{seconds}s</span>
                            </div>
                        </div>
                        <button className="bg-white text-brand-orange hover:bg-gray-50 font-bold text-[10px] md:text-xs py-1.5 md:py-2 px-3 md:px-5 rounded-lg transition-colors whitespace-nowrap">
                            Shop All →
                        </button>
                    </div>

                    {/* Product Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
                        {flashSaleProducts.map((product, idx) => (
                            <div key={idx} className="bg-white p-2.5 md:p-4 group cursor-pointer hover:bg-orange-50/30 transition-colors flex flex-col items-center text-center">
                                <div className="w-full aspect-square md:aspect-[4/3] relative rounded-lg overflow-hidden mb-2 md:mb-3 bg-gray-50">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        unoptimized
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-800 text-[10px] md:text-sm leading-tight mb-1 md:mb-2 line-clamp-1">{product.name}</h4>
                                <div className="flex items-center gap-1 md:gap-2">
                                    <span className="text-brand-orange font-black text-xs md:text-base">{product.price}</span>
                                    <span className="text-gray-400 text-[9px] md:text-[11px] line-through">{product.oldPrice}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
