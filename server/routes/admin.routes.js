import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Example admin dashboard data route
router.get("/dashboard", requireAuth, requireAdmin, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard", user: req.user });
});

export default router;
