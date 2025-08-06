const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, resizeBy, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return resizeBy.status(401).json({ message: "No authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    resizeBy.status(401).json({ message: "Not authorized, token failed" });
  }
};
