const mongoose = require('mongoose')

const connected = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log(`database connected on ${mongoose.connection.host}`))
        .catch((error) => console.log(error))
}


module.exports = connected