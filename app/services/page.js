import Link from 'next/link';
import { getCategoriesFromServer } from '../../lib/api';
import { BsTools, BsPhone, BsCpu, BsSmartwatch, BsLaptop, BsUnlock, BsTablet, BsChevronRight } from 'react-icons/bs';

export const metadata = {
  title: 'Professional Repair Services | Cellfix BD',
  description: 'Expert repair services for iPhones, MacBooks, Watches and more. Fast, reliable, and professional.',
};

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

export default async function ServicesPage() {
  let categories = [];
  try {
    const res = await getCategoriesFromServer();
    if (res?.success && res?.data) {
      categories = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch categories for services page:", error);
  }

  // Filter for Repair/Unlock categories
  const repairCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes('repair') || 
    cat.name.toLowerCase().includes('unlock')
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-orange py-12 md:py-24 text-white px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest mb-6">Expert Solutions</span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-none">
            Our <span className="text-gray-900">Services</span>
          </h1>
          <div className="h-1.5 w-32 bg-white rounded-full mb-8"></div>
          <p className="text-base md:text-2xl text-white/90 font-medium max-w-2xl px-4 leading-relaxed">
            Select a service category below to find your specific device model.
          </p>
        </div>
      </section>

      {/* Categories Grid (Restored to original requested layout) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
        {repairCategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {repairCategories.map((cat) => {
              // Always route repair categories to /services/[slug].
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
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl text-gray-300 mx-auto mb-8 shadow-inner">
              <BsTools />
            </div>
            <h3 className="text-2xl font-black text-gray-900">No services found.</h3>
            <p className="text-gray-500 mt-3 max-w-sm mx-auto font-medium">We're updating our service list. Please check back soon or contact us directly.</p>
          </div>
        )}
      </div>

      {/* Trust Section */}
      <section className="bg-white py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gray-900 rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="text-center mb-16 md:mb-24 relative z-10">
                <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">Trust the Experts</h2>
                <div className="h-1.5 w-24 bg-brand-orange rounded-full mx-auto mb-8"></div>
                <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-medium">Over a decade of experience in repairing premium electronics with a 99% success rate.</p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 relative z-10">
                {[
                  { label: 'Years Experience', val: '10+' },
                  { label: 'Happy Clients', val: '50k+' },
                  { label: 'Service Warranty', val: '180 Days' },
                  { label: 'Original Parts', val: '100%' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl md:text-7xl font-black text-brand-orange mb-3 tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-[0.3em]">{stat.label}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
