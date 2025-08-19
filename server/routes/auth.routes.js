import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

const emailRule = body("email").isEmail();
const passwordRule = body("password")
    .isLength({ min: 8 })
    .matches(/[A-Z]/).withMessage("Need uppercase")
    .matches(/[a-z]/).withMessage("Need lowercase")
    .matches(/[0-9]/).withMessage("Need a number")
    .matches(/[^A-Za-z0-9]/).withMessage("Need a symbol");

router.post(
    "/register",
    [body("name").isLength({ min: 2 }), emailRule, passwordRule],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "Email in use" });

        const isFirstUser = (await User.countDocuments()) === 0;
        const user = await User.create({ name, email, password, role: isFirstUser ? "admin" : "user" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
    }
);

router.post(
    "/login",
    [emailRule, body("password").isString().isLength({ min: 1 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await user.comparePassword(password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
    }
);

router.post("/logout", (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.json({ message: "Logged out" });
});

router.get("/me", async (req, res) => {
    const token = req.cookies?.[process.env.COOKIE_NAME];
    if (!token) return res.json(null);

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id).select("name email role");
        res.json(user);
    } catch {
        res.json(null);
    }
});

export default router;
