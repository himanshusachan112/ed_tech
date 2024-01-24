exports.signuptemplate=(role)=>{
    return `<DOCTYPE html>
    <html>
        <head>

        <meta charset="UTF-8">
		<title>OTP Verification Email</title>
        <style>
            
        </style>
        </head>


        <body>
            <div class='head'>Welcome to the Study Notion</div>
            <div class='sugg'>We hope that you find it best</div>
            <div class='otp'>You are registered successfylly to the Study Notion as the role of ${role}</div>
        </body>
    </html>
    `
}