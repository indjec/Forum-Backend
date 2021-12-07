import express from "express";
import {
  postForums,
  getForums,
  getForumBySlug,
} from "../controllers/forumController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, postForums).get(getForums);
router.route("/:slug").get(getForumBySlug);
// router.route("/:id/like").post(likeForum);

export default router;
