"use client";

import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
    const reviews = [
        { id: 1, name: "Rahim Ahmed", role: "iPhone User", rating: 5, text: "Screen replaced in 45 minutes. Quality is indistinguishable from original. Top-notch!", avatar: "R" },
        { id: 2, name: "Tasnia Farin", role: "MacBook User", rating: 5, text: "Fixed my MacBook's liquid damage when everyone said it was dead. Data fully recovered!", avatar: "T" },
        { id: 3, name: "Imran Khan", role: "Samsung User", rating: 4, text: "Bought a used Galaxy S23 in pristine condition. Fair price, came with warranty.", avatar: "I" },
        { id: 4, name: "Nusrat Jahan", role: "iPhone User", rating: 5, text: "Battery replacement done while I waited. Professional staff, genuine parts. 100% recommended.", avatar: "N" },
        { id: 5, name: "Sakib Hasan", role: "iPad User", rating: 5, text: "iPad screen cracked badly. They replaced it perfectly. Touch response is flawless!", avatar: "S" },
        { id: 6, name: "Maliha Rahman", role: "Accessory Buyer", rating: 4, text: "Ordered an Anker power bank online. Super fast delivery. Everything original!", avatar: "M" },
    ];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-6 md:mb-14">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        What Our <span className="text-brand-orange">Customers</span> Say
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto hidden sm:block">
                        Trusted by thousands of customers across Bangladesh.
                    </p>
                </div>

                {/* Horizontal scroll on mobile, grid on desktop */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3 md:gap-8 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-8 shadow-sm hover:shadow-lg hover:border-brand-orange/20 transition-all duration-300 flex flex-col min-w-[240px] md:min-w-0 flex-shrink-0">
                            <div className="flex gap-0.5 mb-2 md:mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-[10px] md:text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-6 flex-grow line-clamp-3">"{review.text}"</p>
                            <div className="flex items-center gap-2 md:gap-3 mt-auto pt-3 md:pt-4 border-t border-gray-50">
                                <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-[10px] md:text-sm">{review.avatar}</div>
                                <div>
                                    <h4 className="text-[11px] md:text-sm font-bold text-gray-900">{review.name}</h4>
                                    <p className="text-[9px] md:text-xs text-gray-400">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
