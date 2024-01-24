const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.auth=async (req,res,next)=>{

    try{
        const token=req.cookies.token ||
                    req.body.token ||
                    req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.json({
                success:false,
                message:"Token is Missing"
            })
        }

        //validating the token.
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
        }
        catch(err){
            return res.json({
                success:false,
                message:"Invalid Token",
            })
        }
        next();

    }
    catch(err){
        return res.json({
            success:false,
            message:"Something Went Wrong While Validating the Token",
        })
    }
}


exports.isstudent=async (req,res,next)=>{

    try{
        if(req.user.accounttype!=="Student"){
           return res.json({
                success:false,
                message:"This is Protected Route For Student"
            })
        }

        next();
    }
    catch(err){
       return res.json({
            success:false,
            message:"something went wrong while chceking student route"
        })
    }
}


exports.isinstructor=async (req,res,next)=>{

    try{
        if(req.user.accounttype!=="Instructor"){
            return res.json({
                success:false,
                message:"This is Protected Route For Instructor"
            })
        }
        next();
    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while validating Instructor route"
        })
    }
}


exports.isadmin=async (req,res,next)=>{

    try{
        if(req.user.accounttype!=="Admin"){
            return res.json({
                success:false,
                message:"This is Protected Route For Admin"
            })
        }

        next();
    }
    catch(err){
        return res.json({
            success:false,
            message:"Something went wrong while checking admin route"
        })
    }
}