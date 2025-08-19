import jwt from "jsonwebtoken";
import User from "../models/User.js"; // import the user model

export const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.[process.env.COOKIE_NAME] || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Not Authorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        await requireAuth(req, res, async () => {
            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
