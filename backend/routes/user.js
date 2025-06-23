const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const wrapAsync = require("../middlewares/wrapAsync");
const { authorization } = require("../middlewares/authorization");
// const { updateProfile } = require("../controllers/user");
const auth = require("../middlewares/auth");

// const singleUpload = require("../middlewares/upload");
// const upload = require("../middlewares/upload.js");

console.log("updateProfile:", userControllers.updateProfile);
router.get("/profile", authorization, wrapAsync(userControllers.getAuthUser));
router.get("/users", authorization, wrapAsync(userControllers.getAllUsers));
router.put("/update", auth, wrapAsync(userControllers.updateProfile));
module.exports = router;
