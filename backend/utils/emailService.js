const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or another email provider
            auth: {
                user: process.env.EMAIL_USER, // Web owner Email
                pass: process.env.EMAIL_PASS, //WEb Owner email password
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent sucessfully');
    }catch(error){
        console.log('Error sending mail:', error.message);
    }
};

module.exports = sendEmail;