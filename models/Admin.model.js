import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

export default Admin;
