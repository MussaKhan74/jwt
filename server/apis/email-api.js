const express = require("express");
const router = express.Router();
const { verifyEmailController } = require("../controllers/email-controller");

router.get("/verify", verifyEmailController);

module.exports = router;
