const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Adjust the path as necessary

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // or decoded.id depending on your token
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // ✅ important
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
