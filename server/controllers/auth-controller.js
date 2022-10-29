const bcrypt = require('bcryptjs')
const User = require('../models/user-model')
const tokenGenerator = require('../config/createToken')
const emailSender = require('../config/sendEmail')

const registerController = async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "Please enter all the fields"})
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(400).json({success: false, message: "Please enter valid email!"})
    }

    if (password.length < 8) {
        return res.status(400).json({success: false, message: "Password should be atleast of 8 characters"})
    }

    // CHECK IF USER IS ALREADY PRESENT
    const oldUser = await User.findOne({email})

    if (oldUser) {
        return res.status(403).json({success: false, message: "This email is already in use!"})
    }

    // HASHING PASSWORD
    const hashedPassword = bcrypt.hashSync(password, 10)

    // USE MODEL TO CREATE A NEW USER
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save()

    // GENERATE TOKEN
    const token = tokenGenerator({email: newUser.email})

    // SEND EMAIL
    const link = req.protocol + "://" + req.host + "/api/auth/verify?token=" + token

    const sendEmail = await emailSender(newUser.email, link)

    if (sendEmail) {
        res
            .status(201)
            .json({
                success: true,
                message: "Registered successfully! Error in sending verification email"
            })
    } else {
        res
            .status(201)
            .json({
                success: true,
                message: "Registered Successfully!"
            })
    }
}


module.exports = {
    registerController
}