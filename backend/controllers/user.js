const User = require("../models/user");
const cloudinary  = require("../utils/cloudinary");

const getAuthUser = async (req, res) => {
	if (!req.user) {
		return res.status(404).json({ message: `User Not Found` });
	}
	res.status(200).json({
		data: req.user,
	});
};

const getAllUsers = async (req, res) => {
	const allUsers = await User.find({ _id: { $ne: req.user._id } })
		.select("-password")
		.sort({ _id: -1 });
	res.status(200).send({ data: allUsers });
};


const updateProfile = async (req, res) => {
  const { firstName, lastName, email, image } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Upload image if it exists and is a Base64 string or URL
    let uploadedImageUrl = user.image;
    if (image && image.startsWith("data:")) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "user_profiles",
      });
      uploadedImageUrl = uploadRes.secure_url;
    }

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.image = uploadedImageUrl;

    await user.save();
    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getAuthUser, getAllUsers, updateProfile };
