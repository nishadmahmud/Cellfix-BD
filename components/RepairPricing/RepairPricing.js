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
        <section className="bg-gray-50 py-16 md:py-28 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-brand-orange uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Transparent Service</span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
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
                                        ? 'border-brand-orange text-gray-900'
                                        : 'border-transparent text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                {device}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Pricing Layout */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full transition-all duration-300">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-5 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Device Model</th>
                                    <th className="px-6 py-5 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-right md:text-left">Screen Repair</th>
                                    <th className="px-6 py-5 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-right md:text-left">Battery</th>
                                    <th className="px-6 py-5 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-right md:text-left">Back Glass</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {activePricing.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-brand-orange/5 transition-colors group">
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-base md:text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand-orange transition-colors">
                                                {item.model}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right md:text-left whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1">
                                                <span className="text-brand-orange text-sm font-bold">৳</span>
                                                <span className="font-bold text-gray-900 text-base md:text-lg">{item.screen}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right md:text-left whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1">
                                                <span className="text-gray-400 text-sm">৳</span>
                                                <span className="font-semibold text-gray-700 text-base">{item.battery}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right md:text-left whitespace-nowrap">
                                            {item.backGlass !== "—" ? (
                                                <span className="inline-flex items-center gap-1">
                                                    <span className="text-gray-400 text-sm">৳</span>
                                                    <span className="font-semibold text-gray-700 text-base">{item.backGlass}</span>
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 font-medium inline-block w-full md:w-auto text-center md:text-left md:pl-4">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
