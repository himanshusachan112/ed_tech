const SibApiV3Sdk = require('@getbrevo/brevo');
require("dotenv").config();

exports.mailsender = async (email, title, body) => {
    try {
        // 1. Initialize the API client
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        
        // 2. Configure the API Key
        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        // 3. Define the email content
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;
        sendSmtpEmail.sender = { "name": "CodeReps", "email": process.env.MAIL_USER };
        sendSmtpEmail.to = [{ "email": email }];

        // 4. Send the request
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("API Email sent successfully:", result.messageId);
        return result;

    } catch (err) {
        console.error("Brevo API Error:", err.response?.text || err.message);
        throw err;
    }
};