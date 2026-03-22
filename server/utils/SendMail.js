const Brevo = require('@getbrevo/brevo');
require("dotenv").config();

exports.mailsender = async (email, title, body) => {
    try {
        // 1. Initialize the API client
        let apiInstance = new Brevo.TransactionalEmailsApi();

        // 2. Configure API Key using the new setApiKey method
        apiInstance.setApiKey(
            Brevo.TransactionalEmailsApiApiKeys.apiKey, 
            process.env.BREVO_API_KEY
        );

        // 3. Prepare the email object
        let sendSmtpEmail = new Brevo.SendSmtpEmail();
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;
        sendSmtpEmail.sender = { 
            "name": "CodeReps", 
            "email": process.env.MAIL_USER 
        };
        sendSmtpEmail.to = [{ "email": email }];

        // 4. Send the email
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        
        console.log("Brevo API called successfully. Message ID:", data.body.messageId);
        return data;

    } catch (err) {
        // Detailed error logging to catch any API rejection
        console.error("BREVO_API_ERROR:", err.response?.body || err.message);
        throw err;
    }
};