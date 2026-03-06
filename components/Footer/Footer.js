"use client";

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-brand-orange border-t border-brand-orange/50 text-white/90 mt-auto">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-8 md:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8 mb-8 md:mb-12">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-3 md:gap-6 col-span-2 sm:col-span-1">
                        <Link href="/" className="inline-block">
                            <span className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
                                Cellfix<span className="text-brand-blue">BD</span>
                            </span>
                        </Link>
                        <p className="text-[10px] md:text-sm leading-relaxed text-white/80">
                            Bangladesh's most trusted mobile repair service and premium accessories shop.
                        </p>
                        <div className="flex flex-col gap-1.5 md:gap-2 text-[10px] md:text-sm text-white/90">
                            <p className="flex gap-1 md:gap-2">
                                <strong className="text-white">Address:</strong>
                                <span>Level-4, Block-C, Shop #35A, Jamuna Future Park</span>
                            </p>
                            <p className="flex gap-1 md:gap-2">
                                <strong className="text-white">Phone:</strong>
                                <a href="tel:+8801714404100" className="hover:text-white/70 transition-colors">+8801714404100</a>
                            </p>
                        </div>
                        <div className="flex gap-3 md:gap-4 mt-1">
                            <a href="https://facebook.com/cellfix.bd" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Facebook"><FaFacebook size={18} /></a>
                            <a href="https://instagram.com/cellfix.bd" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Instagram"><FaInstagram size={18} /></a>
                            <a href="https://youtube.com/@cellfixbd" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="YouTube"><FaYoutube size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3 md:gap-6">
                        <h3 className="text-sm md:text-lg font-bold text-white">Explore</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/shop" className="hover:text-white/70 transition-colors">Shop Gadgets</Link>
                            <Link href="/services" className="hover:text-white/70 transition-colors">Repair Services</Link>
                            <Link href="/blog" className="hover:text-white/70 transition-colors">Blog & Tips</Link>
                            <Link href="/track-order" className="hover:text-white/70 transition-colors">Track Your Order</Link>
                            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact Us</Link>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div className="flex flex-col gap-3 md:gap-6">
                        <h3 className="text-sm md:text-lg font-bold text-white">Top Categories</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/category/phones" className="hover:text-white/70 transition-colors">Phones</Link>
                            <Link href="/category/tablet" className="hover:text-white/70 transition-colors">Tablets</Link>
                            <Link href="/category/laptop" className="hover:text-white/70 transition-colors">Laptops</Link>
                            <Link href="/category/smart-watch" className="hover:text-white/70 transition-colors">Smart Watches</Link>
                            <Link href="/category/accessories" className="hover:text-white/70 transition-colors">Accessories</Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col gap-3 md:gap-6 col-span-2 sm:col-span-1">
                        <h3 className="text-sm md:text-lg font-bold text-white">Company</h3>
                        <div className="flex flex-col gap-1.5 md:gap-3 text-[10px] md:text-sm">
                            <Link href="/about" className="hover:text-white/70 transition-colors">About Us</Link>
                            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms & Conditions</Link>
                            <Link href="/refund" className="hover:text-white/70 transition-colors">Refund Policy</Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-white/10 bg-gray-900">
                <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[9px] md:text-xs font-medium text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Cellfix BD. All rights reserved.</p>
                    <div className="flex gap-4 md:gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/refund" className="hover:text-white transition-colors">Refund</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
