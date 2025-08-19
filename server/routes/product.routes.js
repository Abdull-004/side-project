import { Router } from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `prod_${Date.now()}${ext}`);
    }
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
});

router.post("/",
    requireAuth, requireAdmin,
    upload.single("image"),
    [body("name").isLength({ min: 2 }), body("price").isFloat({ min: 0 }), body("inStock").isBoolean()],
    async (req, res) => {
        const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, price, inStock } = req.body;
        const imageUrl = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : "";
        const product = await Product.create({ name, price, inStock, imageUrl });
        res.status(201).json(product);
    }
);

router.put("/:id",
    requireAuth, requireAdmin,
    upload.single("image"),
    async (req, res) => {
        const data = { name: req.body.name, price: req.body.price, inStock: req.body.inStock === "true" || req.body.inStock === true };
        if (req.file) data.imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;
        const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!product) return res.status(404).json({ message: "Not found" });
        res.json(product);
    }
);

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
});

export default router;
