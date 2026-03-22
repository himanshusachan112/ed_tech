import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { apiConnector } from '../../../utils/Apiconnecter';
import { playlist_earning } from '../../../apis/apis';
import { useSelector } from 'react-redux';

const Playlist_modal = ({existingPlaylists, setexistingPlaylists, setmodal, hasplaylist}) => {
  const [name, setname] = useState("");
  const [thumbnail, setthumbnail] = useState(null); 
  const {token} = useSelector((state) => state.Auth);

  const handlecreate = async () => {
    // 1. Validation
    if (name.trim().length === 0) {
      toast.error("Please enter a playlist name");
      return;
    }
    
    if (hasplaylist(name)) {
      toast.error("This name is already taken");
      return;
    }

    if (!thumbnail) {
      toast.error("Please select a thumbnail image");
      return;
    }

    const toastid = toast.loading("Creating playlist...");
    
    try {
      const formdata = new FormData();
      
      // CRITICAL FIX: Changed "thumbnailImage" to "thumbnail" 
      // This must match your backend: const thumbnail = req.files.thumbnail;
      formdata.append("thumbnail", thumbnail); 
      formdata.append("name", name);

      const response = await apiConnector(
        "POST", 
        playlist_earning.CREATE_PLAYLIST, 
        formdata,
        {
          // We leave out "Content-Type" so the browser sets the boundary correctly
          Authorization: `Bearer ${token}`, 
        }
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message || "Failed to create playlist");
      }

      // 2. Format the new object for your state
      // PostgreSQL returns an array of rows, so we take result.data[0]
      const newPlaylist = Array.isArray(result.data) ? result.data[0] : result.data;

      const obj = {
        playlist_id: newPlaylist.id, // PostgreSQL uses "id"
        name: newPlaylist.name,
        thumbnail_url: newPlaylist.thumbnail_url,
        videos: []
      };

      setexistingPlaylists((prev) => [...prev, obj]);
      toast.success("Playlist created successfully!");
      setmodal(0); 

    } catch (err) {
      console.error("CREATE_PLAYLIST_ERROR:", err);
      // Display the specific error message from the backend if available
      toast.error(err.response?.data?.message || err.message || "Error occurred");
    } finally {
      toast.dismiss(toastid);
    }
  }

  return (
    <div className='fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 bg-black/40'>
      <div className='w-[90%] md:w-[40%] mx-auto bg-amber-900 p-8 rounded-lg shadow-2xl border border-amber-700'>
        <div className='flex justify-between items-center mb-6'>
            <h2 className='text-3xl text-white font-bold'>New Playlist</h2>
            <button 
              onClick={() => setmodal(0)} 
              className='text-white hover:text-red-400 text-2xl transition-colors'
            >
              ✕
            </button>
        </div>
        
        <div className='flex flex-col space-y-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-amber-200 text-sm font-semibold'>Playlist Name</label>
            <input 
              type='text' 
              value={name}
              onChange={(e) => setname(e.target.value)} 
              className='w-full rounded-md bg-stone-100 text-black text-lg p-3 outline-none focus:ring-2 ring-yellow-500'  
              placeholder='e.g. Mastering React'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-amber-200 text-sm font-semibold'>Cover Image</label>
            <input 
              type='file' 
              accept='image/*' 
              onChange={(e) => setthumbnail(e.target.files[0])} 
              className='text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer'
            />
          </div>

          <button 
            onClick={handlecreate} 
            className='w-full mt-4 text-xl text-white bg-green-600 rounded-md py-3 px-4 hover:bg-green-500 active:scale-95 transition-all font-bold shadow-lg'
          >
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default Playlist_modal;