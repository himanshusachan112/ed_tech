const mongoose=require("mongoose");


const profileschema=new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male","Female","Other"],
    },
    dateofbirth:{
        type:String,
    },
    about:{
        type:String,
    },
    contactno:{
        type:Number,
    },
    
});

module.exports=mongoose.model("Profile",profileschema);