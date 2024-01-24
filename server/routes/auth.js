const express=require("express");
const { sendotp ,signup, login,forgotpasswordtoken,forgotpassword} = require("../controllers/Auth");

const router=express.Router();


//user routes
router.post("/sendotp",sendotp);
router.post("/signup",signup);
router.post("/login",login);
router.post("/forgotpasswordtoken",forgotpasswordtoken);
router.post("/forgotpassword",forgotpassword);





// Export the router for use in the main application
module.exports = router