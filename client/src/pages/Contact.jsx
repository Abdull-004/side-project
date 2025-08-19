import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Replace this URL with your backend contact API endpoint
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                alert(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            alert("There was an error sending your message.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-lg border border-green-300">
                <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
                    Contact Us
                </h2>
                <p className="text-green-700 mb-8 text-center">
                    Have questions or want to partner with us? Send us a message!
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-green-800 font-semibold mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-green-800 font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-green-800 font-semibold mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject of your message"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-green-800 font-semibold mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition ${submitting ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {submitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
                <p className="text-center mt-6 text-green-700 text-sm">
                    Or reach us at{" "}
                    <a href="mailto:contact@agrovet.com" className="text-green-600 hover:underline">
                        contact@agrovet.com
                    </a>
                </p>
            </div>
        </div>
    );
}
