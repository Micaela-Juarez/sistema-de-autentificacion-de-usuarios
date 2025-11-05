import express from "express";
import { createProject, listProjects, addUserToProject } from "../controllers/projectController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin"), createProject);
router.get("/", authenticate, listProjects);
router.post("/:projectId/members", authenticate, authorizeRoles("admin"), addUserToProject);

export default router;