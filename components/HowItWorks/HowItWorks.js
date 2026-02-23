export default function HowItWorks() {
    const steps = [
        { num: "01", title: "Get a free diagnostic", desc: "Tell us the problem. Get a free diagnostic check-up from us." },
        { num: "02", title: "Report & Estimation", desc: "We review the problem and give you a free estimate." },
        { num: "03", title: "Confirm Repair", desc: "If you're satisfied with pricing and scheduling, confirm the job." },
        { num: "04", title: "Repair in Progress", desc: "Depending on the problem, we get it repaired as fast as possible." },
        { num: "05", title: "Quality Check", desc: "We test your device to ensure everything works smoothly." },
        { num: "06", title: "Ready for Delivery", desc: "Get your precious device fixed and ready to use." },
    ];

    return (
        <section className="bg-white py-24 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        How <span className="text-brand-orange">Cellfix BD</span> Works
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Our transparent 6-step process ensures your device gets the best care possible, from drop-off to pickup.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col pt-8 sm:pt-0 sm:flex-row gap-6 group">
                            {/* Connected Line for desktop (visual) */}
                            {idx !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-[3.5rem] w-[calc(100%-1rem)] h-[2px] bg-gray-100 -z-10 group-hover:bg-brand-orange/20 transition-colors"></div>
                            )}

                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center text-xl font-black text-brand-orange group-hover:border-brand-orange group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                    {step.num}
                                </div>
                            </div>

                            <div className="flex flex-col pt-2">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
