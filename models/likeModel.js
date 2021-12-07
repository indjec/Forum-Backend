// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { DataTypes } = require("sequelize");
import sequelize from "../config/db.js";
import User from "./userModel.js";
import { Forum } from "./forumModel.js";

const Like = sequelize.define("Like", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  unlike: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Like;
