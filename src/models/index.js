import sequelize from "../config/database.js";

import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";
import UserProject from "./UserProject.js";

// Associations

// 1:N : User -> Task
User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });
Task.belongsTo(User, { foreignKey: "user_id", as: "assignee" });

// 1:N : Project -> Task
Project.hasMany(Task, { foreignKey: "project_id", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "project_id", as: "project" });

// N:M : User <-> Project
User.belongsToMany(Project, { through: UserProject, foreignKey: "user_id", otherKey: "project_id", as: "projects" });
Project.belongsToMany(User, { through: UserProject, foreignKey: "project_id", otherKey: "user_id", as: "members" });

export {
  sequelize,
  User,
  Project,
  Task,
  UserProject
};