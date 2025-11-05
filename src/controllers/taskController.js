import { Task, Project, User } from "../models/index.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, assigneeId, due_date } = req.body;

    if (projectId) {
      const project = await Project.findByPk(projectId);
      if (!project) return res.status(404).json({ message: "Project not found" });
    }

    if (assigneeId) {
      const user = await User.findByPk(assigneeId);
      if (!user) return res.status(404).json({ message: "Assignee not found" });
    }

    const task = await Task.create({
      title,
      description,
      project_id: projectId || null,
      user_id: assigneeId || null,
      due_date: due_date || null
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const listTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "assignee", attributes: ["id", "username", "email"] },
        { model: Project, as: "project", attributes: ["id", "name"] }
      ]
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByPk(id);
    if (!updated) return res.status(404).json({ message: "Task not found" });

    await updated.update(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};