import Task from "./taskService.js";

// Messages
const messages = {
  serverError: "Server error",
  taskNotFound: "Task not found",
  taskDeleted: "Task deleted",
};

// HTTP Status Codes
const statusCodes = {
  ok: 200,
  created: 201,
  notFound: 404,
  serverError: 500,
};

// API methods
export const getTasks = async (req, res) => {
  const { cursor, limit, sortBy, sortOrder } = req.query;
  const query = cursor ? { _id: { $gt: cursor } } : {};
  const options = {
    limit: Number.parseInt(limit) || 10,
    sort: { [sortBy || "createdAt"]: sortOrder === "desc" ? -1 : 1 },
  };

  try {
    const tasks = await Task.find(query, null, options);
    const nextCursor = tasks.length > 0 ? tasks[tasks.length - 1]._id : null;

    res.status(statusCodes.ok).json({ tasks, nextCursor });
  } catch (error) {
    res.status(statusCodes.serverError).json({ message: messages.serverError });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(statusCodes.notFound).json({ message: messages.taskNotFound });
    }
    res.status(statusCodes.ok).json(task);
  } catch (error) {
    res.status(statusCodes.serverError).json({ message: messages.serverError });
  }
};

export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
    });
    const savedTask = await newTask.save();
    res.status(statusCodes.created).json(savedTask);
  } catch (error) {
    res.status(statusCodes.serverError).json({ message: messages.serverError });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, status, description, history, dueDate } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, status, description, history, dueDate, updatedAt: Date.now() },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(statusCodes.notFound).json({ message: messages.taskNotFound });
    }
    res.status(statusCodes.ok).json(updatedTask);
  } catch (error) {
    res.status(statusCodes.serverError).json({ message: messages.serverError });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(statusCodes.notFound).json({ message: messages.taskNotFound });
    }
    res.status(statusCodes.ok).json({ message: messages.taskDeleted });
  } catch (error) {
    res.status(statusCodes.serverError).json({ message: messages.serverError });
  }
};
