const nodemailer = require('nodemailer');

const sentEmail = async option => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}`,
        to: option.email,
        subject: option.subject,
        text: option.text,
        html: option.html
    };

    await transporter.sendMail(message);
}

module.sendEmail = sentEmail;