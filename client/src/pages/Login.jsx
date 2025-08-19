import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/authContext";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [sp] = useSearchParams();
    const next = sp.get("next") || "/";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });

    const [serverError, setServerError] = useState("");

    const onSubmit = async (v) => {
        setServerError("");
        try {
            await login(v.email, v.password);
            nav(next, { replace: true });
        } catch (e) {
            setServerError(e?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 rounded-3xl border border-green-300 bg-green-50 shadow-sm">
            <h2 className="text-2xl font-bold text-green-900">Welcome back</h2>
            <p className="text-sm text-green-700 mt-1">Log in to continue your order.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
                <div>
                    <label className="text-sm text-green-800">Email</label>
                    <input
                        className={`mt-1 w-full px-4 py-2 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.email ? "border-red-600" : ""
                            }`}
                        {...register("email")}
                        placeholder="you@example.com"
                        type="email"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-sm text-green-800">Password</label>
                    <input
                        type="password"
                        className={`mt-1 w-full px-4 py-2 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.password ? "border-red-600" : ""
                            }`}
                        {...register("password")}
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

                <button
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition"
                    type="submit"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <p className="text-sm mt-4 text-green-700">
                No account?{" "}
                <Link className="underline text-green-600 hover:text-green-800" to="/signup">
                    Create one
                </Link>
            </p>
        </div>
    );
}
