import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
    const [items, setItems] = useState([]);
    const { user } = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        api.get("/products").then(({ data }) => setItems(data));
    }, []);

    const handleOrder = (p) => {
        if (!user) return nav("/login?next=/checkout");
        nav("/checkout");
    };

    return (
        <div className="p-4 bg-green-50 min-h-screen">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((p) => (
                    <ProductCard key={p._id} p={p} onOrder={handleOrder} />
                ))}
            </div>
        </div>
    );
}


