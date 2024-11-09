// routes/taskRoutes.js
import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "./taskController.js";

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/task/:id", getTask);
router.post("/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
