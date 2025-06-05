import { useState } from "react";
import { toast } from 'react-toastify';
import { apiConnector } from "../../../utils/Apiconnecter";
import { playlist_earning } from "../../../apis/apis";
import { useSelector } from "react-redux";
import { useEffect } from "react";



const Upload = ({existingPlaylists,setexistingPlaylists}) => { 


  const [playlistName, setPlaylistName] = useState("");
  const [playlistid, setPlaylistid] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {token}=useSelector((state)=>state.Auth);

  const filteredSuggestions = existingPlaylists?.filter((p) =>
    p?.name?.toLowerCase()?.includes(playlistName?.toLowerCase())
  );

  const handleSuggestionClick = (p) => {
  
    console.log("this is playlist",p);
    setPlaylistName(p.name);
    setPlaylistid(p.playlist_id);

    setShowSuggestions(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if ( !playlistName || !videoTitle || !videoFile || !thumbnailFile || !description ) {
      alert("Please fill all fields.");
      return;
    }

    const tagList = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const formdata=new FormData();
    formdata.append("playlistid",playlistid);
    formdata.append("playlistName",playlistName)
    formdata.append("videoTitle",videoTitle)
    formdata.append("videoFile",videoFile)
    formdata.append("thumbnailFile",thumbnailFile)
    formdata.append("description",description)
    formdata.append("tagList",JSON.stringify(tagList))
    console.log("playlist id is",playlistid)
    const toastid=toast.loading("...Loading");
    try{
        const response=await apiConnector("POST", playlist_earning.UPLOAD_VIDEO, formdata,
        {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log(response)
        
        if(!response.data.success){
            throw new Error("failed upload")
        }
        
        const updatedplaylist=existingPlaylists.map((play)=>{
          if(playlistid==play.playlist_id){
            play.videos.push(response.data.data[0]);
          }
          return play;
        })

        setexistingPlaylists(updatedplaylist);
        toast.success("file uploaded")
        
    }
    catch(err){
        console.log(err);
        toast.error(err.message);
    }
    toast.dismiss(toastid);

    
    // Reset
    setPlaylistName("");
    setVideoTitle("");
    setVideoFile(null);
    setThumbnailFile(null);
    setTags("");
    setDescription("");
  };

  

  return (
    <div className="bg-gray-900 text-white p-6 rounded shadow-md w-full max-w-xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">Upload New Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Playlist Name */}
        <div className="relative">
          <label className="block font-medium mb-1">Playlist Name</label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => {
              setPlaylistName(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="e.g Python"
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded text-white"
            // onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            required
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-gray-800 border border-gray-700 rounded w-full mt-1 max-h-40 overflow-y-auto">
              {filteredSuggestions.map((p, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-blue-600 cursor-pointer"
                  onClick={()=>{
                    console.log("comming")
                    handleSuggestionClick(p);
                  }}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Video Title */}
        <div>
          <label className="block font-medium mb-1">Video Title</label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="e.g. Python lecture 1"
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded text-white"
            required
          />
        </div>

        {/* Video File */}
        <div>
          <label className="block font-medium mb-1">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="w-full bg-gray-800 text-white border border-gray-700 p-2 rounded"
            required
          />
        </div>

        {/* Thumbnail File */}
        <div>
          <label className="block font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            className="w-full bg-gray-800 text-white border border-gray-700 p-2 rounded"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Python , java, C++"
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the content of the video..."
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded text-white resize-none h-28"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
