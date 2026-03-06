import Image from 'next/image';
import Link from 'next/link';
import { getBlogs } from '../../lib/api';

export const metadata = {
    title: 'Blog & Tips | Cellfix',
    description: 'Expert advice to keep your devices running like new.',
};

export default async function BlogPage() {
    let posts = [];
    try {
        const res = await getBlogs();
        if (res?.success && Array.isArray(res.data)) {
            posts = res.data;
        }
    } catch (err) {
        console.error("Failed to load blogs", err);
    }

    // Fallback if API returns no blogs
    if (posts.length === 0) {
        posts = [
            { id: 1, title: "5 Signs Your Battery Needs Replacing", excerpt: "Is your phone dying fast? Here are the telltale signs.", imageUrl: "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?q=80&w=600", category: "Battery", readTime: "3 min", slug: "5-signs-your-battery-needs-replacing" },
            { id: 2, title: "How to Protect Your Screen From Cracks", excerpt: "Prevention is better than repair. Keep your screen safe.", imageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=600", category: "Screen", readTime: "4 min", slug: "how-to-protect-your-screen-from-cracks" },
            { id: 3, title: "Choosing the Right Charger", excerpt: "Wrong charger can damage your battery or slow charging.", imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=600", category: "Tips", readTime: "2 min", slug: "choosing-the-right-charger" },
            { id: 4, title: "Maximizing Your Phone's Lifespan", excerpt: "Simple habits that will keep your device healthy for years.", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600", category: "Guide", readTime: "5 min", slug: "maximizing-your-phones-lifespan" },
            { id: 5, title: "Water Damage: What to Do First", excerpt: "Act fast if you drop your phone in water. Follow these critical steps.", imageUrl: "https://images.unsplash.com/photo-1584006682522-dc17d6c0d06c?q=80&w=600", category: "Emergency", readTime: "2 min", slug: "water-damage-what-to-do-first" },
            { id: 6, title: "Is Refurbished Better Than New?", excerpt: "Comparing the pros and cons of buying refurbished smartphones.", imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600", category: "Buying Guide", readTime: "6 min", slug: "is-refurbished-better-than-new" },
        ];
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header section */}
            <div className="bg-gray-50 border-b border-gray-100 py-12 md:py-20 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a3b34] mb-4">
                        Our <span className="text-brand-orange">Blog & Tips</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto md:text-lg">
                        Expert advice, technical guides, and the latest news to help you get the most out of your devices.
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-orange/20 transition-all duration-300">
                            <div className="w-full aspect-[16/9] relative overflow-hidden bg-gray-100">
                                <Image
                                    src={post.image || post.imageUrl || post.image_path || "/no-image.svg"}
                                    alt={post.title}
                                    fill
                                    unoptimized
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-brand-orange text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {post.category || post.category_name || "Blog"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 md:p-6 flex flex-col flex-grow">
                                <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-3 leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                    {post.excerpt || post.short_description || "Read this full article to learn more tips and guides from our experts."}
                                </p>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-auto">
                                    {post.readTime || `${Math.max(2, Math.floor(Math.random() * 8))} min read`}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
