"use client";

import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 text-gray-600 mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-extrabold text-brand-orange tracking-tight">
                                Cellfix<span className="text-brand-blue">BD</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Bangladesh's most trusted mobile and gadget repair service. We also offer a premium selection of authentic accessories and devices.
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <p className="flex gap-2">
                                <strong className="text-gray-900">Address:</strong>
                                <span>Level-4, Block-C, Shop #35A<br />Jamuna Future Park, Dhaka-1229</span>
                            </p>
                            <p className="flex gap-2">
                                <strong className="text-gray-900">Phone:</strong>
                                <a href="tel:+8801714404100" className="hover:text-brand-orange transition-colors">+8801714404100</a>
                            </p>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <a href="https://facebook.com/cellfix.bd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                                <FaFacebook size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-900">Repair Services</h3>
                        <div className="flex flex-col gap-3 text-sm">
                            <Link href="/services/iphone" className="hover:text-brand-orange transition-colors">iPhone Repair</Link>
                            <Link href="/services/macbook" className="hover:text-brand-orange transition-colors">MacBook Repair</Link>
                            <Link href="/services/apple-watch" className="hover:text-brand-orange transition-colors">Apple Watch Repair</Link>
                            <Link href="/services/ipad" className="hover:text-brand-orange transition-colors">iPad Repair</Link>
                            <Link href="/services/android" className="hover:text-brand-orange transition-colors">Android Repair</Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-900">Shop Categories</h3>
                        <div className="flex flex-col gap-3 text-sm">
                            <Link href="/category/iphones" className="hover:text-brand-orange transition-colors">New iPhones</Link>
                            <Link href="/category/macbooks" className="hover:text-brand-orange transition-colors">MacBooks</Link>
                            <Link href="/category/accessories" className="hover:text-brand-orange transition-colors">Accessories</Link>
                            <Link href="/category/used-phones" className="hover:text-brand-orange transition-colors">Used Phones</Link>
                            <Link href="/category/repair-tools" className="hover:text-brand-orange transition-colors">Repair Tools</Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-900">Stay Updated</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex flex-col gap-3 relative" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-3 px-4 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all text-sm"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-sm px-4 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Cellfix BD. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-brand-orange transition-colors">Terms of Service</Link>
                        <Link href="/refund" className="hover:text-brand-orange transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
