import Link from 'next/link';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts({ products: apiProducts = [] }) {
    const displayProducts = apiProducts;

    if (displayProducts.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-8 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-3 tracking-tight">
                            Featured <span className="text-brand-orange">Products</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">Hand-picked premium accessories just for you.</p>
                    </div>
                    <Link href="/shop" className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-orange uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-orange whitespace-nowrap">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-8">
                    {displayProducts.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
