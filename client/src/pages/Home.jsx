import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Search, Award } from "lucide-react";
import { useState } from "react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Home() {
    const [query, setQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(query)}`;
        }
    };

    return (
        <section className="relative bg-gradient-to-br from-green-50 to-green-100 min-h-[75vh] flex items-center">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center px-6 py-16">
                {/* Left Animated Content */}
                <motion.div
                    className="space-y-7"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h1
                        className="text-5xl font-extrabold tracking-tight text-green-900 leading-tight"
                        variants={item}
                    >
                        Your Trusted Agrovet Partner
                    </motion.h1>
                    <motion.p
                        className="text-xl text-green-700 max-w-lg"
                        variants={item}
                    >
                        The best in veterinary supplies and farm inputs, delivered fairly and sustainably. We empower farmers for a better tomorrow.
                    </motion.p>
                    <motion.form
                        className="flex gap-2 pt-2"
                        onSubmit={handleSearch}
                        variants={item}
                        role="search"
                        aria-label="Find products"
                    >
                        <input
                            className="w-full px-4 py-3 rounded-2xl border border-green-300 text-green-900 text-base focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            placeholder="Search veterinary products, feeds, tools..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            aria-label="Product search"
                        />
                        <button
                            type="submit"
                            className="flex items-center px-5 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition font-semibold"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Search
                        </button>
                    </motion.form>
                    <motion.div className="flex gap-5 pt-4" variants={item}>
                        <Link
                            to="/products"
                            className="px-6 py-3 rounded-2xl bg-green-600 text-white text-lg font-semibold hover:bg-green-700 transition shadow-lg"
                        >
                            Shop Products
                        </Link>
                        <Link
                            to="/services"
                            className="px-6 py-3 rounded-2xl border border-green-600 text-green-700 text-lg font-semibold hover:bg-green-50 transition shadow"
                        >
                            Our Services
                        </Link>
                    </motion.div>
                    {/* Trust badge */}
                    <motion.div
                        className="mt-10 flex items-center gap-4 text-green-900"
                        variants={item}
                    >
                        <div className="bg-white p-3 rounded-full shadow border-green-200 border flex">
                            <ShieldCheck className="w-7 h-7 text-green-600" />
                            <Award className="w-7 h-7 text-green-400 -ml-2" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg">
                                Trusted by 1,000+ farmers | National Agrovet Awards 2025
                            </p>
                            <p className="text-green-700 text-sm">
                                Sustainable solutions, recognized excellence
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Animated Image/Visual */}
                <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[300px] aspect-video"
                    initial={{ opacity: 0, x: 64 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, type: "spring" }}
                >
                    {/* Large hero farm image */}
                    <img
                        src="/agrovet-farmers.jpg"
                        alt="Agrovet farmers and veterinarians"
                        className="object-cover w-full h-full"
                        loading="lazy"
                        style={{ minHeight: "300px" }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 bg-white bg-opacity-80 text-green-900 rounded-lg px-4 py-2 max-w-xs shadow-md">
                        <p className="font-semibold text-lg">
                            Supporting sustainable farming&nbsp;
                            <span className="inline-block align-middle">
                                <ShieldCheck className="w-5 h-5 inline text-green-700" />
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>
            {/* Decorative large SVG/shape (optional, for ultra-modern feel)
      <svg
        aria-hidden
        className="absolute right-0 top-0 translate-x-1/2 -z-10 opacity-10"
        width="700" height="600" fill="none" viewBox="0 0 713 717"
      >
        <ellipse cx="356" cy="359" rx="356" ry="359" fill="#4ade80" />
      </svg>
      */}
        </section>
    );
}
