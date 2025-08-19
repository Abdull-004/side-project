import React from "react";
export default function ProductCard({ p, onOrder }) {
    return (
        <div className="rounded-2xl border border-green-300 bg-white overflow-hidden shadow-sm">
            <img
                src={`http://localhost:5000${p.imageUrl}`}
                alt={p.name}
                className="h-40 w-full object-cover"
            />
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-green-900">{p.name}</h4>
                    <span
                        className={`text-sm px-2 py-0.5 rounded-full border ${p.inStock
                            ? "border-green-600 text-green-700 bg-green-100"
                            : "border-red-600 text-red-700 bg-red-100"
                            }`}
                    >
                        {p.inStock ? "In stock" : "Out"}
                    </span>
                </div>
                <p className="mt-2 font-bold text-green-800">KSh {p.price.toFixed(2)}</p>
                <button
                    onClick={() => onOrder(p)}
                    disabled={!p.inStock}
                    className={`mt-3 w-full px-4 py-2 rounded-xl text-white transition 
              ${p.inStock
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-green-300 cursor-not-allowed opacity-50"
                        }`}
                >
                    {p.inStock ? "Order" : "Unavailable"}
                </button>
            </div>
        </div>
    );
}
