import Link from 'next/link';
import Button from '../Button/Button';
import { FiSmartphone, FiMonitor, FiWatch, FiHeadphones, FiShield, FiBatteryCharging, FiZap, FiRefreshCcw } from 'react-icons/fi';

export default function ShopCategories() {
    const categories = [
        { name: "iPhones", icon: <FiSmartphone /> },
        { name: "MacBooks", icon: <FiMonitor /> },
        { name: "Smart Watches", icon: <FiWatch /> },
        { name: "Audio", icon: <FiHeadphones /> },
        { name: "Cases & Covers", icon: <FiShield /> },
        { name: "Fast Chargers", icon: <FiZap /> },
        { name: "Power Banks", icon: <FiBatteryCharging /> },
        { name: "Used Phones", icon: <FiRefreshCcw /> },
    ];

    return (
        <section className="bg-white py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Shop by <span className="text-brand-orange">Categories</span>
                    </h2>
                    <Link href="/shop" className="text-sm font-bold text-gray-500 hover:text-brand-orange uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-orange">
                        See All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-20">
                    {categories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                            key={idx}
                            className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center hover:-translate-y-1 hover:border-brand-orange hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 group"
                        >
                            <div className="text-4xl text-gray-400 group-hover:text-brand-orange transition-colors">
                                {cat.icon}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Flash Sale Banner Placeholder */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                            <h3 className="text-3xl md:text-4xl font-extrabold whitespace-nowrapflex items-center gap-3">
                                <span className="text-brand-orange">🔥</span> Flash Sale
                            </h3>
                            <div className="flex gap-3">
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex flex-col items-center min-w-[70px]">
                                    <span className="text-2xl font-black leading-none mb-1">12</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-300">Hours</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex flex-col items-center min-w-[70px]">
                                    <span className="text-2xl font-black leading-none mb-1">45</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-300">Mins</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex flex-col items-center min-w-[70px]">
                                    <span className="text-2xl font-black leading-none mb-1">06</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-300">Secs</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-4 text-left md:text-right">
                            <p className="text-lg text-gray-300 font-medium">Up to <span className="text-brand-orange font-bold text-xl">50% OFF</span> on select accessories and gadgets.</p>
                            <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* Decorative bg elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>
                </div>

            </div>
        </section>
    );
}
