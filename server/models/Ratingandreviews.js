const mongoose=require("mongoose");

const ratingandreviewSchema=new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   rating:{
    type:Number
   },
   review:{
    type:String
   },
   course:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Ratingandreviews"
   }


});

module.exports=mongoose.model("Ratingandreviews",ratingandreviewSchema);