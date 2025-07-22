import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Home = sequelize.define(
  "Home",
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "home",
    timestamps: false,
  }
);

export default Home;
