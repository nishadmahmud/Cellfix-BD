import Link from 'next/link';
import { BsPhone } from 'react-icons/bs';

export default function FeaturedProducts() {
    const products = [
        { title: "iPhone 15 Pro Max Silicon Case", price: "2,500 ৳", oldPrice: "3,000 ৳", tag: "-16%" },
        { title: "Momax 10000mAh Power Bank", price: "3,500 ৳", oldPrice: "4,000 ৳", tag: "-12%" },
        { title: "Anker USB-C to Lightning Cable", price: "1,299 ৳", oldPrice: "", tag: "New" },
        { title: "WiWU Screen Protector MacBook", price: "1,200 ৳", oldPrice: "", tag: "New" },
    ];

    return (
        <section className="bg-white py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Featured <span className="text-brand-orange">Products</span>
                        </h2>
                        <p className="text-gray-500 text-lg">Hand-picked premium accessories just for you.</p>
                    </div>
                    <Link href="/shop" className="text-sm font-bold text-gray-500 hover:text-brand-orange uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-orange">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product, idx) => (
                        <div key={idx} className="group bg-white rounded-2xl border border-gray-100 p-4 relative cursor-pointer hover:shadow-xl hover:shadow-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 flex flex-col">

                            {/* Product Tag */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    {product.tag}
                                </span>
                            </div>

                            {/* Image Placeholder */}
                            <div className="w-full bg-gray-50 aspect-square rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-orange-50/50 transition-colors">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-brand-orange"></div>
                                <BsPhone className="text-6xl text-gray-200 group-hover:text-brand-orange group-hover:scale-110 transition-all duration-500 relative z-10" />
                            </div>

                            {/* Details */}
                            <div className="flex flex-col flex-grow">
                                <h4 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">
                                    {product.title}
                                </h4>

                                <div className="mt-auto flex items-center gap-3">
                                    <span className="text-gray-900 font-extrabold text-xl">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="text-gray-400 font-medium text-sm line-through">
                                            {product.oldPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
