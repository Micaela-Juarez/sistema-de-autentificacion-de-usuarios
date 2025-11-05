import { User } from "../models/index.js";

export const me = async (req, res, next) => {
  try {
    res.json(req.user); // already sanitized in middleware
  } catch (err) {
    next(err);
  }
};

// Admin-only: list users
export const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["id", "username", "email", "role", "createdAt"] });
    res.json(users);
  } catch (err) {
    next(err);
  }
};