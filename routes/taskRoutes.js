// routes/taskRoutes.js
import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/task/:id", getTask);
router.post("/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
