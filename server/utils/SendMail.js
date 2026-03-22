const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailsender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,           // Standard port for STARTTLS
            secure: false,        // Use false for port 587; true for 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, // This MUST be an App Password if using Gmail
            },
            tls: {
                // This prevents the connection from hanging on restricted cloud networks
                rejectUnauthorized: false 
            }
        });

        let info = await transporter.sendMail({
            // It's best practice to include the email address in the 'from' field
            from: `"CodeReps | NITASPACE" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        console.log("Email sent successfully: ", info.messageId);
        return info;
    } catch (err) {
        console.error("Nodemailer Error: ", err.message);
        // Throw the error so the calling function knows the email failed
        throw err; 
    }
}