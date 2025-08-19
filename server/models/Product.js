import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
    imageUrl: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);