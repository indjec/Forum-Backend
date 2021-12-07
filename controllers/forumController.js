import { Forum, generateSlug } from "../models/forumModel.js";
import User from "../models/userModel.js";

// @desc Post forum
// @route /api/forums
// @access Private
const postForums = async (req, res) => {
  const { title, UserId } = req.body;
  const slug = await generateSlug(title);
  const forum = await Forum.create({ title, UserId, slug });
  res.json({
    success: true,
    message: "Forum saved successfully",
  });
};

// @desc Get all forums
// @route /api/forums
// @access Public
const getForums = async (req, res) => {
  const forums = await Forum.findAll({
    include: [{ model: User, attributes: ["name", "avatar", "email", "bio"] }],
    attributes: { exclude: ["UserId"] },
  });
  console.log(forums);
  res.json(forums);
};

// @desc Get forum by slug
// @route /api/forums/:slug
// @access Public
const getForumBySlug = async (req, res) => {
  const slug = req.params.slug;
  const forum = await Forum.findOne({ where: { slug } });
  res.json(forum);
};

// @desc   Post forum Like
// @route /api/forums/:id/like
// @access Private
// const likeForum = async (req, res) => {
//   const like = req.body.like == true ? 1 : 0;
//   const unLike = req.body.un_like == true ? 1 : 0;
//   const id = parseInt(req.params.id);

//   pool.query(
//     `UPDATE forums SET is_liked=${like}, is_unliked=${unLike} WHERE forums.id=${id};
//     SELECT is_liked, is_unliked from forums WHERE id=${id};`,
//     [like, unLike, id],
//     (err, result) => {
//       console.log(result[1]);
//       if (err) throw err;
//       res.json({
//         success: true,
//         like: result[1][0].is_liked == 1 ? true : false,
//         unlike: result[1][0].is_unliked == 1 ? true : false,
//       });
//     }
//   );
// };

export { postForums, getForums, getForumBySlug };
