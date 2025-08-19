// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

import { api } from "../lib/axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", inStock: true, image: null });
    const [editing, setEditing] = useState(null);

    const fetchItems = async () => {
        const { data } = await api.get("/products");
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("price", form.price);
        fd.append("inStock", form.inStock);
        if (form.image) fd.append("image", form.image);

        try {
            if (!editing) {
                await api.post("/products", fd, { headers: { "Content-Type": "multipart/form-data" } });
            } else {
                await api.put(`/products/${editing}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
            }
            setForm({ name: "", price: "", inStock: true, image: null });
            setEditing(null);
            fetchItems();
        } catch (err) {
            console.error("Error submitting product:", err);
        }
    };

    const del = async (id) => {
        await api.delete(`/products/${id}`);
        fetchItems();
    };

    const edit = (p) => {
        setEditing(p._id);
        setForm({ name: p.name, price: p.price, inStock: p.inStock, image: null });
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Form Card */}
            <Card className="bg-green-50 border-green-400">
                <CardHeader className="text-green-800 font-bold text-lg">{editing ? "Edit Product" : "Add Product"}</CardHeader>
                <form onSubmit={submit} className="grid gap-3 mt-2">
                    <input
                        className="px-4 py-2 rounded-xl border border-green-300"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        className="px-4 py-2 rounded-xl border border-green-300"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                        required
                    />
                    <label className="flex items-center gap-2 text-sm text-green-700">
                        <input
                            type="checkbox"
                            checked={form.inStock}
                            onChange={(e) => setForm((s) => ({ ...s, inStock: e.target.checked }))}
                        />
                        In Stock
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setForm((s) => ({ ...s, image: e.target.files[0] }))}
                    />
                    <Button type="submit" variant="default">{editing ? "Update" : "Create"}</Button>
                </form>
            </Card>

            {/* Product List */}
            <div className="grid gap-4">
                {items.map((p) => (
                    <Card key={p._id} className="bg-green-100 border-green-300 flex gap-4 p-4 items-center">
                        <img
                            src={`http://localhost:5000${p.imageUrl}`}
                            alt={p.name}
                            className="w-24 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <div className="font-semibold text-green-900">{p.name}</div>
                            <div className="text-sm text-green-800">
                                KSh {p.price.toFixed(2)} • {p.inStock ? "In stock" : "Out"}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => edit(p)}>
                                Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => del(p._id)}>
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
