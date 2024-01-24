const express=require("express");
const router=express.Router();


const {isadmin,isinstructor,isstudent,auth}=require("../middlewares/auth");
const { updateprofile, updateuser } = require("../controllers/user");



router.post("/updateprofile",auth,updateprofile);
router.post("/updateuser",auth,updateuser);



module.exports=router;