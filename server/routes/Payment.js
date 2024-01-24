const express=require("express");
const router=express.Router();
const {auth,isadmin,isinstructor,isstudent}=require("../middlewares/auth");
const { capturePayment, verifyPayment, paymentsuccessemail } = require("../controllers/Payment");


router.post("/capturepayment",auth,isstudent,capturePayment);
router.post("/verifypayment",auth,isstudent,verifyPayment);
router.post("/paymentsuccessemail",auth,isstudent,paymentsuccessemail);

module.exports=router;