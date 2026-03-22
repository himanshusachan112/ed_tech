const axios = require("axios");
require("dotenv").config();

exports.mailsender = async (email, title, body) => {
    try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { 
                    name: "CodeReps", 
                    email: process.env.MAIL_USER 
                },
                to: [{ 
                    email: email 
                }],
                subject: title,
                htmlContent: body,
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY,
                    'content-type': 'application/json',
                },
            }
        );

        console.log("Email sent successfully! Message ID:", response.data.messageId);
        return response.data;

    } catch (err) {
        // This will tell us EXACTLY why Brevo rejected it (e.g., wrong API key or sender)
        console.error("BREVO_REST_API_ERROR:", err.response?.data || err.message);
        throw err;
    }
};