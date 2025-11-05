import express from "express";
import { me, listUsers } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/me", authenticate, me);
router.get("/", authenticate, authorizeRoles("admin"), listUsers);

export default router;