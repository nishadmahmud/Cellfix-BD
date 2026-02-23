import Link from 'next/link';
import Button from '../Button/Button';

export default function Hero() {
    return (
        <section className="flex flex-col md:flex-row w-full min-h-[600px] bg-white">
            {/* Repair Side */}
            <div className="flex-1 w-full bg-white relative flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute -left-20 -bottom-20 opacity-5 pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.21-.07.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="inline-block bg-brand-orange/10 text-brand-orange font-semibold py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-6">
                        Expert Repairs
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        We Fix It As Fast As You Can Break It.
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        From shattered screens to silent speakers, our certified technicians revive your devices using genuine spare parts and state-of-the-art tools.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/book-repair" className="inline-block">
                            <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                                Book a Repair
                            </button>
                        </Link>
                        <span className="text-sm font-medium text-gray-500 flex flex-col">
                            <span className="text-gray-900 font-bold">1-Hour</span> Turnaround
                        </span>
                    </div>
                </div>
            </div>

            {/* Shop Side */}
            <div className="flex-1 w-full bg-gray-50 relative flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-lg md:ml-auto">
                    <div className="inline-block bg-brand-blue/10 text-brand-blue font-semibold py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-6">
                        Premium Gadgets
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        Discover the Latest Tech & Accessories.
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Upgrade your lifestyle with our curated collection of smartphones, laptops, smartwatches, and high-quality protective gear.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/shop" className="inline-block">
                            <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-gray-900/30 transition-all transform hover:-translate-y-1">
                                Shop Deals
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
