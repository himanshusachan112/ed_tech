import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { apiConnector } from '../../../utils/Apiconnecter';
import { playlist_earning } from '../../../apis/apis';
import { useSelector } from 'react-redux';

const Playlist_modal = ({existingPlaylists, setexistingPlaylists, setmodal, hasplaylist}) => {
  const [name, setname] = useState("");
  const [thumbnail, setthumbnail] = useState(null); // Changed to null for safety
  const {token} = useSelector((state) => state.Auth);

  const handlecreate = async () => {
    // 1. Validation Logic
    if (name.trim().length === 0) {
      toast.error("Please enter a playlist name");
      return;
    }
    
    if (hasplaylist(name)) {
      toast.error("Choose Another Name"); // Fixed: toast.message is usually toast.error/info
      return;
    }

    if (!thumbnail) {
      toast.error("Please select a thumbnail");
      return;
    }

    const toastid = toast.loading("Creating playlist...");
    
    try {
      const formdata = new FormData();
      formdata.append("thumbnailImage", thumbnail); // Ensure key matches backend (e.g., "thumbnailImage")
      formdata.append("name", name);

      const response = await apiConnector(
        "POST", 
        playlist_earning.CREATE_PLAYLIST, 
        formdata,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      // 2. Check response structure
      // Note: Sometimes responses are nested in response.data.data
      const result = response.data;

      if (!result.success) {
        throw new Error(result.message || "Error occurred while creating playlist");
      }

      console.log("Response result:", result);

      // 3. Robust Object Creation
      // Depending on your backend, data might be an object or an array. 
      // Adjusted for common MERN patterns:
      const newPlaylistData = Array.isArray(result.data) ? result.data[0] : result.data;

      const obj = {
        playlist_id: newPlaylistData._id || newPlaylistData.id, // MongoDB uses _id
        name: newPlaylistData.name,
        thumbnail_url: newPlaylistData.thumbnail_url || newPlaylistData.thumbnail,
        videos: []
      };

      setexistingPlaylists((prev) => [...prev, obj]);
      toast.success("Created Playlist");
      setmodal(0); // Close modal on success

    } catch (err) {
      console.error("CREATE_PLAYLIST_ERROR:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to create playlist");
    } finally {
      toast.dismiss(toastid);
    }
  }

  return (
    <div className='fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 bg-black/30'>
      <div className='w-[90%] md:w-[40%] mx-auto bg-amber-800 p-6 rounded-md shadow-2xl'>
        <div className='flex justify-between items-center'>
            <h2 className='text-3xl text-white font-bold'>Create new Playlist</h2>
            <button onClick={() => setmodal(0)} className='text-white text-xl'>X</button>
        </div>
        
        <div className='flex flex-col mt-6 space-y-4'>
          <input 
            type='text' 
            value={name}
            onChange={(e) => setname(e.target.value)} 
            className='w-full rounded-sm text-black text-xl p-2 outline-none focus:ring-2 ring-yellow-400'  
            placeholder='Enter Name'
          />

          <div className='flex flex-col gap-1'>
            <label className='text-white'>Thumbnail Image:</label>
            <input 
              type='file' 
              accept='image/*' 
              onChange={(e) => setthumbnail(e.target.files[0])} 
              className='text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500'
            />
          </div>

          <button 
            onClick={handlecreate} 
            className='text-2xl text-white bg-green-600 rounded-md py-3 px-4 hover:bg-green-700 transition font-semibold'
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default Playlist_modal;