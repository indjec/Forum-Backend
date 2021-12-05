import express from "express";
import {
  getForumBySlug,
  getForums,
  likeForum,
} from "../controllers/forumController.js";

const router = express.Router();

router.route("/").get(getForums);
router.route("/:slug").get(getForumBySlug);
router.route("/:id/like").post(likeForum);

export default router;
