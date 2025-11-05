import express from "express";
import { createTask, listTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createTask);
router.get("/", authenticate, listTasks);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;