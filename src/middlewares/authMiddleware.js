import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/index.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }
  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ message: "Invalid or expired token" });

  // Attach user to request (optional: fetch from db)
  try {
    const user = await User.findByPk(payload.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};