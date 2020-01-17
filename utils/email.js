const nodemailer = require('nodemailer');


// Currently using Mailtrap, in production we will probably use MailGun
// don't use gmail because of "less secure", especially in production and email per day limit

const sendEmail = async options => {
    // 1) Create a transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Brandon Minjares',
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html:
    };
    // 3) Actually send the email with Nodemailer
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;