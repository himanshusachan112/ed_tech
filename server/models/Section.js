const mongoose=require("mongoose");


const sectionschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    subsection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection"
    }]
});

module.exports=mongoose.model("Section",sectionschema);