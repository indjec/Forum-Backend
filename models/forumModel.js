// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { DataTypes } = require("sequelize");
import sequelize from "../config/db.js";
import User from "../models/userModel.js";
import Like from "../models/likeModel.js";

import slugify from "slugify";
import { nanoid } from "nanoid";

const Forum = sequelize.define("Forum", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  bookmark: {
    type: DataTypes.BOOLEAN,
  },
});

Forum.belongsTo(User, { foreignKey: "user_id" });
User.belongsToMany(Forum, { through: Like, foreignKey: "user_id" });
Forum.belongsToMany(User, { through: Like, foreignKey: "forum_id" });

const generateSlug = (title) => {
  return new Promise(async (resolve, reject) => {
    resolve(`${slugify(title, { lower: true })}-${nanoid()}`);
  });
};

export { Forum, generateSlug };
