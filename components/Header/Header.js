"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiPhone, FiMapPin, FiSearch, FiMic, FiUser, FiShoppingCart, FiMenu, FiX, FiChevronRight, FiGrid } from 'react-icons/fi';
import { searchProducts } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header({ categories = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');
  const [hoveredCatIdx, setHoveredCatIdx] = useState(null);
  const [activeSubIdx, setActiveSubIdx] = useState(0);

  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();
  const closeTimeout = useRef(null);

  const handleCatEnter = (idx) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setHoveredCatIdx(idx);
    setActiveSubIdx(0);
  };

  const handleCatLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setHoveredCatIdx(null);
    }, 150); // 150ms buffer to reach the modal
  };

  const handleModalEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const defaultCategories = [
    { name: "iPhones", slug: "iphones" },
    { name: "MacBooks", slug: "macbooks" },
    { name: "Accessories", slug: "accessories" },
    { name: "Chargers", slug: "chargers" },
    { name: "Used Phones", slug: "Phones" }
  ];

  const displayCategories = (categories && categories.length > 0 ? categories : defaultCategories).slice(0, 7);

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  const runSearch = async (q) => {
    if (!q) {
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    setIsSearchOpen(true);
    setIsSearching(true);
    setSearchError('');

    try {
      const res = await searchProducts(q);
      const payload = res?.data || res;
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

      const mapped = items.map((p) => {
        const basePrice = Number(p.retails_price || p.discounted_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = String(p.discount_type || '').toLowerCase();
        const hasDiscount = discountValue > 0 && discountType !== '0';

        const price = hasDiscount
          ? discountType === 'percentage'
            ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
            : Math.max(0, basePrice - discountValue)
          : basePrice;

        const discountLabel = hasDiscount
          ? discountType === 'percentage'
            ? `-${discountValue}%`
            : `৳ ${discountValue.toLocaleString('en-IN')}`
          : null;

        const imageUrl =
          p.image_path ||
          p.image_path1 ||
          p.image_path2 ||
          (Array.isArray(p.image_paths) && p.image_paths[0]) ||
          '/no-image.svg';

        return {
          id: p.id,
          name: p.name,
          price: `৳ ${price.toLocaleString('en-IN')}`,
          oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString('en-IN')}` : null,
          discount: discountLabel,
          imageUrl,
          brand: p.brands?.name || '',
          categoryName: p.category?.name || 'Others',
        };
      });

      setSearchResults(mapped);

      const categorySet = new Set(mapped.map((m) => m.categoryName));
      const cats = Array.from(categorySet).sort();
      setSearchCategories(cats);
      setActiveSearchCategory('all');
    } catch (err) {
      console.error('Search failed', err);
      setSearchError('Something went wrong while searching. Please try again.');
      setSearchResults([]);
      setSearchCategories([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    runSearch(q);
  };

  // Debounce search when user stops typing
  useEffect(() => {
    const q = searchQuery.trim();

    if (!q) {
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    const timeout = setTimeout(() => {
      runSearch(q);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  const filteredSearchResults = useMemo(() => {
    if (activeSearchCategory === 'all') return searchResults;
    return searchResults.filter((p) => p.categoryName === activeSearchCategory);
  }, [searchResults, activeSearchCategory]);

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
        <div className="bg-brand-orange py-2 md:py-4 relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 gap-2 md:gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 bg-white rounded-lg px-2 py-1 shadow-sm">
              <Image 
                src="/LOGO-Cellfix-BD.png" 
                alt="CellfixBD Logo" 
                width={150} 
                height={40} 
                className="h-8 md:h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center bg-gray-50 md:bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm focus-within:ring-2 focus-within:ring-white/50 transition-all mx-1 md:mx-4">
              <FiSearch size={16} className="text-gray-400 mr-2 md:mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gadget"
                className="flex-grow bg-transparent border-none outline-none text-[13px] md:text-sm text-gray-800 min-w-0"
              />
              <button type="submit" className="text-gray-400 hover:text-brand-orange transition-colors flex items-center justify-center p-1 flex-shrink-0 border-l border-gray-200 ml-2 pl-2 md:border-none md:ml-0 md:pl-0">
                <FiMic size={16} />
              </button>
            </form>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-8 font-semibold text-white/90">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="hover:text-white transition-colors">Repair Services</Link>
              <Link href="/category" className="hover:text-white transition-colors">Shop Gadgets</Link>
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

          {/* Global Search Results Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-[100%] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 max-h-[70vh] flex flex-col pt-3 pb-0 border-t">
              {isSearching ? (
                <div className="p-12 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
                </div>
              ) : searchError ? (
                <div className="p-8 text-center text-red-500">{searchError}</div>
              ) : searchResults.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No products found matching &quot;{searchQuery}&quot;</div>
              ) : (
                <div className="flex flex-col md:flex-row h-full overflow-hidden">
                  {/* Search Sidebar (Categories) */}
                  <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 overflow-y-auto">
                    <div className="p-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => setActiveSearchCategory('all')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSearchCategory === 'all'
                              ? 'bg-brand-orange text-white font-semibold'
                              : 'text-gray-600 hover:bg-orange-50 hover:text-brand-orange'
                              }`}
                          >
                            All Results ({searchResults.length})
                          </button>
                        </li>
                        {searchCategories.map(cat => {
                          const count = searchResults.filter(p => p.categoryName === cat).length;
                          return (
                            <li key={cat}>
                              <button
                                onClick={() => setActiveSearchCategory(cat)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${activeSearchCategory === cat
                                  ? 'bg-brand-orange text-white font-semibold'
                                  : 'text-gray-600 hover:bg-orange-50 hover:text-brand-orange'
                                  }`}
                              >
                                <span className="truncate pr-2">{cat}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSearchCategory === cat ? 'bg-white/20' : 'bg-gray-200'
                                  }`}>{count}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Search Results Grid */}
                  <div className="flex-1 overflow-y-auto p-4 bg-white" style={{ maxHeight: '60vh' }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">
                        {activeSearchCategory === 'all' ? 'All Products' : activeSearchCategory}
                      </h3>
                      <button
                        onClick={closeSearchModal}
                        className="text-xs text-brand-orange hover:underline"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredSearchResults.map(product => (
                        <Link
                          key={product.id}
                          href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                          onClick={closeSearchModal}
                          className="group flex flex-col border border-gray-100 rounded-xl hover:shadow-md transition-shadow p-3 hover:border-brand-orange/30"
                        >
                          <div className="aspect-square relative bg-gray-50 rounded-lg mb-3 overflow-hidden">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                            {product.discount && (
                              <div className="absolute top-2 left-2 bg-[#ff2a3b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                {product.discount}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col">
                            <span className="text-[10px] font-semibold text-brand-orange mb-1">
                              {product.brand}
                            </span>
                            <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-brand-blue transition-colors">
                              {product.name}
                            </h4>
                            <div className="mt-auto flex items-baseline gap-1.5 flex-wrap">
                              <span className="font-bold text-[#ff2a3b]">{product.price}</span>
                              {product.oldPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  {product.oldPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Category Strip */}
        <div className="hidden md:block bg-white py-3 text-sm border-b border-gray-100 shadow-sm relative z-40">
          <div 
            className="max-w-7xl mx-auto flex flex-wrap gap-2 px-6 items-center"
            onMouseLeave={handleCatLeave}
          >
            <span className="font-bold text-gray-500 text-sm flex-shrink-0 mr-2">Categories:</span>
            {displayCategories.map((cat, idx) => {
              const subCats = cat.sub_category || [];
              const hasSubCats = subCats.length > 0;
              return (
                <div
                  key={cat.id || cat.category_id || idx}
                  className="relative"
                  onMouseEnter={() => handleCatEnter(idx)}
                >
                  <Link
                    href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`font-semibold text-xs px-4 py-1.5 rounded-full inline-flex items-center gap-1 transition-all duration-200 shadow-sm hover:shadow-md ${
                      hoveredCatIdx === idx
                        ? 'bg-brand-orange text-white'
                        : 'bg-brand-orange/90 hover:bg-brand-orange text-white'
                    }`}
                  >
                    {cat.name}
                    {hasSubCats && <span className="text-[9px] text-white/70">▾</span>}
                  </Link>
                </div>
              );
            })}

            {/* Global Mega Menu Container */}
            {hoveredCatIdx !== null && displayCategories[hoveredCatIdx]?.sub_category?.length > 0 && (
              <>
                {/* Backdrop Blur overlay */}
                <div className="fixed inset-0 top-[180px] bg-black/10 backdrop-blur-[2px] z-40 pointer-events-none transition-opacity duration-300" />

                {/* Two-panel Mega Menu logic moved outside loop */}
                <div 
                  className="absolute top-full left-0 right-0 z-50 pt-2 px-6"
                  onMouseEnter={handleModalEnter}
                  onMouseLeave={handleCatLeave}
                >
                  <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-2 border-brand-orange overflow-hidden rounded-b-2xl">
                    <div className="flex" style={{ minHeight: '300px', maxHeight: '60vh' }}>
                      {/* Left: Subcategory List (Sidebar) */}
                      <div className="w-64 bg-gray-50/50 border-r border-gray-100 flex-shrink-0 overflow-y-auto py-4">
                        <div className="px-5 mb-3">
                          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]">Subcategories</h3>
                        </div>
                        <ul className="space-y-0.5 px-2">
                          {displayCategories[hoveredCatIdx].sub_category.map((sub, sIdx) => (
                            <li key={sub.id}>
                              <button
                                onMouseEnter={() => setActiveSubIdx(sIdx)}
                                onClick={() => { setHoveredCatIdx(null); router.push(`/subcategory/${sub.id}`); }}
                                className={`w-full text-left px-4 py-2.5 text-[13px] rounded-lg transition-all duration-200 flex justify-between items-center group/item ${
                                  activeSubIdx === sIdx
                                    ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20'
                                    : 'text-gray-600 hover:bg-orange-50 hover:text-brand-orange font-medium'
                                }`}
                              >
                                <span className="truncate">{sub.name}</span>
                                <div className="flex items-center gap-2">
                                  {sub.child_categories && sub.child_categories.length > 0 && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md flex-shrink-0 transition-colors ${
                                      activeSubIdx === sIdx ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400 group-hover/item:bg-brand-orange/10 group-hover/item:text-brand-orange'
                                    }`}>{sub.child_categories.length}</span>
                                  )}
                                  <FiChevronRight className={`text-[12px] transition-transform duration-200 ${
                                    activeSubIdx === sIdx ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100'
                                  }`} />
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Child Categories (Content) */}
                      <div className="flex-1 overflow-y-auto bg-white">
                        {displayCategories[hoveredCatIdx].sub_category[activeSubIdx] && (
                          <div className="p-8">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                              <div>
                                <h3 className="text-xl font-black text-gray-900 mb-1">{displayCategories[hoveredCatIdx].sub_category[activeSubIdx].name}</h3>
                                <p className="text-xs text-gray-400 font-medium">Explore all products in this category</p>
                              </div>
                              <Link
                                href={`/subcategory/${displayCategories[hoveredCatIdx].sub_category[activeSubIdx].id}`}
                                onClick={() => setHoveredCatIdx(null)}
                                className="px-4 py-2 rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 text-xs font-bold flex items-center gap-2"
                              >
                                Shop All Products <FiChevronRight />
                              </Link>
                            </div>

                            {displayCategories[hoveredCatIdx].sub_category[activeSubIdx].child_categories && displayCategories[hoveredCatIdx].sub_category[activeSubIdx].child_categories.length > 0 ? (
                              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {displayCategories[hoveredCatIdx].sub_category[activeSubIdx].child_categories.map(child => (
                                  <Link
                                    key={child.id}
                                    href={`/child-category/${child.id}`}
                                    onClick={() => setHoveredCatIdx(null)}
                                    className="group/child flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-brand-orange/20 hover:bg-orange-50/30 transition-all duration-300 shadow-sm hover:shadow-md"
                                  >
                                    <span className="text-[13px] font-bold text-gray-700 group-hover/child:text-brand-orange transition-colors">
                                      {child.name}
                                    </span>
                                    <FiChevronRight className="text-gray-300 group-hover/child:text-brand-orange group-hover/child:translate-x-1 transition-all" />
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                  <FiGrid size={24} />
                                </div>
                                <h4 className="text-gray-900 font-bold mb-1">More items coming soon</h4>
                                <p className="text-sm text-gray-400 max-w-xs mx-auto">We're currently updating our catalog for this category. Check back soon for new arrivals!</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
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
          <Link href="/" onClick={closeSidebar} className="bg-white rounded-lg px-2 py-1 shadow-sm">
            <Image 
              src="/LOGO-Cellfix-BD.png" 
              alt="CellfixBD Logo" 
              width={120} 
              height={32} 
              className="h-8 w-auto object-contain"
            />
          </Link>
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
          <div className="flex flex-col">
            {displayCategories.map((cat, idx) => (
              <Link
                key={cat.id || idx}
                href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={closeSidebar}
                className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 border-b border-gray-50 hover:text-brand-orange hover:bg-orange-50/30"
              >
                <span>{cat.name}</span><FiChevronRight size={14} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
