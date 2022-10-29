const jwt = require('jsonwebtoken')

module.exports = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '7d'})
}