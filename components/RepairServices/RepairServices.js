import Link from 'next/link';
import { BsTools, BsPhone, BsCpu, BsSmartwatch, BsLaptop, BsUnlock, BsTablet, BsChevronRight } from 'react-icons/bs';

const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('iphone')) return <BsPhone />;
  if (n.includes('watch')) return <BsSmartwatch />;
  if (n.includes('macbook') || n.includes('imac') || n.includes('laptop')) return <BsLaptop />;
  if (n.includes('ipad') || n.includes('tablet')) return <BsTablet />;
  if (n.includes('unlock')) return <BsUnlock />;
  if (n.includes('motherboard') || n.includes('ic')) return <BsCpu />;
  return <BsTools />;
};

export default function RepairServices({ categories = [] }) {
    // Filter for Repair/Unlock categories
    const repairCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes('repair') || 
        cat.name.toLowerCase().includes('unlock')
    );

    return (
        <section className="bg-gray-50 py-16 md:py-32 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-12 md:mb-24 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange text-xs md:text-sm font-bold uppercase tracking-widest mb-6 border border-brand-orange/20">
                        <BsTools /> Certified Technicians
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-none uppercase">
                        Expert <span className="text-brand-orange">Repair</span> Solutions
                    </h2>
                    <div className="h-1.5 w-24 bg-brand-orange rounded-full mx-auto mb-8"></div>
                    <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed italic">
                        "From micro-soldering to screen swaps, we handle every device with surgical precision."
                    </p>
                </div>

                {repairCategories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {repairCategories.map((cat) => {
                            const hasSubcats = cat.sub_category && cat.sub_category.length > 0;
                            const catSlug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-');
                            const linkTarget = `/services/${catSlug}`;

                            return (
                                <Link 
                                    key={cat.id || cat.category_id}
                                    href={linkTarget}
                                    className="group bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-transparent hover:border-brand-orange/20 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                                    
                                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-2xl md:rounded-3xl flex items-center justify-center text-4xl md:text-5xl text-gray-400 mb-6 group-hover:bg-brand-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm relative z-10">
                                        {getIcon(cat.name)}
                                    </div>
                                    
                                    <h3 className="text-lg md:text-xl font-black text-gray-800 group-hover:text-brand-orange transition-colors mb-2 line-clamp-2 relative z-10">
                                        {cat.name}
                                    </h3>
                                    
                                    <div className="mt-4 flex items-center gap-1 text-[10px] md:text-sm font-bold text-gray-400 group-hover:text-brand-orange transition-all duration-300 uppercase tracking-widest relative z-10">
                                        {hasSubcats ? 'Select Model' : 'No Service Available'} <BsChevronRight className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                        <BsTools className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No repair services available at the moment.</p>
                    </div>
                )}

                <div className="mt-12 md:mt-24 text-center">
                    <Link href="/services" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg uppercase tracking-wider hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/40 transition-all duration-300 group">
                        Browse All Services 
                        <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
