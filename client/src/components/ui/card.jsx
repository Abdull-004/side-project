import React from "react";

export function Card({ children, className = "", icon }) {
    return (
        <div className={`rounded-2xl border shadow-sm bg-white p-4 ${className}`}>
            {icon && <div className="mb-3 text-green-600">{icon}</div>}
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) { /* unchanged */ }
export function CardContent({ children, className = "" }) { /* unchanged */ }
