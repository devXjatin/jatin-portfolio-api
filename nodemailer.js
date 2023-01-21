const nodemailer = require('nodemailer')
require("dotenv").config({ path: "./config.env" });

exports.sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    })

    const mailOptions = {
    from:process.env.SMTP_USER,
    to:process.env.SENDER_EMAIL,
    subject:options.subject,
    text:options.userMessage
    }
    await transporter.sendMail(mailOptions);
}