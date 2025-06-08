const express=require("express");
const app=express();
require("dotenv").config();
PORT=process.env.PORT || 4000
const cors=require("cors");
const fileupload=require("express-fileupload");
const cookieparser=require("cookie-parser");

//............importing events..............
const {send_receive_message}=require("./controllers/socket_events");

// ..........................................

//.....websockets...............
const http=require("http");
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server,{
    cors: {
    origin:"https://code-rep.netlify.app",
    credentials: true,
    methods: ["GET", "POST"],
  },
});
const {socketauth}=require('./middlewares/auth');
io.use(socketauth);
//............................

//importing functions
const {databaseConnect_mongodb, databaseConnect_prostesql}=require("./config/ConnectToDatabase");
const {cloudinaryConnect}=require("./config/ConnectToCloudinary");

//importing all the routes
const authroutes=require("./routes/auth");
const userroutes=require("./routes/user");
const categoryroutes=require("./routes/category");
const courseroutes=require("./routes/course");
const paymentroutes=require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");
const playlist_earning=require("./routes/Playlist_earnings");
const chatsection=require('./routes/chatsection');


//managing the server usage.
app.use(express.json())
app.use(cookieparser());
app.use(cors({
    origin:"https://code-rep.netlify.app",
    // origin:"http://localhost:3000",
    credentials:true,
}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}))

//connecting to database.
databaseConnect_mongodb();
databaseConnect_prostesql();

//connecting to cloudinary.
cloudinaryConnect();

//defining the routes
app.use("/api/v1/auth",authroutes);
app.use("/api/v1/user",userroutes);
app.use("/api/v1/category",categoryroutes);
app.use("/api/v1/course",courseroutes);
app.use("/api/v1/payment",paymentroutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/playlist_earning", playlist_earning);
app.use("/api/v1/chatsection/",chatsection);

//==============.........io connection........
io.on('connection',(socket)=>{
    console.log(" socket connection is successfull"); 

    socket.on('send-message', (data,callback)=>{
        // console.log(data);
        send_receive_message(data,callback,io);
    })
 
    socket.on("join-room", (roomId) => { 
        socket.join(roomId);
    });
    
    socket.on("disconnect",()=>{
        console.log('socket is disconnected')
    })

})


//default route.
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is Up and Running.....",
    })
})

//starting the port.
server.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})

 