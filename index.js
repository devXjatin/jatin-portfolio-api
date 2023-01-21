const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require("cookie-parser");
const {sendEmail} = require("./nodemailer.js")
const PORT = 8000
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

//contact me api
app.post('/contact_me', async function (req, res) {
        try {
            const { name, email, message } = req.body;
            const userMessage = `Name: ${name}, Email: ${email}, Message: ${message}`;

            try {
                await sendEmail({
                    email: email,
                    subject: "Message From Portfolio",
                    userMessage,
                });
                res.status(200).json({
                    success: true,
                    message: `Message Sent`,
                });

            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message,
                });
            }

        } finally { }
    })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})