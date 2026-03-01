import Link from "next/link";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { Target, Handshake, Rocket, Smartphone, Laptop, ShoppingCart, Wrench } from "lucide-react";

export const metadata = {
    title: "About Us | CellfixBD",
    description: "Learn about CellfixBD — Bangladesh's most trusted mobile repair service and premium gadget shop at Jamuna Future Park, Dhaka.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
            {/* Hero */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-brand-orange/20 text-brand-orange text-xs font-bold rounded-full mb-4 border border-brand-orange/20">ABOUT US</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">We Fix. We Sell. <span className="text-brand-orange">We Care.</span></h1>
                    <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        CellfixBD is Bangladesh's trusted destination for professional mobile repair and premium gadgets. Located at Jamuna Future Park, Dhaka — we&apos;ve been serving thousands of happy customers.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-6">
                {/* Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                    {[
                        { title: "Our Mission", desc: "To provide world-class device repair services and genuine accessories at affordable prices, ensuring every customer leaves satisfied.", gradient: "from-blue-500 to-blue-600", icon: <Target className="w-7 h-7 text-white" /> },
                        { title: "Our Promise", desc: "Quality parts, expert technicians, transparent pricing, and a hassle-free warranty on every repair. No hidden charges, ever.", gradient: "from-brand-orange to-orange-500", icon: <Handshake className="w-7 h-7 text-white" /> },
                        { title: "Our Vision", desc: "To be Bangladesh's #1 one-stop shop for all things mobile — from repairs and accessories to premium gadgets and refurbished devices.", gradient: "from-emerald-500 to-teal-600", icon: <Rocket className="w-7 h-7 text-white" /> },
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>{card.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* What We Do */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {[
                            { title: "Mobile Repair", desc: "iPhone, Android, tablet, iPad, and Apple Watch repairs by certified technicians using genuine parts.", icon: <Smartphone className="w-5 h-5 text-brand-orange" /> },
                            { title: "MacBook Service", desc: "Logic board repair, screen replacement, battery service, and complete diagnostics for all MacBook models.", icon: <Laptop className="w-5 h-5 text-brand-orange" /> },
                            { title: "Gadget Shop", desc: "Brand new and certified pre-owned iPhones, accessories, chargers, cases, screen protectors, and more.", icon: <ShoppingCart className="w-5 h-5 text-brand-orange" /> },
                            { title: "Repair Tools", desc: "Professional-grade repair tools and kits for technicians and DIY enthusiasts.", icon: <Wrench className="w-5 h-5 text-brand-orange" /> },
                        ].map((item, i) => (
                            <div key={i} className="p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-orange/30 transition-colors">
                                <h4 className="font-bold text-gray-900 mb-1.5 flex items-center gap-2">{item.icon}{item.title}</h4>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">Why Choose CellfixBD?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                        {[
                            { stat: "10,000+", label: "Devices Repaired", color: "text-blue-600" },
                            { stat: "99%", label: "Customer Satisfaction", color: "text-green-600" },
                            { stat: "3+", label: "Years Experience", color: "text-brand-orange" },
                            { stat: "90 Days", label: "Repair Warranty", color: "text-purple-600" },
                        ].map((item, i) => (
                            <div key={i} className="p-4">
                                <p className={`text-2xl md:text-3xl font-extrabold ${item.color} mb-1`}>{item.stat}</p>
                                <p className="text-xs md:text-sm text-gray-500 font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visit Us */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-10 text-white">
                    <h2 className="text-2xl font-extrabold mb-6">Visit Our Store</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FiMapPin className="text-brand-orange mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <p className="font-semibold">Address</p>
                                    <p className="text-white/70 text-sm">Level-4, Block-C, Shop #35A, Jamuna Future Park, Dhaka-1229</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FiPhone className="text-brand-orange mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <a href="tel:+8801714404100" className="text-white/70 text-sm hover:text-white">+880 1714-404100</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FiMail className="text-brand-orange mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a href="mailto:support@cellfixbd.com" className="text-white/70 text-sm hover:text-white">support@cellfixbd.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FiClock className="text-brand-orange mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <p className="font-semibold">Hours</p>
                                    <p className="text-white/70 text-sm">Saturday – Thursday: 10 AM – 9 PM<br />Friday: 2 PM – 9 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl overflow-hidden h-48 md:h-auto bg-gray-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.4315!3d23.8136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJamuna+Future+Park!5e0!3m2!1sen!2sbd!4v1630000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "200px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="CellfixBD Location"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
