const nodemailer = require('nodemailer');
const createHandler = require('../lib/contact');
let transport;
module.exports = createHandler({ sendMail: (message) => {
    transport ||= nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_APP_PASSWORD?.replace(/\s/g, '') },
        connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
        disableFileAccess: true, disableUrlAccess: true
    });
    return transport.sendMail(message);
} });
