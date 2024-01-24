exports.Paymentsuccess=(orderid,paymentid,amount)=>{
    return `<DOCTYPE html>
    <html>
        <head>

        <meta charset="UTF-8">
		<title>Payment success Email</title>
        <style>
            
        </style>
        </head>


        <body>
            <div>
                This is the email for payment successful email
            </div>
            <div>
                order id is ${orderid}    
            </div>
            <div>
                Payment id is ${paymentid}
            </div>
            <div>
                Amount is ${amount}
            </div>
        
        </body>
    </html>
    `
}