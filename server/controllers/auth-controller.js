const bcrypt = require('bcryptjs')
const User = require('../models/user-model')
const tokenGenerator = require('../config/createToken')
const {sendVerificationEmail, sendForgotPasswordEmail} = require('../config/sendEmail')

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
    const link = req.protocol + "://" + req.hostname + ":5000/api/auth/verify?token=" + token

    const sendEmail = await sendVerificationEmail(newUser.email, link)

    if (sendEmail) {
        return res.status(201).json({
            success: true,
            message: "Registered successfully! Error in sending verification email"
        })
    } else {
        return res.status(201).json({success: true, message: "Registered Successfully!"})
    }
}

const loginController = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({success: false, message: "Invalid Email/Password!"})
    }

    // FINDING OLD USER
    const oldUser = await User.findOne({email})

    if (!oldUser) {
        return res.status(400).json({success: false, message: "Invalid Email/Password!"})
    }

    // COMPARING PASSWORD
    const comparePassword = await bcrypt.compare(password, oldUser.password)

    if (!comparePassword) {
        return res.status(400).json({success: false, message: "Invalid Email/Password!"})
    }

    // GENERATE TOKEN WITH USER INFO
    const token = tokenGenerator({email: oldUser.email, _id: oldUser._id})

    // SEND RESPONSE
    res.status(200).json({success: true, token, message: "You are logged In Successfully"})
}

const forgotPasswordController = async (req, res) => {
    const {email} = req.body

    if(!email){
        return res.status(400).json({success: false, message: "Please enter a valid email!"})
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(400).json({success: false, message: "Please enter valid email!"})
    }

    const oldUser = await User.findOne({email})

    if(!oldUser){
        return res.status(404).json({success: false, message: "User is not found!"})
    }

    // SEND FOR PASSWORD EMAIL
    // GENERATE TOKEN
    const token = tokenGenerator({email: oldUser.email})

    // SEND EMAIL
    const link = req.protocol + "://" + req.hostname + ":5000/api/auth/resetpassword?token=" + token

    const sendEmail = await sendVerificationEmail(oldUser.email, link)

    if (sendEmail) {
        return res.status(201).json({
            success: true,
            message: "Error to send email!"
        })
    } else {
        return res.status(201).json({success: true, message: "Email Sent!"})
    }

}



module.exports = {
    registerController,
    loginController,
    forgotPasswordController
}