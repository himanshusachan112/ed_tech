const Category=require("../models/Category");
const User = require("../models/User");
require("dotenv").config();


exports.createcategory=async (req,res)=>{
    try{
        const userid=req.user.id;
        const accounttype=req.user.accounttype
        const {name,description}=req.body;
        if(!name|| !description ||!userid){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

        const user=await User.findOne({_id:userid,accounttype:accounttype})
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered"
            })
        }

        const category=await Category.create({
            name,description
        })

        res.json({
            success:true,
            message:"Category created successfully",
            data:category,
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while creating category"
        })
    }


}



exports.showallcategory=async (req,res)=>{
    try{
        const category=await Category.find();
        console.log("cataegory page data=>",category);
        res.json({
            success:true,
            message:"Fetched Category Details Successfully",
            data:category
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while fetching catefory details"
        })
    }
}



exports.updatecategory=async (req,res)=>{
    try{
        console.log("updating category started")
        const {id,accounttype}=req.user;
        console.log("one")
        const {name,description,catid}=req.body;
        if(!name || !description){
            return res.json({
                success:false,
                message:"all fields are required"
            })
        }
        console.log("ckeckign user stared")
        const checkuser=await User.findOne({_id:id,accounttype:accounttype})
        console.log(checkuser);
        if(!checkuser){
            return res.json({
                success:false,
                message:"user not registered"
            })
        }

        const category=await Category.findByIdAndUpdate(catid,{
            name,description
        },{new:true});
        console.log(category);
        if(!category){
            return res.json({
                success:false,
                message:"No such category found"
            })
        }

        res.json({
            success:true,
            message:"Updated category successfylly",
            data:category
        })

    }
    catch(err){
        console.log("erro is",err)
        return res.json({
            success:false,
            message:"something went wrong while updating category"
        })
    }
}



exports.deletecategory=async (req,res)=>{
    try{
        const {id,accounttype}=req.user;
        const {catid}=req.body;
        const checkuser=await User.findOne({_id:id,accounttype:accounttype})
        if(!checkuser){
            return res.json({
                success:false,
                message:"user not registered"
            })
        }

        const cat=await Category.findByIdAndDelete(catid);
        if(!cat){
            return res.json({
                success:false,
                message:"No such category found"
            })
        }
        res.json({
            success:true,
            message:"Deleted category successfylly"
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while deleteing category"
        })
    }
}


