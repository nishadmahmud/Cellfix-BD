import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts() {
    const products = [
        {
            title: "iPhone 15 Pro Max Silicon Case",
            price: "2,500 ৳",
            oldPrice: "3,000 ৳",
            tag: "-16%",
            imageUrl: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=600"
        },
        {
            title: "Momax 10000mAh Power Bank",
            price: "3,500 ৳",
            oldPrice: "4,000 ৳",
            tag: "-12%",
            imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600"
        },
        {
            title: "Anker USB-C to Lightning Cable",
            price: "1,299 ৳",
            oldPrice: "",
            tag: "New",
            imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600"
        },
        {
            title: "WiWU Screen Protector MacBook",
            price: "1,200 ৳",
            oldPrice: "",
            tag: "New",
            imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600"
        },
        {
            title: "Baseus 20W Fast Charger",
            price: "1,800 ৳",
            oldPrice: "2,500 ৳",
            tag: "-28%",
            imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=600"
        },
        {
            title: "Apple MagSafe Charger",
            price: "4,500 ৳",
            oldPrice: "5,500 ৳",
            tag: "-18%",
            imageUrl: "https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=600"
        },
        {
            title: "Samsung Galaxy Buds 2 Pro",
            price: "12,500 ৳",
            oldPrice: "15,000 ৳",
            tag: "-17%",
            imageUrl: "https://images.unsplash.com/photo-1606220588913-b3eea4eceb24?q=80&w=600"
        },
        {
            title: "Premium Leather Wallet Case",
            price: "1,500 ৳",
            oldPrice: "2,500 ৳",
            tag: "-40%",
            imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600"
        },
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
                    {products.map((product, idx) => (
                        <div key={idx} className="group bg-white rounded-xl md:rounded-2xl border border-gray-100 p-2.5 md:p-4 relative cursor-pointer hover:shadow-xl hover:border-brand-orange/30 transition-all duration-300 flex flex-col">
                            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                                <span className="bg-brand-orange text-white text-[8px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    {product.tag}
                                </span>
                            </div>
                            <div className="w-full bg-gray-50 aspect-square rounded-lg md:rounded-xl mb-2 md:mb-6 relative overflow-hidden group-hover:bg-orange-50/50 transition-colors">
                                <Image src={product.imageUrl} alt={product.title} fill unoptimized className="object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h4 className="text-gray-900 font-bold text-[11px] md:text-lg mb-1 md:mb-3 line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">
                                    {product.title}
                                </h4>
                                <div className="mt-auto flex items-center gap-1.5 md:gap-3">
                                    <span className="text-gray-900 font-extrabold text-sm md:text-xl">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="text-gray-400 font-medium text-[10px] md:text-sm line-through">{product.oldPrice}</span>
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
