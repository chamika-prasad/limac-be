import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Client = sequelize.define(
    "Client",
    {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        clientName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "clients",
        timestamps: false,
    }
);

export default Client;