"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function NewArrivals() {
    const products = [
        { id: 1, name: "iPhone 15 Pro Max - 256GB", price: "৳175,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: "৳165,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600" },
        { id: 3, name: "Apple Watch Ultra 2", price: "৳95,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600" },
        { id: 4, name: "AirPods Pro 2nd Gen", price: "৳28,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1606220588913-b3eea4eceb24?q=80&w=600" },
        { id: 5, name: "MacBook Air M3 - 15\"", price: "৳185,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600" },
        { id: 6, name: "iPad Pro M4 - 11\"", price: "৳140,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600" },
        { id: 7, name: "Google Pixel 8 Pro", price: "৳92,000", tag: "NEW", imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600" },
        { id: 8, name: "Nothing Phone 2", price: "৳55,000", tag: "HOT", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" },
    ];

    return (
        <section className="bg-white py-8 md:py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-5 md:mb-10 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-2 tracking-tight">
                            New <span className="text-brand-orange">Arrivals</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">Just landed. Get the latest tech before anyone else.</p>
                    </div>
                    <Link href="/shop?sort=newest" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-orange uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-orange whitespace-nowrap">
                        View All
                    </Link>
                </div>

                <div className="flex overflow-x-auto gap-3 md:gap-5 pb-2 flex-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-100 rounded-xl md:rounded-2xl p-2.5 md:p-4 min-w-[140px] w-[140px] md:min-w-[260px] md:w-[260px] flex-shrink-0 flex flex-col relative group cursor-pointer hover:shadow-xl hover:border-brand-orange/30 transition-all duration-300"
                        >
                            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                                <span className={`text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-wider shadow-sm ${product.tag === 'HOT' ? 'bg-red-500' : 'bg-green-500'
                                    }`}>
                                    {product.tag}
                                </span>
                            </div>
                            <div className="w-full aspect-square bg-gray-50 rounded-lg md:rounded-xl mb-2 md:mb-4 relative overflow-hidden">
                                <Image src={product.imageUrl} alt={product.name} fill unoptimized className="object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h4 className="text-gray-900 font-bold text-[11px] md:text-base mb-1 md:mb-2 line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">{product.name}</h4>
                                <span className="mt-auto text-gray-900 font-extrabold text-sm md:text-lg">{product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
