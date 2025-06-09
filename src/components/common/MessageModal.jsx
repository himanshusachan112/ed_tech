import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { messages } from '../../apis/apis';
import { toast } from 'react-toastify';
import { apiConnector } from '../../utils/Apiconnecter';
import { messagesroutes } from '../../apis/apis';
import {Socket} from '../../socket'
import { useRef } from 'react';

const MessageModal = ({ setmodal }) => {
  const scrollRef = useRef(null);
  const [email, setEmail] = useState('');
  const [groupname, setgroupname] = useState('');
  const [friends,setfriends]=useState([]);
  const [pendingreq, setpendingreq] = useState([]);
  const { profile } = useSelector((state) => state.Profile);
  const {token}=useSelector((state)=>state.Auth);
  const [chats, setchats] = useState([]);
  const [messages, setmessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [selectedEmail,setSelectedEmail]=useState("");
  const [isgroupchat, setisgroupchat]=useState(null);
  const [groupId, setgroupId]=useState("");

  

  const messagesubmithandler = (e) => {
    e.preventDefault();
    if(!newMessage){
      console.log("no message");
      return ;
    }
    console.log(newMessage);
    
    if(Socket.connected){
      Socket.emit('send-message', {content:newMessage, groupId, senderId : profile._id }, (response)=>{
        console.log(response)
        if(response.success){
          console.log("message sent successfully", newMessage);
        }
        else{
          toast.error('failed to sent')
        }
      })
    }
    else{
      toast.error("Refresh Page");
    }
    setNewMessage("");
  };

  const getmessages_handler = async() => {
    try{
      const response=await apiConnector("POST", messagesroutes.GETMESSAGE_BYCHATID, null, {
        Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error("errorr")
      }
      console.log("theser are messages=>>>", response.data.data );
      setmessages(response.data.data);
    }
    catch(err){
      console.log("error while fetching messages")
    }
  };

  const handleAddMember = async() => {
    if (!email.trim()) return;
    console.log('Adding member with email:', email);

    const toastid=toast.loading("...Loading");
    try{
      const rec_email=email;
      
      const response=await apiConnector("POST", messagesroutes.SENDREQUEST, {rec_email} , {
        Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error(response.data.message)
      }
      console.log(response.data);
      toast.success("Request send");

    }
    catch(err){
      console.log("error while fetching request");
    }
    toast.dismiss(toastid);
    setEmail('');
  };

  const handlecreategroup = async() => {
    try{
      const response=await apiConnector("POST", messagesroutes.CREATE_GROUP, {name:groupname},{
        Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error("err or");
      }
      console.log(response.data.data);
      setchats((prev)=>[...chats,response.data.data]);
      toast.success("Group created")

    }
    catch(err){
      console.log("error occur");
      toast.error("error occoured")
    }
  };

  const handlesendrequests = async() => {
 
    try{
      const response=await apiConnector("POST", messagesroutes.GETSEND_PENDINGREQUEST, null,{
        Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error("error ")
      }
      console.log(response.data.data);
      setpendingreq(response.data.data);
    }
    catch(err){
      console.log("error while fetcing sending reqest");
    }
  };

  const handlerecievedrequest = async() => {
    try{
      const response=await apiConnector("POST", messagesroutes.GETRECIEVED_PENDINGREQUEST, null, {
        Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error("error")
      }
      console.log(response.data.data);
      setpendingreq(response.data.data)
    }
    catch(err){
      console.log("error while reciveing reqwusts")
    }
  };

  const acceptrequst_handler = async(requestId) => {
    try{ 

      const response=await apiConnector("POST", messagesroutes.ACCEPT_REQUEST, {requestId},{
        Authorization: `Bearer ${token}`,
      } )
      if(!response.data.success){
        throw new Error("error")
      }
      console.log(response.data.data);
      let leftrequests=[];
      pendingreq.forEach((req)=>{
        if(req._id!==requestId) leftrequests.push(req);
      })
      toast.success("Request accepted")
      setchats([...chats, response.data.data]);
      setfriends([...friends, response.data.data])
      setpendingreq(leftrequests);
    }
    catch(err){
      console.log("error wile accepting reqwust")
    }
  };

  const addgroupmember_handler=async()=>{
    console.log(selectedEmail)
    try{
      const response=await apiConnector("POST", messagesroutes.ADD_MEMBERGROUP, {groupId , newMemberId : selectedEmail },{
        Authorization: `Bearer ${token}`,
      } )
      if(!response.data.success){
        throw new Error("error")
      }
      console.log(response.data.data);
      toast.success("Added member successfully")
    }
    catch(err){
      console.log("error while adding new member")
      toast.error("try again..")
    }
  }

  const fetchats = async () => {
    try { 
      console.log("fetching chat initiated")
      const response=await apiConnector("POST", messagesroutes.GETUSER_CHATANDGROUPS, null,{
        Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error("erro");
      }
      console.log("friends=> ",response.data.friends);
      console.log("groups=> ", response.data.groups); 
      toast.success('fetched chats');
      setfriends(response.data.friends);
      setchats([...response.data.friends, ...response.data.groups]);

      
    } catch (err) {
      console.log("chats cannot be fetched");
      toast.error("chats not fetched");
    }
  };

  const handlechat_click=(chat)=>{
      setisgroupchat(chat.groupChat);
      setgroupId(chat._id)   
      
               
  }



  useEffect(() => {
    fetchats();
    getmessages_handler();
    Socket.connect();

    Socket.on('receive-message', (message)=>{
      console.log("reciveing messages in reald time");
      console.log(message);
      const chatId=message.chat;
      setmessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
    })

    
    return ()=>{
      Socket.disconnect();
      Socket.off("receive-message");
    }

  }, []);


  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    if(Socket.connected){
      // console.log("this is the group id to send to join room ",groupId)
      Socket.emit('join-room', groupId);
    }

    // Use requestAnimationFrame for smoothness and waiting for layout changes
    requestAnimationFrame(scrollToBottom);
  }, [messages,groupId]);

  return (
    <div className="fixed inset-0 z-40 backdrop-blur-md flex items-center justify-center">
      <div className="w-[95%] max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-blue-700 text-white flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold">Message to Your Friends & Groups</h2>
          <div className="flex gap-4">
            {/* Add Friend */}
            <div className="relative group">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Add Friend</button>
              <div className="absolute top-12 right-0 bg-gray-900 text-white p-4 rounded-md w-72 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <p className="mb-2 text-sm">Add a Friend via Email</p>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-2 py-1 rounded bg-gray-100 text-black"
                  />
                  <button onClick={handleAddMember} className="bg-green-400 hover:bg-green-600 px-2 py-1 rounded text-sm">
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Create Group */}
            <div className="relative group">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Create Group</button>
              <div className="absolute top-12 right-0 bg-gray-900 text-white p-4 rounded-md w-72 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={groupname}
                  onChange={(e) => setgroupname(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-gray-100 text-black mb-2"
                />
                <button onClick={handlecreategroup} className="bg-green-500 hover:bg-green-600 w-full py-1 rounded">
                  Submit
                </button>
              </div>
            </div>

            {/* Pending Requests */}
            <div className="relative group">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Pending Requests</button>
              <div className="absolute top-12 right-0 bg-gray-900 text-white p-4 rounded-md w-80 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50 max-h-72 overflow-y-auto">
                <div className="flex justify-between items-center text-sm mb-3 border-b border-gray-600 pb-1">
                  <button onClick={handlesendrequests} className="hover:underline">
                    Sent
                  </button>
                  <button onClick={handlerecievedrequest} className="hover:underline">
                    Received
                  </button>
                </div>

                {pendingreq.length === 0 ? (
                  <p className="text-gray-400 text-sm">No pending requests</p>
                ) : (
                  pendingreq.map((req, i) => (
                    <div key={i} className="mb-3 p-2 rounded bg-gray-700 shadow-sm">
                      {req.sender._id!== profile._id ? 
                      <div className="text-xs text-gray-300 truncate">{req.sender.email}</div> : 
                      <div className="text-sm font-medium">{req.receiver.email}</div> }
                      
                      {req.sender._id!== profile._id && (
                        <button
                          onClick={()=>acceptrequst_handler(req._id)}
                          className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded transition"
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Close Icon */}
            <FaTimes size={18} className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => setmodal(false)} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-row flex-grow h-[500px]">
          {/* Chat List */}
          <div className="w-[30%] bg-blue-100 overflow-y-auto border-r border-gray-300 p-4 space-y-3">
            {chats.map((chat, index) => {
              const dost=chat.members.find((m)=>m._id!==profile._id);
              return (
              <div
                key={index}
                onClick={()=>handlechat_click(chat)}
                className={` p-2 rounded shadow cursor-pointer hover:bg-blue-200 transition ${chat._id===groupId ? ' bg-blue-500 text-white ' : ' bg-white '}`}
              >
                {chat.groupChat ? chat.name : `${dost.email}`}
              </div>
            )
            })}
          </div>

          {/* Messages & Input */}
          <div className="w-[70%] bg-white flex flex-col p-2 overflow-hidden relative">


            {isgroupchat ? (<div className="flex flex-row justify-between items-center bg-blue-500 p-1 rounded-md shadow-md">
              <button
                onClick={addgroupmember_handler}
                className=" text-white bg-green-500 font-semibold px-4  rounded hover:bg-green-300 transition"
              >
                Add Member +
              </button>

              <div className="w-2/3 ml-4">
                <select
                  name="gmail"
                  id="gmail-select"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  className="w-full px-3  rounded border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value=""  >--Please choose an option--</option>
                  {friends.map((chat, i) =>{
                    const dost=chat.members.find((m)=>m._id!==profile._id);
                    return (
                    <option 
                      key={i} 
                      value={dost._id}
          
                    >
                      {dost.email}
                    </option>
                  )
                  })}
                </select>
              </div>
            </div>) : <></>}

            {/* messages */}
            <div className="flex-grow overflow-y-auto space-y-3 pr-2 " ref={scrollRef}>
              {groupId &&  messages[groupId]?.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 max-w-[75%] rounded-lg shadow-md ${
                    profile._id === message.sender._id
                      ? 'ml-auto w-fit bg-[#25D366] text-white text-right'  // WhatsApp green for sender
                      : 'mr-auto w-fit text-white bg-black text-left'          // light gray for receiver
                  }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  <div className="text-xs font-semibold opacity-70">
                    {message.sender.email}
                  </div>
                  <div className="text-sm">{message.content}</div>
                </div>
              ))}
            </div>


            {/* Message Input */}
            <form onSubmit={messagesubmithandler} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Type here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
