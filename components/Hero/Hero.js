"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero({ slides: apiSlides = [], banners = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const defaultSlides = [
        {
            id: 1,
            badge: "Expert Repairs",
            title: "Fast & Reliable Fixes",
            desc: "Genuine parts and certified technicians for all your devices.",
            ctaText: "Book Repair",
            ctaLink: "/book-repair",
            imageUrl: "https://images.unsplash.com/photo-1611396000732-f8c9a933424f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            badge: "Screen Replacement",
            title: "Flawless Screen Repairs",
            desc: "Bring your shattered displays back to life in under an hour.",
            ctaText: "Learn More",
            ctaLink: "/services",
            imageUrl: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            badge: "Premium Gadgets",
            title: "The Latest Tech",
            desc: "Upgrade to the newest smartphones, laptops, and wearables.",
            ctaText: "Shop Gadgets",
            ctaLink: "/category",
            imageUrl: "https://images.unsplash.com/photo-1697545806245-9795b6056141?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            badge: "Exclusive Offers",
            title: "Up to 50% Off Accessories",
            desc: "Grab limited-time deals on chargers, power banks, and cases.",
            ctaText: "View Offers",
            ctaLink: "/category/accessories",
            imageUrl: "https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const displaySlides = apiSlides.length > 0
        ? apiSlides.map((s, idx) => ({
            ...defaultSlides[idx % defaultSlides.length],
            id: `api-${idx}`,
            imageUrl: s.image
        }))
        : defaultSlides;

    useEffect(() => {
        if (displaySlides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displaySlides.length]);

    if (displaySlides.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-white">
            <div className="relative w-full overflow-hidden h-[210px] sm:h-[300px] md:h-[420px]">
                {displaySlides.map((slide, idx) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <Image
                            src={slide.imageUrl || "/no-image.svg"}
                            alt={slide.title || "Hero Banner"}
                            fill
                            unoptimized
                            className="object-cover object-center z-0"
                            priority={idx === 0}
                        />
                    </div>
                ))}
                <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {displaySlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full border border-white/70 transition-all duration-300 ${currentSlide === idx ? 'bg-white scale-110' : 'bg-transparent hover:bg-white/40'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
