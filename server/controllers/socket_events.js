const Request=require("../models/request");
const Chat=require("../models/chat");
const User=require("../models/User");
const Message=require("../models/message");

exports.send_receive_message=async(data,callback,io)=>{
    try{
        console.log(data)
        const newMessage = await Message.create({
            content: data.content,
            chat: data.groupId,
            sender: data.senderId,
        });
        await newMessage.populate("sender", "firstname lastname email");
        console.log("done messge saving")
        io.to(data.groupId).emit("receive-message",newMessage);
        console.log("sent to roomid", data.groupId)

        callback({
            success:true,
            data:newMessage
        });
    }
    catch(err){
        console.error("Error saving message:", err);
        callback({ success: false, 
                   message: err.message 
        });
    }
}