const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Request", req.headers);
  if (token) {
    console.log("Token", token);
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded);
        req.user = decoded.user;
        next();
      });
    } catch (err) {
      res.status(401);
      throw new Error("User is not authorized");
    }
  } else {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;
