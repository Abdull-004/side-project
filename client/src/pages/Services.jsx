// src/pages/Services.jsx
import React, { useState } from "react";
import { card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf, Package, Truck, Stethoscope, Sprout } from "lucide-react";

export default function Services() {
    const [modalService, setModalService] = useState(null);

    const services = [
        {
            icon: <Package size={32} className="text-green-600" aria-hidden="true" />,
            title: "Premium Farm Inputs",
            description:
                "Get high-quality seeds, fertilizers, pesticides, and veterinary products from trusted suppliers to keep your farm thriving.",
            details:
                "We source premium farm inputs ensuring you have the best seeds, fertilizers, pesticides, and veterinary products. Our trusted suppliers guarantee quality, reliability, and sustainable farming solutions."
        },
        {
            icon: <Stethoscope size={32} className="text-green-600" aria-hidden="true" />,
            title: "Veterinary Support",
            description:
                "Access essential vet medicines, supplements, and preventive care advice to keep your livestock in peak condition.",
            details:
                "Our veterinary experts provide access to essential medicines, supplements, vaccinations, and preventive care advice to keep your animals healthy and productive."
        },
        {
            icon: <Leaf size={32} className="text-green-600" aria-hidden="true" />,
            title: "Expert Consultation",
            description:
                "Need help choosing the right product? Our experienced agrovet experts are here to guide you to make smart farming decisions.",
            details:
                "We offer personalized consultations to help you select the right products tailored for your farm's unique needs, maximizing yield and health."
        },
        {
            icon: <Truck size={32} className="text-green-600" aria-hidden="true" />,
            title: "Doorstep Delivery",
            description:
                "We deliver directly to your home or farm so you can focus on your crops and animals while we handle the logistics.",
            details:
                "Enjoy fast and reliable doorstep delivery services, ensuring you get what you need promptly without leaving your farm or home."
        },
        {
            icon: <Sprout size={32} className="text-green-600" aria-hidden="true" />,
            title: "Sustainable Farming",
            description:
                "We promote eco-friendly products and farming practices to protect your soil, conserve water, and increase yields responsibly.",
            details:
                "Committed to sustainability, we provide eco-friendly products and advocate for farming practices that protect natural resources while improving productivity."
        },
    ];

    const openModal = (service) => {
        setModalService(service);
    };
    const closeModal = () => setModalService(null);

    // Keyboard accessibility for cards
    const handleKeyDown = (event, service) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(service);
        }
    };

    return (
        <div className="bg-green-50 min-h-screen py-12">
            {/* Hero Section */}
            <motion.div
                className="text-center mb-12 px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-extrabold text-green-900 mb-4">
                    Nurturing Your Farm, Growing Your Success
                </h1>
                <p className="text-green-800 max-w-2xl mx-auto">
                    From seeds to harvest, we provide top-quality agricultural products and expert guidance to keep your farm thriving year-round.
                </p>
            </motion.div>

            {/* Services Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                    >
                        <card
                            tabIndex={0}
                            role="button"
                            onClick={() => openModal(service)}
                            onKeyDown={(e) => handleKeyDown(e, service)}
                            className="border-green-300 hover:shadow-lg transition-shadow duration-300 cursor-pointer focus:shadow-lg outline-none focus:ring-4 focus:ring-green-400 rounded-2xl"
                            aria-describedby={`desc-${idx}`}
                            aria-label={`Learn more about ${service.title}`}
                        >
                            <CardHeader className="flex items-center space-x-4">
                                {service.icon}
                                <h3 className="text-green-800 font-semibold text-lg">{service.title}</h3>
                            </CardHeader>
                            <CardContent>
                                <p id={`desc-${idx}`} className="text-green-700">{service.description}</p>
                            </CardContent>
                        </card>
                    </motion.div>
                ))}
            </div>

            {/* Call To Action Section */}
            <motion.div
                className="text-center mt-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Let’s Grow Together 🌱</h2>
                <p className="text-green-700 max-w-xl mx-auto mb-6">
                    Visit our store today or order online and experience the difference of having a reliable agrovet partner.
                </p>
                <div className="flex justify-center gap-4">
                    <a
                        href="/products"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Shop Now
                    </a>
                    <a
                        href="/contact"
                        className="border border-green-600 text-green-700 px-6 py-3 rounded-lg shadow-md hover:bg-green-50 transition focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Contact Us
                    </a>
                </div>
            </motion.div>

            {/* Modal for Service Details */}
            {modalService && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onClick={closeModal}
                    tabIndex={-1}
                    onKeyDown={(e) => { if (e.key === "Escape") closeModal(); }}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl relative outline-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3
                            id="modal-title"
                            className="text-2xl font-bold mb-6 text-green-900"
                            tabIndex={0}
                        >
                            {modalService.title}
                        </h3>
                        <p className="text-green-800 mb-8 whitespace-pre-line">{modalService.details}</p>
                        <button
                            onClick={closeModal}
                            aria-label="Close modal"
                            className="absolute top-4 right-4 text-green-600 hover:text-green-800 text-2xl font-bold focus:outline-none"
                        >
                            &times;
                        </button>
                        <button
                            onClick={closeModal}
                            className="mt-auto px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 transition w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
