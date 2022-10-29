const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'reggie.goyette@ethereal.email',
        pass: 'Uyh3pFxpWwpUvWVETy'
    }
});

module.exports = async (senderAddress, link) => {
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