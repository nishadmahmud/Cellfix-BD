"use client";

import { useState } from 'react';

export default function RepairPricing() {
    const [activeDevice, setActiveDevice] = useState('iPhone');

    const devices = ['iPhone', 'Samsung', 'iPad'];

    const pricingData = {
        'iPhone': [
            { model: "iPhone 15 Pro Max", screen: "18,500", battery: "3,500", backGlass: "5,000" },
            { model: "iPhone 15 Pro", screen: "16,000", battery: "3,500", backGlass: "4,500" },
            { model: "iPhone 14 Pro Max", screen: "15,000", battery: "3,000", backGlass: "4,000" },
            { model: "iPhone 14 Pro", screen: "14,000", battery: "3,000", backGlass: "3,500" },
            { model: "iPhone 13 Pro Max", screen: "12,500", battery: "2,800", backGlass: "3,500" },
            { model: "iPhone 13", screen: "8,500", battery: "2,500", backGlass: "3,000" },
            { model: "iPhone 12 Pro", screen: "8,000", battery: "2,200", backGlass: "2,800" },
            { model: "iPhone 12", screen: "6,500", battery: "2,200", backGlass: "2,500" },
            { model: "iPhone 11", screen: "4,500", battery: "2,000", backGlass: "2,000" },
            { model: "iPhone X / XS", screen: "3,500", battery: "2,000", backGlass: "2,000" },
        ],
        'Samsung': [
            { model: "Galaxy S24 Ultra", screen: "22,000", battery: "4,000", backGlass: "5,500" },
            { model: "Galaxy S24+", screen: "18,000", battery: "3,800", backGlass: "4,500" },
            { model: "Galaxy S23 Ultra", screen: "20,000", battery: "3,500", backGlass: "5,000" },
            { model: "Galaxy S23", screen: "12,000", battery: "3,000", backGlass: "3,500" },
            { model: "Galaxy S22 Ultra", screen: "16,000", battery: "3,200", backGlass: "4,000" },
            { model: "Galaxy S21", screen: "8,000", battery: "2,500", backGlass: "2,800" },
            { model: "Galaxy Note 20", screen: "14,000", battery: "3,000", backGlass: "4,000" },
            { model: "Galaxy A54", screen: "5,000", battery: "2,000", backGlass: "2,000" },
        ],
        'iPad': [
            { model: "iPad Pro 12.9\"", screen: "25,000", battery: "5,000", backGlass: "—" },
            { model: "iPad Pro 11\"", screen: "20,000", battery: "4,500", backGlass: "—" },
            { model: "iPad Air 5th", screen: "15,000", battery: "4,000", backGlass: "—" },
            { model: "iPad 10th Gen", screen: "10,000", battery: "3,500", backGlass: "—" },
            { model: "iPad Mini 6", screen: "12,000", battery: "3,500", backGlass: "—" },
            { model: "iPad 9th Gen", screen: "7,000", battery: "3,000", backGlass: "—" },
        ]
    };

    const activePricing = pricingData[activeDevice];

    return (
        <section className="bg-gray-900 py-16 md:py-28 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-brand-orange uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Transparent Service</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Repair <span className="text-gray-400 font-light italic">Menu</span>
                    </h2>
                </div>

                {/* Elegant Tabs */}
                <div className="flex justify-center mb-12 md:mb-16">
                    <div className="flex gap-2">
                        {devices.map((device) => (
                            <button
                                key={device}
                                onClick={() => setActiveDevice(device)}
                                className={`px-6 py-2 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border-b-2 ${activeDevice === device
                                        ? 'border-brand-orange text-white'
                                        : 'border-transparent text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {device}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editorial Pricing Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
                    {activePricing.map((item, idx) => (
                        <div key={idx} className="flex flex-col py-4 border-b border-gray-800">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{item.model}</h3>
                                <div className="flex-grow border-b border-dotted border-gray-700 mx-4 mb-2"></div>
                                <span className="text-brand-orange font-bold text-lg md:text-xl">৳{item.screen} <span className="text-[10px] md:text-xs text-gray-500 font-normal ml-1">Screen</span></span>
                            </div>

                            <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400 font-medium tracking-wide">
                                <span>Battery: <span className="text-gray-300">৳{item.battery}</span></span>
                                {item.backGlass !== "—" && (
                                    <>
                                        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                        <span>Back Glass: <span className="text-gray-300">৳{item.backGlass}</span></span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:mt-20 text-center">
                    <p className="text-[10px] md:text-sm text-gray-500 italic">
                        All repairs include premium parts, labor, and a 3-month comprehensive warranty guarantee.
                    </p>
                </div>
            </div>
        </section>
    );
}
