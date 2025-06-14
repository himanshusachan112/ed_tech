const mongoose=require("mongoose");

const schema = new mongoose.Schema(
  {
    content: {
      type:String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("Message", schema);