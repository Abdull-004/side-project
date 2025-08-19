import { useState } from "react";
import PasswordField from "../components/PasswordField";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Example: Send to backend
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                alert("Registration successful!");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-green-300">
                <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block mb-1 font-medium text-green-800">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 font-medium text-green-800">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            required
                        />
                    </div>

                    {/* Password Field with Eye Toggle */}
                    <div>
                        <label className="block mb-1 font-medium text-green-800">Password</label>
                        <PasswordField password={password} setPassword={setPassword} />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Already have an account */}
                <p className="mt-4 text-center text-green-700">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
