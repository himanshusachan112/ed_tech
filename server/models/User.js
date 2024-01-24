const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    hashedpassword:{
        type:String,
        required:true,
    },
    accounttype:{
        type:String,
        enum:["Admin","Instructor","Student"],
        required:true,
    },
    forgotpasswordlink:{
        type:String,
    },
    forgotpasswordlinkexpires:{
        type:Date,
    },
    image:{
        type:String,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    additionaldetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    courseprogress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courseprogress"
    }],
    deleteat:{
        type:Date,
    }
    

})

module.exports=mongoose.model("User",userschema);