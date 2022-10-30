const express = require('express')
const {registerController, loginController, forgotPasswordController} = require("../controllers/auth-controller");

const router = express.Router()

//REGISTER USER API
router.post('/register', registerController)
// LOGIN USER API
router.post('/login', loginController)
// FORGOT PASSWORD API
router.post('/forgotpassword', forgotPasswordController)


module.exports = router