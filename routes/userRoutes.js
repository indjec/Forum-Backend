import express from "express";
import {
  registerUser,
  authUser,
  testProtect,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser).get(protect, testProtect);

export default router;
