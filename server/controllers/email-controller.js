const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(403).json({ success: true, message: "Invalid token!" });
  }

  // DECODE THE TOKEN
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Token!", error });
  }

  // CHECKING IF THIS USER IS PRESENT OR NOT
  const oldUser = await User.findOne({ email: decodedToken.email });

  if (!oldUser) {
    return res.status(400).json({ success: false, message: "User not found!" });
  }

  oldUser.verified = true;

  await oldUser.save();

  res
    .status(200)
    .json({ success: true, message: "You are verified Successfully!" });
};

module.exports = {
  verifyEmailController,
};
