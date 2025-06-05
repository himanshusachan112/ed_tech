const express=require("express");
const router=express.Router();


const {auth}=require("../middlewares/auth");
const { createplaylist, getplaylist, uploadvideo ,getPaginatedVideos} = require("../controllers/Playlist_earnings");

router.post("/createplaylist",auth,createplaylist);
router.post("/getplaylist",auth, getplaylist);
router.post("/uploadvideo",auth,uploadvideo);
router.get("/getPaginatedVideos",auth, getPaginatedVideos);

module.exports=router;
