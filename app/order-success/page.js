"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiPackage, FiHome, FiMessageCircle } from 'react-icons/fi';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const invoice = searchParams.get('invoice') || 'N/A';

    return (
        <div className="min-h-[85vh] bg-white flex items-center justify-center p-4">
            <div className="max-w-xl w-full text-center">
                {/* Success Animation / Icon */}
                <div className="mb-8 relative inline-block">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-bounce-slow">
                        <FiCheckCircle size={64} className="md:w-16 md:h-16" />
                    </div>
                    {/* Decorative Rings */}
                    <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping-slow"></div>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                    Order <span className="text-green-500">Confirmed!</span>
                </h1>
                
                <p className="text-gray-500 md:text-lg mb-8 max-w-sm mx-auto font-medium">
                    Thank you for choosing Cellfix BD. We've received your order and are processing it.
                </p>

                {/* Invoice Card */}
                <div className="bg-gray-50 rounded-[2.5rem] p-6 md:p-10 border border-gray-100 mb-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>
                    
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">Invoice Number</span>
                        <div className="text-2xl md:text-3xl font-black text-gray-900 selection:bg-green-100">
                            #{invoice}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                        href="/track-order" 
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-300 group"
                    >
                        <FiPackage size={18} />
                        Track Order
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link 
                        href="/" 
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 border-2 border-gray-100 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-gray-50 hover:border-gray-200 transition-all duration-300"
                    >
                        <FiHome size={18} />
                        Return Home
                    </Link>
                </div>

                {/* Support Section */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center">
                    <p className="text-sm text-gray-400 font-medium mb-4 italic">Need help with your order?</p>
                    <a 
                        href="https://wa.me/8801714404100" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-brand-orange font-bold hover:text-orange-600 transition-colors"
                    >
                        <FiMessageCircle size={20} />
                        Chat with Support
                    </a>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(-5%); }
                    50% { transform: translateY(0); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                @keyframes ping-slow {
                    75%, 100% { transform: scale(1.5); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
