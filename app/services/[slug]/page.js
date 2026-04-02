import Link from 'next/link';
import { getCategoriesFromServer } from '../../../lib/api';
import { BsTools, BsPhone, BsCpu, BsSmartwatch, BsLaptop, BsUnlock, BsTablet, BsChevronRight } from 'react-icons/bs';
import { redirect } from 'next/navigation';
import { IPHONE_MODELS } from '../../../lib/repairMenuData';

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${decodedSlug} Models | Cellfix BD`,
    description: `Select your ${decodedSlug} model for professional repair services at Cellfix BD.`,
  };
}

export default async function ServicesSubcategoryPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  let category = null;

  try {
    const res = await getCategoriesFromServer();
    if (res?.success && res?.data) {
      // Find the category matching the slug
      category = res.data.find(c => {
         let catSlug;
         if (c.slug) {
             catSlug = c.slug.toLowerCase();
         } else if (c.name) {
             catSlug = c.name.toLowerCase().replace(/\s+/g, '-');
         }
         
         if (catSlug === decodedSlug) return true;
         // fallback check without dashes just in case
         if (c.name && c.name.toLowerCase() === decodedSlug.replace(/-/g, ' ')) return true;
         
         return false;
      });
      
      if (!category) {
          console.log("FAILED TO FIND CATEGORY FOR SLUG:", slug, "DECODED:", decodedSlug);
          console.log("AVAILABLE CATS:", res.data.filter(c => c.name.toLowerCase().includes('repair')).map(c => c.name));
      }
    }
  } catch (error) {
    console.error("Failed to fetch categories for services subcategory page:", error);
  }

  // If category not found, or it has no subcategories, redirect to its product page
  if (!category) {
      redirect('/services');
  }

  const isIphoneRepairCategory =
    category.name?.toLowerCase().includes('iphone') ||
    decodedSlug.includes('iphone');
  const hasSubcategories = Array.isArray(category.sub_category) && category.sub_category.length > 0;
  const hasModelList = isIphoneRepairCategory || hasSubcategories;
  const modelItems = isIphoneRepairCategory
    ? IPHONE_MODELS.map((model) => ({
        id: model.slug,
        name: model.name,
        href: `/services/${slug}/${model.slug}`,
      }))
    : category.sub_category.map((sub) => ({
        id: sub.id,
        name: sub.name,
        href: `/category/${slug}?subcategory=${sub.id}`,
      }));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Area */}
      <div className="bg-brand-orange py-12 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-4xl md:text-5xl backdrop-blur-sm border border-white/20">
             {getIcon(category.name)}
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-white/70 uppercase tracking-widest mb-2">
               <Link href="/services" className="hover:text-white transition-colors">Services</Link> 
               <span>/</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              {category.name} <span className="text-white/80 font-medium lowercase">models</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {hasModelList ? (
          <>
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-3">Select Your Device</h2>
              <p className="text-gray-500 font-medium">
                {isIphoneRepairCategory
                  ? 'Choose your iPhone model to view the full repair menu and pricing.'
                  : 'Choose your model to view available repair options and pricing.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {modelItems.map((item) => (
                <Link 
                  key={item.id}
                  href={item.href}
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-brand-orange/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl md:text-3xl text-gray-400 mb-4 group-hover:bg-orange-50 group-hover:text-brand-orange transition-colors duration-300">
                    {getIcon(category.name)}
                  </div>
                  
                  <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-brand-orange transition-colors mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 w-full flex items-center justify-center gap-1 text-[10px] md:text-xs font-bold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
                    View Services <BsChevronRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl text-gray-300 mx-auto mb-6 shadow-inner">
              <BsTools />
            </div>
            <h2 className="text-2xl font-black text-gray-900">No service available for this category.</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto font-medium">
              We currently do not have model-wise services listed for {category.name}. Please check again later.
            </p>
            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors text-sm font-bold"
              >
                Back to Services <BsChevronRight size={12} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
