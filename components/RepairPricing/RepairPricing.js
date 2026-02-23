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
        <section className="bg-gray-50 py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-6 md:mb-12">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        Repair <span className="text-brand-orange">Pricing</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
                        Transparent pricing. No hidden fees.
                    </p>
                </div>

                {/* Device Tabs */}
                <div className="flex justify-center mb-6 md:mb-10">
                    <div className="inline-flex bg-white rounded-lg md:rounded-xl p-1 md:p-1.5 shadow-sm border border-gray-100">
                        {devices.map((device) => (
                            <button
                                key={device}
                                onClick={() => setActiveDevice(device)}
                                className={`px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-md md:rounded-lg transition-all duration-200 ${activeDevice === device
                                        ? 'bg-brand-orange text-white shadow-md shadow-orange-200'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {device}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing Table */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                        <thead>
                            <tr className="bg-gray-900 text-white text-[10px] md:text-sm font-bold uppercase tracking-wider">
                                <th className="px-3 md:px-6 py-3 md:py-4 text-left">Model</th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">Screen</th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">Battery</th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">Back Glass</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activePricing.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={`text-xs md:text-base border-b border-gray-50 hover:bg-orange-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                        }`}
                                >
                                    <td className="px-3 md:px-6 py-2.5 md:py-4 font-semibold text-gray-900">{item.model}</td>
                                    <td className="px-3 md:px-6 py-2.5 md:py-4 text-center font-bold text-brand-orange">৳{item.screen}</td>
                                    <td className="px-3 md:px-6 py-2.5 md:py-4 text-center font-bold text-gray-700">৳{item.battery}</td>
                                    <td className="px-3 md:px-6 py-2.5 md:py-4 text-center font-bold text-gray-700">
                                        {item.backGlass === "—" ? "—" : `৳${item.backGlass}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 md:mt-8 text-center">
                    <p className="text-[10px] md:text-sm text-gray-400">
                        * Prices may vary. Contact us for an exact quote.
                    </p>
                </div>
            </div>
        </section>
    );
}
