"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingCart, FiGrid, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const { cartCount, openCart } = useCart();

    const navItems = [
        { name: 'Home', href: '/', icon: FiHome },
        { name: 'Cart', href: '#', icon: FiShoppingCart, isCartToggle: true },
        { name: 'Categories', href: '/category', icon: FiGrid },
        { name: 'Login', href: '/profile', icon: FiUser },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 pb-safe">
            {/* Decorative top border strip matching the reference image's split colors */}
            <div className="flex w-full h-0.5 opacity-20">
                <div className="w-1/4 bg-white"></div>
                <div className="w-1/4 bg-white"></div>
                <div className="w-1/4 bg-white"></div>
                <div className="w-1/4 bg-white"></div>
            </div>

            <div className="flex justify-around items-center px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    const isCartItem = item.isCartToggle;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                if (isCartItem) {
                                    e.preventDefault();
                                    openCart();
                                }
                            }}
                            className={`flex flex-col items-center justify-center w-full gap-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white hover:text-gray-300'
                                }`}
                        >
                            <div className="relative">
                                <Icon size={20} className={isCartItem && cartCount > 0 ? "text-brand-orange" : ""} strokeWidth={isActive ? 2.5 : 2} />
                                {isCartItem && cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-gray-900">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-semibold tracking-wide">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
