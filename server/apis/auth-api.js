const express = require('express')
const {registerController} = require("../controllers/auth-controller");

const router = express.Router()

//REGISTER USER API
router.post('/register', registerController)


module.exports = router