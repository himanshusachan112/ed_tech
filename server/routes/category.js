const express=require("express");
const router=express.Router();


const {isadmin,isinstructor,isstudent,auth}=require("../middlewares/auth");
const { createcategory, showallcategory, updatecategory, deletecategory } = require("../controllers/category");


router.post("/createcategory",auth,isadmin,createcategory);
router.get("/fetchcategory",showallcategory);
router.post("/updatecategory",auth,isadmin,updatecategory);
router.delete("/deletecategory",auth,isadmin,deletecategory);


module.exports=router;