import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BsChevronRight } from 'react-icons/bs';
import { getCategoriesFromServer } from '../../../../lib/api';
import { getIphoneModelBySlug, getServiceMenuForIphoneModel } from '../../../../lib/repairMenuData';

export async function generateMetadata({ params }) {
  const { model } = await params;
  const selectedModel = getIphoneModelBySlug(model);

  if (!selectedModel) {
    return {
      title: 'Repair Services | Cellfix BD',
      description: 'Professional repair services and pricing at Cellfix BD.',
    };
  }

  return {
    title: `${selectedModel.name} Repair Menu | Cellfix BD`,
    description: `Service menu and pricing for ${selectedModel.name} repairs at Cellfix BD.`,
  };
}

export default async function IPhoneModelRepairMenuPage({ params }) {
  const { slug, model } = await params;
  const selectedModel = getIphoneModelBySlug(model);

  if (!selectedModel) {
    redirect(`/services/${slug}`);
  }

  let category = null;
  try {
    const res = await getCategoriesFromServer();
    if (res?.success && res?.data) {
      const decodedSlug = decodeURIComponent(slug).toLowerCase();
      category = res.data.find((c) => {
        const catSlug = c.slug ? c.slug.toLowerCase() : c.name?.toLowerCase().replace(/\s+/g, '-');
        if (catSlug === decodedSlug) return true;
        if (c.name && c.name.toLowerCase() === decodedSlug.replace(/-/g, ' ')) return true;
        return false;
      });
    }
  } catch (error) {
    console.error('Failed to fetch categories for iPhone repair menu page:', error);
  }

  if (!category) {
    redirect('/services');
  }

  const isIphoneRepairCategory =
    category.name?.toLowerCase().includes('iphone') ||
    decodeURIComponent(slug).toLowerCase().includes('iphone');

  if (!isIphoneRepairCategory) {
    redirect(`/services/${slug}`);
  }

  const serviceMenu = getServiceMenuForIphoneModel(model);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-orange py-12 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-white/70 uppercase tracking-widest mb-3">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services/${slug}`} className="hover:text-white transition-colors">
              {category.name}
            </Link>
            <span>/</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {selectedModel.name} <span className="text-white/80 font-medium">Repair Menu</span>
          </h1>
          <p className="mt-3 text-white/90 font-medium">
            Static service list for now. Prices are adjusted by model tier.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {serviceMenu.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-24 bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                No image
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.4rem]">
                  {service.title}
                </h3>
                <p className="mt-2 text-base font-extrabold text-gray-900">
                  Tk {service.price.toLocaleString('en-IN')}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={`/services/${slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors text-sm font-bold"
          >
            Back to Models <BsChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
