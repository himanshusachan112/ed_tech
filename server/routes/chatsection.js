const express=require("express");
const router=express.Router();


const {auth}=require("../middlewares/auth");
const { sendRequest,
        getRecivedPendingRequests,
        getSentPendingRequests,
        acceptRequest,
        
        createGroup,
        addMemberToGroup,
        getUserChatsAndGroups,
        
        sendMessage,
        getMessagesByChatId,


} = require("../controllers/chatsection");

router.post("/sendRequest",auth,sendRequest);
router.post("/getRecivedPendingRequests",auth, getRecivedPendingRequests);
router.post("/acceptRequest",auth,acceptRequest);
router.post("/getSentPendingRequests",auth, getSentPendingRequests);
router.post("/createGroup",auth, createGroup);
router.post("/addMemberToGroup",auth, addMemberToGroup);
router.post("/sendMessage",auth, sendMessage);
router.post("/getMessagesByChatId",auth, getMessagesByChatId); 
router.post("/getUserChatsAndGroups",auth, getUserChatsAndGroups); 

module.exports=router;
