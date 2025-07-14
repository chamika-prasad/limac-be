import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Project = sequelize.define(
    "Project",
    {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        projectName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        topDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        bottomDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        topImages: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        bottomImages: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        highlights: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: "ongoing",
        },
    },
    {
        tableName: "projects",
        timestamps: false,
    }
);

export default Project;