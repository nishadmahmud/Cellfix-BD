"use client";

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
    const phoneNumber = "8801714404100";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-6 bottom-40 md:bottom-20 z-[999] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            aria-label="Contact us on WhatsApp"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <FaWhatsapp className="text-2xl md:text-3xl relative z-10" />
            
            {/* Tooltip for desktop */}
            <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat on WhatsApp
            </span>
        </a>
    );
}
