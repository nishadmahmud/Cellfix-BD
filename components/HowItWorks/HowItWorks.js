export default function HowItWorks() {
    const steps = [
        { num: "01", title: "Free Diagnostic", desc: "Tell us the problem. Get a free check-up." },
        { num: "02", title: "Estimate", desc: "We review and give a free estimate." },
        { num: "03", title: "Confirm", desc: "Satisfied with pricing? Confirm the job." },
        { num: "04", title: "Repair", desc: "We fix it as fast as possible." },
        { num: "05", title: "QC Check", desc: "Tested to ensure everything works." },
        { num: "06", title: "Delivery", desc: "Device fixed and ready to use." },
    ];

    return (
        <section className="bg-white py-10 md:py-24 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        How <span className="text-brand-orange">Cellfix BD</span> Works
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
                        Our transparent 6-step process ensures your device gets the best care.
                    </p>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-8 md:gap-y-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center md:items-start md:flex-row gap-2 md:gap-6 group text-center md:text-left">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center text-sm md:text-xl font-black text-brand-orange group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300">
                                    {step.num}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-xs md:text-xl font-bold text-gray-900 mb-0.5 md:mb-2">{step.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-[9px] md:text-sm hidden sm:block">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
