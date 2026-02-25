import Link from 'next/link';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts() {
    const products = [
        { id: 1, name: "iPhone 15 Pro Max Silicon Case", price: "৳2,500", oldPrice: "৳3,000", discount: "-16%", imageUrl: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=600" },
        { id: 2, name: "Momax 10000mAh Power Bank", price: "৳3,500", oldPrice: "৳4,000", discount: "-12%", imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600" },
        { id: 3, name: "Anker USB-C to Lightning Cable", price: "৳1,299", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600" },
        { id: 4, name: "WiWU Screen Protector MacBook", price: "৳1,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600" },
        { id: 5, name: "Baseus 20W Fast Charger", price: "৳1,800", oldPrice: "৳2,500", discount: "-28%", imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=600" },
        { id: 6, name: "Apple MagSafe Charger", price: "৳4,500", oldPrice: "৳5,500", discount: "-18%", imageUrl: "https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=600" },
        { id: 7, name: "Samsung Galaxy Buds 2 Pro", price: "৳12,500", oldPrice: "৳15,000", discount: "-17%", imageUrl: "https://images.unsplash.com/photo-1606220588913-b3eea4eceb24?q=80&w=600" },
        { id: 8, name: "Premium Leather Wallet Case", price: "৳1,500", oldPrice: "৳2,500", discount: "-40%", imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600" },
    ];

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
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
