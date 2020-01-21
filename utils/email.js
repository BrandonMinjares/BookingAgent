const nodemailer = require('nodemailer');


// Currently using Mailtrap, in production we will probably use MailGun
// don't use gmail because of "less secure", especially in production and email per day limit

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;