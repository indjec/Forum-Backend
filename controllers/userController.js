import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc   Post User Register
// @route /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password, avatar, bio } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
  if (user) {
    res.json({ data: "User already exists" });
  } else {
    const createdUser = await User.create({
      name,
      email,
      password: hash,
      avatar,
      bio,
    });
    const returnUser = { ...createdUser.dataValues };
    delete returnUser.password;
    res.json({ ...returnUser, token: generateToken(returnUser.id) });
  }
};

// @desc   POST User Login
// @route  /api/users/login
// @access Private
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (user && (await user.matchPassword(password))) {
    const returnUser = { ...user.dataValues };
    delete returnUser.password;
    res.json({ ...returnUser, token: generateToken(user.id) });
  } else {
    res.json({
      success: false,
      message: "User Login failed",
    });
  }
};

const testProtect = async (req, res) => {
  console.log(req.me);
  res.send("Token verified");
};

export { registerUser, authUser, testProtect };
