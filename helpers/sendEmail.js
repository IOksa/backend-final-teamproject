const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILTRAP_USER, MAILTRAP_PASS, HOST_MAIL, MAIL_SENDER } = process.env;


const nodemailerConfig = {
  host: HOST_MAIL,
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);


function sendEmail(message) {
  message['from'] = MAIL_SENDER;

  return transport.sendMail(message);
}

module.exports = sendEmail;
