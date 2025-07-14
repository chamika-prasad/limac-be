import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    serviceName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    includes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "services",
    timestamps: false,
  }
);

export default Service;
