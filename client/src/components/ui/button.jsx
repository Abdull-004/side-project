import React from "react";

export function Button({ children, className = "", type = "button", ...props }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
