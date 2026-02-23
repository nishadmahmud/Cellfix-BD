import { MdVerifiedUser, MdOutlineEngineering, MdLocalShipping, MdShield } from 'react-icons/md';

export default function TrustStats() {
    const stats = [
        { label: "100% Genuine Products", icon: <MdVerifiedUser /> },
        { label: "Certified Repair Specialists", icon: <MdOutlineEngineering /> },
        { label: "Super Fast Delivery", icon: <MdLocalShipping /> },
        { label: "Warranty on Repairs", icon: <MdShield /> }
    ];

    return (
        <section className="bg-white py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-4 py-4 px-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-brand-orange/30 transition-all duration-300">
                            <div className="text-3xl text-brand-orange">{stat.icon}</div>
                            <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
