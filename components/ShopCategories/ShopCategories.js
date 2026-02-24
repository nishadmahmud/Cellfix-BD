"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSmartphone, FiMonitor, FiHeadphones, FiZap, FiBatteryCharging, FiTablet, FiSpeaker, FiCpu, FiHardDrive, FiWifi, FiPenTool, FiWatch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ShopCategories() {
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

    // Layout ready to accept image URLs from the user
    const categories = [
        { name: "Mobile Phone", icon: <FiSmartphone />, image: "" },
        { name: "Tablet", icon: <FiTablet />, image: "" },
        { name: "Laptop", icon: <FiMonitor />, image: "" },
        { name: "Airpods", icon: <FiHeadphones />, image: "" },
        { name: "Wireless Headphone", icon: <FiHeadphones />, image: "" },
        { name: "Wired Headphone", icon: <FiHeadphones />, image: "" },
        { name: "Headphone", icon: <FiHeadphones />, image: "" },
        { name: "Speakers", icon: <FiSpeaker />, image: "" },
        { name: "Starlink", icon: <FiWifi />, image: "" },
        { name: "Smart Pen", icon: <FiPenTool />, image: "" },
        { name: "Adapter", icon: <FiZap />, image: "" },
        { name: "Cables", icon: <FiBatteryCharging />, image: "" },
        { name: "Hubs & Docks", icon: <FiHardDrive />, image: "" },
        { name: "Wireless Charger", icon: <FiZap />, image: "" },
        { name: "Home Appliances", icon: <FiCpu />, image: "" },
        { name: "Accessories", icon: <FiWatch />, image: "" },
    ];

    const flashSaleProducts = [
        { name: "Anker Zolo 20W PD 3.0...", price: "৳ 1,250", oldPrice: "৳ 1,499", discount: "16%", tag: "Hot Product", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600" },
        { name: "iPhone 17 Pro Max", price: "৳ 1,68,490", oldPrice: "৳ 2,14,990", discount: "21%", tag: "Hot Product", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600" },
        { name: "Mibro Earbuds 5", price: "৳ 1,192", oldPrice: "৳ 1,900", discount: "37%", tag: "Top Selling", image: "https://images.unsplash.com/photo-1590658268037-6f14016628c0?q=80&w=600" },
        { name: "iPhone 17", price: "৳ 1,12,990", oldPrice: "৳ 1,49,990", discount: "24%", tag: "Hot Product", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" },
        { name: "iPhone 17 Pro", price: "৳ 1,52,990", oldPrice: "৳ 2,39,990", discount: "36%", tag: "Hot Product", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600" },
    ];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-purple-600">Categories</span>
                    </h2>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-y-8 md:gap-y-12 gap-x-2 mb-16 md:mb-24">
                    {categories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                            key={idx}
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
                        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center z-10 transition-colors text-gray-800 hidden md:flex">
                            <FiChevronLeft size={20} />
                        </button>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 overflow-hidden">
                            {flashSaleProducts.map((product, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-3 md:p-4 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
                                    {/* Badges */}
                                    <div className="absolute top-0 left-0 bg-[#b6865d] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
                                        {product.discount}
                                    </div>
                                    <div className="absolute top-0 right-0 bg-[#b6865d] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                                        <span className="text-[10px] text-yellow-300">🔥</span> {product.tag}
                                    </div>

                                    {/* Image */}
                                    <div className="w-full aspect-[4/3] relative mb-4 flex items-center justify-center bg-white mt-6">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            unoptimized
                                            className="object-contain group-hover:scale-105 transition-transform duration-500 Mix-blend-multiply px-2"
                                        />
                                        {/* Guarantee Badge */}
                                        <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm px-1 py-1 rounded-sm shadow-sm flex items-center gap-1 border border-orange-100">
                                            <div className="font-extrabold text-[#b6865d] text-sm">1</div>
                                            <div className="flex flex-col leading-[0.8] text-[6px] font-bold text-[#b6865d]">
                                                <span>YEAR</span>
                                                <span>GUARANTEE</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col flex-grow text-center">
                                        <h4 className="font-semibold text-gray-800 text-[11px] md:text-[13px] leading-snug mb-2 line-clamp-2 h-[32px]">{product.name}</h4>
                                        <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-4 mt-auto">
                                            <span className="text-gray-900 font-black text-sm md:text-[15px]">{product.price}</span>
                                            <span className="text-gray-400 text-[10px] line-through font-medium">{product.oldPrice}</span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-1.5 md:gap-2 mt-auto">
                                            <button className="bg-gray-900 text-white text-[9px] md:text-[10px] font-bold py-2 rounded-[4px] hover:bg-gray-800 transition">VIEW</button>
                                            <button className="bg-[#fcfaf8] text-gray-900 text-[9px] md:text-[10px] font-bold py-2 rounded-[4px] border border-[#e8dccb] hover:bg-[#e8dccb] transition">ADD TO CART</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center z-10 transition-colors text-gray-800 hidden md:flex">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
