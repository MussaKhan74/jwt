const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

const registerController = async  (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
       return  res.status(400).json({success: false, message: "Please enter all the fields"})
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return res.status(400).json({success: false, message: "Please enter valid email!"})
    }

    if(password.length < 8){
        return res.status(400).json({success: false, message: "Password should be atleast of 8 characters"})
    }

    // CHECK IF USER IS ALREADY PRESENT
    const oldUser = await User.findOne({email})

    if(oldUser){
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
    res.status(200).json({success: true, message: "Registered Successfully!"})
}



module.exports = {
    registerController
}