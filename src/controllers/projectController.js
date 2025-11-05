import { Project, User } from "../models/index.js";

export const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newProject = await Project.create({ name, description });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

export const listProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: User, as: "members", attributes: ["id", "username", "email"], through: { attributes: ["role"] } }]
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const addUserToProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.body; // role in user_projects
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await project.addMember(user, { through: { role: role || "member" } });
    res.json({ message: "User added to project" });
  } catch (err) {
    next(err);
  }
};