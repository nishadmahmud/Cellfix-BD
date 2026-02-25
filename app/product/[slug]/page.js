"use client";

import { useParams } from 'next/navigation';
import ProductGallery from '../../../components/Product/ProductGallery';
import ProductInfo from '../../../components/Product/ProductInfo';
import ProductTabs from '../../../components/Product/ProductTabs';
import ProductCard from '../../../components/Shared/ProductCard';

export default function ProductDetailsPage() {
    const params = useParams();
    const productName = decodeURIComponent(params.slug || 'Product')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Mock Data for the PDP
    const productData = {
        name: params.slug === 'iphone-16-plus' ? 'iPhone 16 Plus' : productName,
        price: '৳ 102,000',
        oldPrice: '৳ 110,000',
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800',
            'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800',
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800'
        ],
        variants: {
            storage: ['128GB', '256GB', '512GB'],
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'Pink', hex: '#ffc0cb' },
                { name: 'White', hex: '#ffffff' },
                { name: 'Ultramarine', hex: '#120a8f' },
            ],
            regions: ['Singapore', 'India']
        },
        description: `
            <p><strong>Samsung</strong> has officially launched the Galaxy A36 5G in March 2025. This device brings a sleek and modern design with a 6.7-inch Super AMOLED display that offers 120Hz refresh rate and HDR10+ support for a smooth and vibrant viewing experience. Powered by the Snapdragon 6 Gen 3 chipset, it ensures efficient performance for gaming and multitasking. The 50MP triple-camera setup with OIS and 4K video recording delivers sharp and stable images. A 5000mAh battery with 45W fast charging keeps you powered throughout the day. With IP67 water resistance and Gorilla Glass Victus+ protection, the Galaxy A36 5G is built to last.</p>
            <br/>
            <h3>Key Features</h3>
            <p>Under the hood, it runs on a powerful processor built on an efficient architecture. With an Octa-Core CPU, multitasking is a breeze. From mobile gaming to running multiple apps simultaneously, this phone can handle it all without breaking a sweat. Paired with 8GB of RAM and 128GB of internal storage, you get enough power and space for all your apps, media, and more. And if that's not enough, there's always the cloud or expandable options to keep you going.</p>
        `,
        specifications: `
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Display:</strong> 6.7-inch Super AMOLED (120Hz)</li>
                <li><strong>Processor:</strong> Snapdragon 6 Gen 3</li>
                <li><strong>Rear Camera:</strong> 50MP OIS + 8MP Ultrawide + 5MP Macro</li>
                <li><strong>Front Camera:</strong> 32MP</li>
                <li><strong>Battery:</strong> 5000mAh with 45W Fast Charging</li>
                <li><strong>OS:</strong> Android 14, One UI 6</li>
            </ul>
        `
    };

    // Mock Related Products
    const relatedProducts = [
        { id: 101, name: "Apple 20W USB-C Power Adapter", price: "৳ 2,200", oldPrice: "৳ 2,800", discount: "৳ 600", imageUrl: "https://images.unsplash.com/photo-1610945431131-c4214c7183e9?q=80&w=600" },
        { id: 102, name: "Baseus 65W GaN Charger", price: "৳ 3,500", oldPrice: "৳ 4,500", discount: "৳ 1,000", imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600" },
        { id: 103, name: "Samsung Galaxy A55 5G", price: "৳ 45,500", oldPrice: "৳ 52,200", discount: "৳ 6,700", imageUrl: "https://images.unsplash.com/photo-1610945431131-c4214c7183e9?q=80&w=600" },
        { id: 104, name: "Samsung Galaxy S24 Ultra Back Cover", price: "৳ 1,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1695504236952-1ee7e3bb6dfc?q=80&w=600" },
    ];

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Breadcrumb Header */}
            <div className="border-b border-gray-100 bg-gray-50/50 py-3 md:py-4 mb-6 md:mb-10">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-[11px] md:text-sm text-gray-500 flex items-center gap-2">
                        <span className="hover:text-[#1a3b34] cursor-pointer">Home</span> /
                        <span className="hover:text-[#1a3b34] cursor-pointer">Shop</span> /
                        <span className="text-brand-orange font-semibold capitalize truncate">{productData.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* 2-Column Top Layout */}
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Col 1: Gallery (40% on Desktop, 50% iPad) */}
                    <div className="w-full md:w-1/2 lg:w-[40%] shrink-0">
                        <ProductGallery images={productData.images} />
                    </div>

                    {/* Col 2: Info (60% on Desktop, 50% iPad) */}
                    <div className="w-full md:w-1/2 lg:w-[60%]">
                        <ProductInfo product={productData} />
                    </div>
                </div>

                {/* Bottom: Tabs */}
                <ProductTabs
                    description={productData.description}
                    specifications={productData.specifications}
                />

                {/* Related Products Section */}
                <div className="mt-16 md:mt-24 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3b34] mb-8 text-center md:text-left">
                        Related Products
                    </h2>

                    {/* Reusing ProductGrid for display, omitting the onOpenFilter/sort headers since this is just a short list */}
                    {/* We can hide the top bar via CSS or just map cards directly for simplicity */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                        {relatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
