import { pool } from "../config/db.js";

// @desc Get all forums
// @route /api/forums
// @access Public
const getForums = async (req, res) => {
  pool.query(
    "SELECT * FROM forums LEFT JOIN users ON forums.user_id = users.id",
    (err, rows) => {
      if (err) throw err;
      const results = rows.map((row, index) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        thumbnail: row.thumbnail,
        slug: row.slug,
        user: {
          id: row.user_id,
          name: row.name,
          avatar: row.avatar,
          bio: row.bio,
          username: row.username,
        },
      }));
      res.json({ data: results });
    }
  );
};

// @desc Get forum by slug
// @route /api/forums/:slug
// @access Public
const getForumBySlug = async (req, res) => {
  const slug = req.params.slug;
  pool.query(
    "SELECT * from forums LEFT JOIN users ON forums.user_id = users.id WHERE forums.slug=?",
    [slug],
    (err, row) => {
      if (err) throw err;
      const result = {
        id: row[0].id,
        title: row[0].title,
        description: row[0].description,
        thumbnail: row[0].thumbnail,
        slug: row[0].slug,
        user: {
          id: row[0].user_id,
          name: row[0].name,
          avatar: row[0].avatar,
          bio: row[0].bio,
          username: row[0].username,
        },
      };
      res.json({ data: result });
    }
  );
};

// @desc   Post forum Like
// @route /api/forums/:id/like
// @access Public
const likeForum = async (req, res) => {
  const like = req.body.like == true ? 1 : 0;
  const unLike = req.body.un_like == true ? 1 : 0;
  const id = parseInt(req.params.id);

  pool.query(
    `UPDATE forums SET is_liked=${like}, is_unliked=${unLike} WHERE forums.id=${id};
    SELECT is_liked, is_unliked from forums WHERE id=${id};`,
    [like, unLike, id],
    (err, result) => {
      console.log(result[1]);
      if (err) throw err;
      res.json({
        success: true,
        like: result[1][0].is_liked == 1 ? true : false,
        unlike: result[1][0].is_unliked == 1 ? true : false,
      });
    }
  );
};

export { getForums, getForumBySlug, likeForum };
