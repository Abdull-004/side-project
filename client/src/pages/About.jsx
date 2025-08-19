import { useState } from "react";

const foundersData = [
    {
        name: "Jane Doe",
        role: "Founder & CEO",
        bio: "With over 15 years in agrovet services, Jane leads our company’s vision for sustainable farming solutions.",
        imgSrc: "/founders/jane.jpg", // Replace with actual image URLs or imports
        social: {
            linkedin: "https://linkedin.com/in/janedoe",
            twitter: "https://twitter.com/janedoe",
        },
    },
    {
        name: "John Smith",
        role: "Co-Founder & CTO",
        bio: "John drives our technology and innovations, ensuring advanced solutions reach our customers efficiently.",
        imgSrc: "/founders/john.jpg",
        social: {
            linkedin: "https://linkedin.com/in/johnsmith",
            twitter: "https://twitter.com/johnsmith",
        },
    },
];

const coreValues = [
    {
        title: "Integrity",
        description: "We build trust in our community by being transparent and ethical in all dealings.",
        icon: (
            <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M12 11c0 4-5 4-5 0m5 0a5 5 0 0110 0c0 5-5 5-5 0z" />
            </svg>
        ),
    },
    {
        title: "Excellence",
        description: "Delivering top quality products and services that meet the highest standards.",
        icon: (
            <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Sustainability",
        description: "Committed to eco-friendly practices and supporting long-term agricultural health.",
        icon: (
            <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M12 2a10 10 0 0110 10c0 5-10 10-10 10S2 17 2 12 7 2 12 2z" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
];

export default function About() {
    const [founders] = useState(foundersData);

    return (
        <section className="bg-green-50 min-h-screen p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-green-900 mb-4">
                        About Agrovet
                    </h1>
                    <p className="text-lg text-green-700 max-w-3xl mx-auto">
                        Supplying medicines, feeds, and farm essentials with a passion for
                        local service and real advice.
                    </p>
                </header>

                {/* Mission & Vision */}
                <section className="grid md:grid-cols-2 gap-12 mb-16 px-4">
                    <div className="bg-white p-6 rounded-3xl border border-green-300 shadow-lg">
                        <h2 className="text-2xl font-semibold text-green-800 mb-3">Our Mission</h2>
                        <p className="text-green-700">
                            To empower farmers with accessible, reliable agrovet solutions that boost
                            productivity and sustainability.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-green-300 shadow-lg">
                        <h2 className="text-2xl font-semibold text-green-800 mb-3">Our Vision</h2>
                        <p className="text-green-700">
                            To be the leading agrovet partner fostering innovation and eco-friendly
                            farming practices.
                        </p>
                    </div>
                </section>

                {/* Core Values */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
                        Our Core Values
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-10 px-4">
                        {coreValues.map(({ title, description, icon }, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-3xl border border-green-300 shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="mb-4">{icon}</div>
                                <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
                                <p className="text-green-700">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Founders Section */}
                <section className="mb-20 px-4">
                    <h2 className="text-3xl font-bold text-green-900 mb-10 text-center">
                        Meet the Founders
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-12">
                        {founders.map(({ name, role, bio, imgSrc, social }, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl border border-green-300 p-8 shadow-lg flex flex-col items-center text-center"
                            >
                                <img
                                    src={imgSrc}
                                    alt={name}
                                    className="w-40 h-40 rounded-full object-cover mb-6 shadow-md"
                                    loading="lazy"
                                />
                                <h3 className="text-xl font-semibold text-green-900">{name}</h3>
                                <p className="italic text-green-700 mb-2">{role}</p>
                                <p className="text-green-700 mb-4">{bio}</p>
                                <div className="flex space-x-4 text-green-600">
                                    {social.linkedin && (
                                        <a
                                            href={social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${name} LinkedIn`}
                                            className="hover:text-green-800 transition"
                                        >
                                            {/* LinkedIn SVG icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                className="w-6 h-6"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.76 0 5-2.239 5-5v-14c0-2.761-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.77 0-.978.784-1.77 1.75-1.77s1.75.792 1.75 1.77c0 .98-.784 1.77-1.75 1.77zm13.5 11.27h-3v-5.5c0-1.31-.47-2.2-1.65-2.2-.9 0-1.43.6-1.66 1.18-.09.22-.11.53-.11.84v5.68h-3v-10h3v1.37c.4-.62 1.1-1.5 2.67-1.5 1.95 0 3.42 1.28 3.42 4.04v5.09z" />
                                            </svg>
                                        </a>
                                    )}
                                    {social.twitter && (
                                        <a
                                            href={social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${name} Twitter`}
                                            className="hover:text-green-800 transition"
                                        >
                                            {/* Twitter SVG icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                className="w-6 h-6"
                                            >
                                                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.379 4.482 13.95 13.95 0 01-10.141-5.147 4.822 4.822 0 00-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.898 4.898 0 01-2.228-.616v.06a4.92 4.92 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.928 4.928 0 004.6 3.417 9.867 9.867 0 01-6.11 2.105c-.397 0-.787-.023-1.17-.067a13.945 13.945 0 007.548 2.212c9.056 0 14.002-7.514 14.002-14.019 0-.213-.004-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact / Call to Action */}
                <section className="text-center max-w-xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-green-900 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-green-700 mb-6">
                        Interested in learning more or partnering with us? Reach out today!
                    </p>
                    <a
                        href="mailto:contact@agrovet.com"
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
                    >
                        Contact Us
                    </a>
                </section>
            </div>
        </section>
    );
}

