import Link from 'next/link';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
      {/* Top Bar for Contact Info - Lighter presentation */}
      <div className="bg-gray-50 text-gray-600 text-xs py-2 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><FiPhone className="text-brand-orange" /> +8801714404100</span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-2"><FiMapPin className="text-brand-orange" /> Level-4, Block-C, Shop #35A, Jamuna Future Park, Dhaka</span>
          </div>
          <div className="hidden md:flex gap-4 font-medium">
            <Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 md:px-6 gap-4">

          <Link href="/" className="flex items-center">
            <span className="text-3xl font-extrabold text-brand-orange tracking-tight">
              Cellfix<span className="text-brand-blue">BD</span>
            </span>
          </Link>

          <div className="flex-grow max-w-lg flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus-within:border-brand-orange focus-within:bg-white transition-colors order-3 md:order-none w-full md:w-auto">
            <input
              type="text"
              placeholder="Search for repairs, accessories..."
              className="flex-grow bg-transparent border-none outline-none text-sm text-gray-800"
            />
            <button className="text-brand-orange hover:opacity-80 transition-opacity flex items-center justify-center p-1">
              <FiSearch size={18} />
            </button>
          </div>

          <nav className="hidden lg:flex gap-8 font-semibold text-gray-700">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <Link href="/services" className="hover:text-brand-orange transition-colors">Repair Services</Link>
            <Link href="/shop" className="hover:text-brand-orange transition-colors">Shop Gadgets</Link>
          </nav>

          <div className="flex gap-4 items-center">
            <button className="text-gray-700 hover:text-brand-orange transition-colors p-1" aria-label="Account">
              <FiUser size={22} />
            </button>
            <button className="text-gray-700 hover:text-brand-orange transition-colors relative p-1" aria-label="Cart">
              <FiShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Strip */}
      <div className="bg-white py-3 text-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-6 px-4 md:px-6 overflow-x-auto whitespace-nowrap items-center">
          <span className="font-bold text-gray-500">All Categories:</span>
          <Link href="/category/iphones" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">iPhones</Link>
          <Link href="/category/macbooks" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">MacBooks</Link>
          <Link href="/category/accessories" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">Accessories</Link>
          <Link href="/category/chargers" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">Chargers</Link>
          <Link href="/category/used-phones" className="text-gray-700 font-medium hover:text-brand-orange transition-colors">Used Phones</Link>
          <Link href="/category/repair-tools" className="text-brand-orange font-bold hover:opacity-80 transition-opacity">Repair Tools</Link>
        </div>
      </div>
    </header>
  );
}
