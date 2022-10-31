const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth-controller");
const verifyToken = require("../controllers/verifyToken-controller");

const router = express.Router();

//REGISTER USER API
router.post("/register", registerController);
// LOGIN USER API
router.post("/login", loginController);
// FORGOT PASSWORD API
router.post("/forgotpassword", forgotPasswordController);
// VERIFY TOKEN
router.get("/verifyToken", verifyToken);
// RESET PASSWORD
router.post("/resetPassword", resetPasswordController);

module.exports = router;
