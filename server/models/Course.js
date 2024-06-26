const mongoose=require("mongoose");

const courseschema=new mongoose.Schema({
    coursename:{
        type:String,
        required:true,
        trim:true,
    },
    coursedescription:{
        type:String,
        required:true,
        trim:true,
    },
    whatyouwilllearn:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    tag:{
        type:[String],
        required:true,
    },
    instructions:{
        type:[String],
        required:true,
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createdat:{
        type:Date,
        default:Date.now,
    },
    soldquantity:{
        type:Number,
        default:0,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    studentsenrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    sections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingandreviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ratingandreviews",
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }

})


module.exports=mongoose.model("Course",courseschema);