"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin, FiMenu, FiX, FiMic, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
        {/* Top Bar - Hidden on mobile */}
        <div className="bg-gray-900 text-gray-300 text-xs py-2 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><FiPhone className="text-brand-orange" /> +8801714404100</span>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-2"><FiMapPin className="text-brand-orange" /> Level-4, Block-C, Shop #35A, Jamuna Future Park, Dhaka</span>
            </div>
            <div className="flex gap-4 font-medium">
              <Link href="/track-order" className="text-brand-orange font-bold hover:text-orange-300 transition-colors">Track Order</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-brand-orange py-2 md:py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 gap-2 md:gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <span className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
                Cellfix<span className="text-brand-blue">BD</span>
              </span>
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <div className="flex-grow flex items-center bg-gray-50 md:bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm focus-within:ring-2 focus-within:ring-white/50 transition-all mx-1 md:mx-4">
              <FiSearch size={16} className="text-gray-400 mr-2 md:mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search gadget"
                className="flex-grow bg-transparent border-none outline-none text-[13px] md:text-sm text-gray-800 min-w-0"
              />
              <button className="text-gray-400 hover:text-brand-orange transition-colors flex items-center justify-center p-1 flex-shrink-0 border-l border-gray-200 ml-2 pl-2 md:border-none md:ml-0 md:pl-0">
                <FiMic size={16} />
              </button>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-8 font-semibold text-white/90">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="hover:text-white transition-colors">Repair Services</Link>
              <Link href="/shop" className="hover:text-white transition-colors">Shop Gadgets</Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex gap-4 items-center">
              <button onClick={handleUserClick} className="text-white hover:text-white/80 transition-colors p-1" aria-label="Account">
                {user?.image ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white/50">
                    <Image src={user.image} alt="Profile" width={28} height={28} className="w-full h-full object-cover" unoptimized />
                  </div>
                ) : user ? (
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white/50">
                    {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FiUser size={22} />
                )}
              </button>
              <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-1" aria-label="Cart">
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-brand-orange text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-white hover:text-white/80 transition-colors p-1.5 flex-shrink-0"
              aria-label="Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* Desktop Category Strip */}
        <div className="hidden md:block bg-white py-3 text-sm border-b border-gray-100 shadow-sm relative z-40">
          <div className="max-w-7xl mx-auto flex gap-6 px-6 overflow-x-auto whitespace-nowrap items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="font-bold text-gray-500 text-sm">Categories:</span>
            <Link href="/category/iphones" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">iPhones</Link>
            <Link href="/category/macbooks" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">MacBooks</Link>
            <Link href="/category/accessories" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">Accessories</Link>
            <Link href="/category/chargers" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">Chargers</Link>
            <Link href="/category/Phones" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">Used Phones</Link>
            <Link href="/category/repair-tools" className="text-brand-orange font-bold hover:opacity-80 transition-opacity">Repair Tools</Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Sidebar Header */}
        <div className="bg-brand-orange p-4 flex justify-between items-center text-white">
          <span className="text-2xl font-extrabold tracking-tight">Cellfix<span className="text-brand-blue">BD</span></span>
          <button onClick={closeSidebar} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Quick Actions */}
        <div className="flex border-b border-gray-100">
          <button onClick={() => { closeSidebar(); handleUserClick(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 border-r border-gray-100 text-gray-600 hover:text-brand-orange hover:bg-orange-50/50 transition-colors">
            {user?.image ? (
              <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-brand-orange/40">
                <Image src={user.image} alt="Profile" width={28} height={28} className="w-full h-full object-cover" unoptimized />
              </div>
            ) : user ? (
              <div className="w-7 h-7 rounded-full bg-brand-orange/10 flex items-center justify-center text-xs font-bold text-brand-orange ring-2 ring-brand-orange/30">
                {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
              </div>
            ) : (
              <FiUser size={20} />
            )}
            <span className="text-xs font-bold">{user ? 'Profile' : 'Login'}</span>
          </button>
          <button onClick={() => { closeSidebar(); openCart(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-brand-orange hover:bg-orange-50/50 transition-colors relative border-none">
            <div className="relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </div>
            <span className="text-xs font-bold">Cart</span>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-4 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">Main Menu</div>
          <Link href="/" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>Home</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/services" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>Repair Services</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/shop" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>Shop Gadgets</span><FiChevronRight size={16} className="text-gray-400" />
          </Link>
          <Link href="/track-order" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 font-semibold border-b border-gray-50 text-brand-orange bg-orange-50/50 hover:bg-orange-50">
            <span>Track Order</span><FiChevronRight size={16} className="text-brand-orange" />
          </Link>

          <div className="px-4 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 flex items-center gap-2">
            <FiGrid /> Categories
          </div>
          <Link href="/category/iphones" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>iPhones</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/macbooks" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>MacBooks</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/accessories" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>Accessories</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/chargers" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>Chargers</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
          <Link href="/category/Phones" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30">
            <span>Used Phones</span><FiChevronRight size={14} className="text-gray-400" />
          </Link>
        </div>

      </div>
    </>
  );
}
