const Course=require("../models/Course");
const User=require("../models/User");
const Courseprogress=require("../models/Courseprogress");
const crypto=require("crypto")
require("dotenv").config();


// creating and order function
const {instance}=require("../config/Razorpay");
const { mailsender } = require("../utils/SendMail");
const { Paymentsuccess } = require("../mailtemplates/Paymentsuccess");
exports.capturePayment=async (req,res)=>{
    console.log("initiating capturepayment")
    const {courses}=req.body;
    const userid=req.user.id;
    let total_amount=0;
    courses.forEach(course => {
        total_amount+=course?.price;
    });
    console.log("total amount ",total_amount);
    const options={
        amount:total_amount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{
        const paymentresponse=await instance.orders.create(options);
        console.log("response of order is ",paymentresponse);
        res.json({
            success:true,
            data:paymentresponse,
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"Order Creation Failed",
        })
    }

}


//verifying payment function.
exports.verifyPayment=async (req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id;
    const email=req.user.email;
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex")

    if(expectedSignature===razorpay_signature){
        //prerform database operation while payment is verified.
        courses.forEach(async(course)=>{
            await Course.findByIdAndUpdate(course._id,
                {$push:{studentsenrolled:userId}})
            
            await User.findByIdAndUpdate(userId,
                {$push:{courses:course._id}})

            const courseprogress=await Courseprogress.create({course:course._id,email});
            await User.findByIdAndUpdate(userId,
                {$push:{courseprogress:courseprogress._id}});
        })



        return res.json({
            success:true,
            message:"Payment verified"
        })
    }
    return res.json({
        success:false,
        message:"Payment Failed",
    })


}


exports.paymentsuccessemail=async (req,res)=>{
    try{
        const {email,id}=req.user;
        const {orderid,paymentid,amount}=req.body;
        await mailsender(email,"Payment success Email",Paymentsuccess(orderid,paymentid,amount))
    }
    catch(err){
        console.log("something went wrong while sendign emalaa")
    }
}
