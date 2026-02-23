"use client";

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 text-gray-600 mt-auto">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-8 md:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8 mb-8 md:mb-12">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-3 md:gap-6 col-span-2 sm:col-span-1">
                        <Link href="/" className="inline-block">
                            <span className="text-xl md:text-3xl font-extrabold text-brand-orange tracking-tight">
                                Cellfix<span className="text-brand-blue">BD</span>
                            </span>
                        </Link>
                        <p className="text-[10px] md:text-sm leading-relaxed text-gray-500">
                            Bangladesh's most trusted mobile repair service and premium accessories shop.
                        </p>
                        <div className="flex flex-col gap-1.5 md:gap-2 text-[10px] md:text-sm">
                            <p className="flex gap-1 md:gap-2">
                                <strong className="text-gray-900">Address:</strong>
                                <span>Level-4, Block-C, Shop #35A, Jamuna Future Park</span>
                            </p>
                            <p className="flex gap-1 md:gap-2">
                                <strong className="text-gray-900">Phone:</strong>
                                <a href="tel:+8801714404100" className="hover:text-brand-orange transition-colors">+8801714404100</a>
                            </p>
                        </div>
                        <div className="flex gap-3 md:gap-4 mt-1">
                            <a href="https://facebook.com/cellfix.bd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook"><FaFacebook size={18} /></a>
                            <a href="https://instagram.com/cellfix.bd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors" aria-label="Instagram"><FaInstagram size={18} /></a>
                            <a href="https://youtube.com/@cellfixbd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors" aria-label="YouTube"><FaYoutube size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3 md:gap-6">
                        <h3 className="text-sm md:text-lg font-bold text-gray-900">Repair Services</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/services/iphone" className="hover:text-brand-orange transition-colors">iPhone Repair</Link>
                            <Link href="/services/macbook" className="hover:text-brand-orange transition-colors">MacBook Repair</Link>
                            <Link href="/services/apple-watch" className="hover:text-brand-orange transition-colors">Apple Watch</Link>
                            <Link href="/services/ipad" className="hover:text-brand-orange transition-colors">iPad Repair</Link>
                            <Link href="/services/android" className="hover:text-brand-orange transition-colors">Android Repair</Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="flex flex-col gap-3 md:gap-6">
                        <h3 className="text-sm md:text-lg font-bold text-gray-900">Shop</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/category/iphones" className="hover:text-brand-orange transition-colors">iPhones</Link>
                            <Link href="/category/macbooks" className="hover:text-brand-orange transition-colors">MacBooks</Link>
                            <Link href="/category/accessories" className="hover:text-brand-orange transition-colors">Accessories</Link>
                            <Link href="/category/used-phones" className="hover:text-brand-orange transition-colors">Used Phones</Link>
                            <Link href="/category/repair-tools" className="hover:text-brand-orange transition-colors">Repair Tools</Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-3 md:gap-6 col-span-2 sm:col-span-1">
                        <h3 className="text-sm md:text-lg font-bold text-gray-900">Stay Updated</h3>
                        <p className="text-[10px] md:text-sm text-gray-500">Subscribe for special offers and deals.</p>
                        <form className="flex flex-col gap-2 md:gap-3 relative" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-2 md:py-3 px-3 md:px-4 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all text-[10px] md:text-sm"
                                />
                                <button type="submit" className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-[10px] md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-md hover:bg-gray-800 transition-colors">
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[9px] md:text-xs font-medium text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Cellfix BD. All rights reserved.</p>
                    <div className="flex gap-4 md:gap-6">
                        <Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-brand-orange transition-colors">Terms</Link>
                        <Link href="/refund" className="hover:text-brand-orange transition-colors">Refund</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
