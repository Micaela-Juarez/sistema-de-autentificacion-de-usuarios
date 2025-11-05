import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserProject = sequelize.define("UserProject", {
  role: {
    type: DataTypes.ENUM("member", "manager"),
    defaultValue: "member"
  }
}, {
  tableName: "user_projects",
  timestamps: false
});

export default UserProject;