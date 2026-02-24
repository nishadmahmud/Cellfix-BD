import { MdVerifiedUser, MdOutlineEngineering, MdLocalShipping, MdShield } from 'react-icons/md';

export default function TrustStats() {
    const stats = [
        { label: "100% Genuine", icon: <MdVerifiedUser />, counter: "15,000+", counterLabel: "Sold" },
        { label: "Certified Experts", icon: <MdOutlineEngineering />, counter: "8,500+", counterLabel: "Repaired" },
        { label: "Fast Delivery", icon: <MdLocalShipping />, counter: "4.9★", counterLabel: "Rating" },
        { label: "Warranty", icon: <MdShield />, counter: "3 Mo", counterLabel: "Guarantee" }
    ];

    return (
        <section className="bg-white py-8 md:py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center p-6 md:p-8 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                            {/* Icon Container */}
                            <div className="mb-4 text-brand-orange bg-white p-3 md:p-4 rounded-xl shadow-sm border border-orange-100/50">
                                <div className="text-3xl md:text-4xl">{stat.icon}</div>
                            </div>

                            {/* Counter Area */}
                            <div className="text-center mb-1">
                                <span className="block text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">
                                    {stat.counter}
                                </span>
                                <span className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    {stat.counterLabel}
                                </span>
                            </div>

                            {/* Divider & Label */}
                            <div className="w-8 h-0.5 bg-brand-orange/20 my-3 rounded-full hidden md:block"></div>
                            <span className="text-xs md:text-sm font-semibold text-gray-600 hidden sm:block text-center">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
