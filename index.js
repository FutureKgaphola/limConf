require('dotenv').config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const moment = require('moment');
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendtoclients', async (req, res) => {
    const { name, email, message, subject } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: 'lieda-co-za.mail.protection.outlook.com',
            port: 25,
            secure: false,
            auth: {
              user: 'Procure@lieda.co.za',
              pass: 'Pass2030',
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false 
            }
          });
          transporter.sendMail({
            from: 'Procure@lieda.co.za',
            to: email,
            subject: subject,
      
            html: `<p>Hello, ${name} ,${message}</p>`
          }).then(() => {
            res.status(200).json({ message: "email deliverd" });
          }).catch((error) => {
            res.status(400).json({ message: "error: " + error?.message });
          })


    } catch (error) {
        res.status(400).json({ message: error?.mesage });
    }
});

app.listen(5000, () => {
    console.log("Listening on port : " + 5000)
  });