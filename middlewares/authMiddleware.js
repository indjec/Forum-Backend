import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified");
        next();
      } else {
        console.log("Token failes");
      }
    } catch (e) {
      res.status(401);
      res.send("User not authorized");
      throw new Error("User not authorized");
    }
  }
};

export default protect;
