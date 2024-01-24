const mongoose=require("mongoose");

const subsectionschema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    videourl:{
        type:String,
    },
    duration:{
        type:String,
    }
});

module.exports=mongoose.model("Subsection",subsectionschema);