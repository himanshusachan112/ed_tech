const Request=require("../models/request");
const Chat=require("../models/chat");
const User=require("../models/User");
const Message=require("../models/message");

exports.sendRequest = async (req, res) => {
  try {
    
    const { rec_email } = req.body;
    const receiverId=await User.findOne({email : rec_email});
    const senderId = req.user.id; 

    const existing = await Request.findOne({ sender: senderId, receiver: receiverId });
    if (existing) return res.status(400).json({ message: "Request already sent" });

    const request = await Request.create({ sender: senderId, receiver: receiverId });
    res.status(201).json({ 
      success: true, 
      data:request });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", err });
  }
};


exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId)
      .populate("sender", "_id firstname")
      .populate("receiver", "_id firstname");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    const senderId = request.sender._id;
    const receiverId = request.receiver._id;

   
     let= existingChat = await Chat.create({
        name: `${request.sender.firstname} & ${request.receiver.firstname}`,
        groupChat: false,
        members: [senderId, receiverId],
      });
  
    res.status(200).json({
      success: true,
      message: "Request accepted and chat created/joined",
      data: existingChat,
    });
  } catch (err) {
    console.error("Error accepting request:", err);
    res.status(500).json({ success: false, message: "Server error", err });
  }
};


exports.getRecivedPendingRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const pendingRequests = await Request.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "firstname lastname email image")
    .populate("receiver", "firstname lastname email image");;

    res.status(200).json({
      success: true,
      data: pendingRequests,
    });
  } catch (err) {
    console.error("Error getting pending requests:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get pending requests",
    });
  }
};

exports.getSentPendingRequests = async (req, res) => {
  try {
    const userId = req.user.id; // assumes auth middleware

    const sentPendingRequests = await Request.find({
      sender: userId,
      status: "pending",
    }).populate("receiver", "firstname lastname email image")
    .populate("sender", "firstname lastname email image");;

    res.status(200).json({
      success: true,
      data: sentPendingRequests,
    });
  } catch (err) {
    console.error("Error getting sent pending requests:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get sent pending requests",
    });
  }
};




exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const creatorId = req.user.id; // assumes auth middleware

    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }

    const groupChat = await Chat.create({
      name,
      groupChat: true,
      creator: creatorId,
      members: [creatorId], // creator added as first member
    });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: groupChat,
    });
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ success: false, message: "Failed to create group" });
  }
};


exports.addMemberToGroup = async (req, res) => {
  try {
    const { groupId, newMemberId } = req.body;
    const currentUserId = req.user.id; 
    	console.log("body", req.body);
      
    // Find group and verify creator
    const group = await Chat.findById(groupId);
    if (!group || !group.groupChat) {
      return res.status(404).json({ message: "Group not found or not a group chat" });
    }
    console.log("first")

    if (group.creator.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "Only group creator can add members" });
    }
    console.log("second")

    // Check if user already in group
    if (group.members.includes(newMemberId)) {
      return res.status(400).json({ message: "User is already a member of the group" });
    }
    console.log("third")

    // Check if user exists
    const user = await User.findById(newMemberId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

      console.log("fourth")
    // Add user to group
    group.members.push(newMemberId);
    await group.save();

    console.log("fifth")
    res.status(200).json({
      success: true,
      message: "User added to group",
      group,
    });
  } catch (err) {
    // console.error("Error adding member to group:", err);
    res.status(500).json({ success: false, message: "Server error", err });
  }
};


exports.sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    const senderId = req.user.id;

    if (!content || !chatId) {
      return res.status(400).json({ message: "Content and chatId are required" });
    }

    // Optional: Check if chat exists and sender is a member
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.members.includes(senderId)) {
      return res.status(403).json({ message: "You are not a member of this chat" });
    }

    const newMessage = await Message.create({
      content,
      sender: senderId,
      chat: chatId,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ success: false, message: "Server error", err });
  }
};


exports.getMessagesByChatId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all chats for the user
    const chats = await Chat.find({ members: userId }).select('_id');
    const chatIds = chats.map(chat => chat._id);

    // Fetch all messages from those chats
    const messages = await Message.find({ chat: { $in: chatIds } })
      .populate("sender", "firstname lastname email")
      .sort({ createdAt: 1 });

    // Group messages by chatId
    const groupedMessages = {};
    messages.forEach(msg => {
      const cid = msg.chat.toString();
      if (!groupedMessages[cid]) groupedMessages[cid] = [];
      groupedMessages[cid].push(msg);
    });

    res.status(200).json({ 
      success: true,
      data: groupedMessages,
    });
  } catch (err) {
    // console.error("Error fetching grouped messages:", err);
    res.status(500).json({ success: false, message: "Server error", err });
  }
};



exports.getUserChatsAndGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    // All 1-on-1 chats (friend list)
    const friends = await Chat.find({
      groupChat: false,
      members: userId,
    }).populate("members", "firstname lastname email image");

    // All group chats where user is a member
    const groups = await Chat.find({
      groupChat: true,
      members: userId,
    }).populate("creator", "firstname lastname").populate("members", "firstname");

    res.status(200).json({
      success: true,
      friends,
      groups,
    });
  } catch (err) {
    // console.error("Error fetching chats and groups:", err);
    res.status(500).json({ success: false, message: "Server error", err });
  }
};


