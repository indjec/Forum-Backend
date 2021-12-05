import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    }
  }
};

export default protect;
