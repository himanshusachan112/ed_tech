import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { apiConnector } from '../../../utils/Apiconnecter';
import { playlist_earning } from '../../../apis/apis';
import { useSelector } from 'react-redux';

const Playlist_modal = ({existingPlaylists,setexistingPlaylists, setmodal, hasplaylist}) => {
  const [name,setname]=useState("");
  const [thumbnail,setthumbnail]=useState("");
  const {token}=useSelector((state)=>state.Auth);

  const handlecreate= async()=>{
    if(hasplaylist(name)){
      toast.message("Choose Another Name");
      return ;
    }
    if(name.length==0 ){
      setmodal(0);
      return ;
    }
    const formdata=new FormData();
    formdata.append("thumbnail",thumbnail);
    formdata.append("name",name);
    const toastid=toast.loading("...Loading")
    try{
      const response=await apiConnector("POST", playlist_earning.CREATE_PLAYLIST, formdata,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
        )

      if(!response.data.success){
        throw new Error("error occoured");
      }
      console.log(response.data.data);
      const obj={
        playlist_id:response.data.data[0].id,
        name:response.data.data[0].name,
        thumbnail_url:response.data.data[0].thumbnail_url,
        videos:[]
      }
      console.log("obj=>",obj)
      setexistingPlaylists((prev)=>[...prev,obj]);
      toast.success("Created Playlist")

    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
    toast.dismiss(toastid);
    setmodal(0);

  }

  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center z-20'>
  <div className='w-[40%] mx-auto bg-amber-800 p-4 rounded-md'>
    <div className='text-3xl text-white font-bold'>
      Create new Playlist
    </div>
    <div className='flex flex-col mt-4 space-y-4'>
      {/* Playlist Name Input */}
      <input 
        type='text' 
        onChange={(e) => setname(e.target.value)} 
        className='w-full rounded-sm text-black text-2xl p-2'  
        placeholder='Enter Name'
      />

      {/* Thumbnail Upload */}
      <input 
        type='file' 
        accept='image/*' 
        onChange={(e) => setthumbnail(e.target.files[0])} 
        className='text-white text-lg'
      />

      {/* Create Button */}
      <button 
        onClick={handlecreate} 
        className='text-3xl text-white bg-green-600 rounded-md py-2 px-4 hover:bg-green-700 transition'
      >
        Create
      </button>
    </div>
  </div>
</div>

  )
}

export default Playlist_modal;