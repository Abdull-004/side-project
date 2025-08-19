import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Menu toggle handler
    const toggleMenu = () => setMobileMenuOpen((open) => !open);
    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
                    <Link to="/" className="font-bold text-xl text-green-900">
                        Agrovet
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex ml-auto items-center gap-6 text-green-800 font-medium">
                        <Link to="/products" className="hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                            Products
                        </Link>
                        <Link to="/services" className="hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                            Services
                        </Link>
                        <Link to="/about" className="hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                            About
                        </Link>
                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className="px-3 py-1 rounded-xl border border-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                Admin
                            </Link>
                        )}
                        {!user ? (
                            <Link
                                to="/login"
                                className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                Login
                            </Link>
                        ) : (
                            <button
                                onClick={logout}
                                className="px-5 py-2 rounded-xl border border-green-600 text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="ml-auto md:hidden p-2 rounded-md text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={toggleMenu}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-green-900 bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-10 text-white text-xl font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                        role="dialog"
                        aria-modal="true"
                    >
                        <Link to="/products" onClick={closeMenu} className="hover:text-green-300 focus:outline-none">
                            Products
                        </Link>
                        <Link to="/services" onClick={closeMenu} className="hover:text-green-300 focus:outline-none">
                            Services
                        </Link>
                        <Link to="/about" onClick={closeMenu} className="hover:text-green-300 focus:outline-none">
                            About
                        </Link>
                        {user?.role === "admin" && (
                            <Link to="/admin" onClick={closeMenu} className="hover:text-green-300 focus:outline-none">
                                Admin
                            </Link>
                        )}
                        {!user ? (
                            <Link to="/login" onClick={closeMenu} className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 transition">
                                Login
                            </Link>
                        ) : (
                            <button
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                }}
                                className="px-6 py-2 rounded-xl border border-green-500 hover:bg-green-700 transition"
                            >
                                Logout
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
