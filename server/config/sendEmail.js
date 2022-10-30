const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maud.bechtelar@ethereal.email',
        pass: 'zTRNA6FZ9V1TCJz8HD'
    }
});

module.exports = {
    sendVerificationEmail: async (senderAddress, link) => {
        let error = false
        try {
            let info = await transporter.sendMail({
                from: '"Test Acount 👻" <MarkeLoof@gmail.com>', // sender address
                to: senderAddress, // list of receivers
                subject: "Verify Password", // Subject line
                html: `Please Reset your Password by Clicking <a href="${link}">here</a> <br/>
                This email will be valid for only 7days!`, // html body
            });
        } catch (error) {
            error = true
        }
        return error
    },

    sendForgotPasswordEmail: async (senderAddress, link) => {
        let error = false
        try {
            let info = await transporter.sendMail({
                from: '"Test Acount 👻" <MarkeLoof@gmail.com>', // sender address
                to: senderAddress, // list of receivers
                subject: "Verify Email", // Subject line
                html: `Please verify your Email by Clicking <a href="${link}">here</a> <br/>
                This email will be valid for only 7days!`, // html body
            });
        } catch (error) {
            error = true
        }
        return error
    }

}