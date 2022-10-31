const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const verifyToken = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(404).json({ success: false, message: "Invalid Token!" });
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

  res.status(200).json({ success: true, data: decodedToken.email });
};

module.exports = verifyToken;
