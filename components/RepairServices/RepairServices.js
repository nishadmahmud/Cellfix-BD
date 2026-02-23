import Link from 'next/link';
import { BsPhone, BsBatteryCharging, BsDroplet, BsMotherboard, BsBoundingBox, BsPersonVideo } from 'react-icons/bs';

export default function RepairServices() {
    const services = [
        { title: "Cracked Screens", desc: "Advanced technologies to replace screens like brand new.", icon: <BsPhone /> },
        { title: "Battery Replacement", desc: "Original battery collection for all Apple/Samsung models.", icon: <BsBatteryCharging /> },
        { title: "Liquid Damage", desc: "Professional logic board cleaning and data recovery.", icon: <BsDroplet /> },
        { title: "Motherboard Repair", desc: "Micro-soldering and complex IC level repairs.", icon: <BsMotherboard /> },
        { title: "Back Glass", desc: "Laser machine back glass removal and replacement.", icon: <BsBoundingBox /> },
        { title: "Face ID Rescue", desc: "Restoring broken Face ID and TrueDepth camera.", icon: <BsPersonVideo /> }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-6 border-b border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        We Make <span className="text-brand-orange">Mobile Repair</span> Stress Free
                    </h2>
                    <p className="text-lg text-gray-500">
                        From simple screen swaps to complex motherboard logic board repair, no one beats our success rate in Bangladesh.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="group bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-brand-orange/50 transition-all duration-300 cursor-pointer">
                            <div className="w-16 h-16 mx-auto mb-6 bg-orange-50 rounded-full flex items-center justify-center text-3xl text-brand-orange group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/services" className="inline-flex items-center justify-center font-bold text-brand-orange hover:text-orange-700 underline underline-offset-4 decoration-2 decoration-brand-orange/30 hover:decoration-brand-orange transition-all">
                        View All Repair Services &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
