import React, { useState, useEffect, useRef } from 'react';
import Upload from '../components/core/Playlist_earning/Upload';
import Playlist_modal from '../components/core/Playlist_earning/Playlist_modal';
import { apiConnector } from '../utils/Apiconnecter';
import { playlist_earning } from '../apis/apis';
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

const PlaylistPage = () => {
  const [modal, setModal] = useState(0);
  const [existingPlaylists, setExistingPlaylists] = useState([]);
  const { token } = useSelector((state) => state.Auth);
  const [openPlaylistId, setOpenPlaylistId] = useState(null);
  const [fullscreenVideoSrc, setFullscreenVideoSrc] = useState(null);
  const fullscreenRef = useRef(null);

  const fetchPlaylists = async () => {
    try {
      const response = await apiConnector("POST", playlist_earning.GET_PLAYLIST, {}, {
        Authorization: `Bearer ${token}`,
      });
      const objarr = Object.values(response.data.data);
      console.log(objarr)
      setExistingPlaylists(objarr);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const togglePlaylist = (id) => {
    setOpenPlaylistId((prev) => (prev === id ? null : id));
  };

  const openFullscreen = (src) => {
    setFullscreenVideoSrc(src);
    setTimeout(() => {
      if (fullscreenRef.current) {
        fullscreenRef.current.requestFullscreen?.();
      }
    }, 100);
  };

  const closeFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setFullscreenVideoSrc(null);
  };

  return (
    <>
      <div className="flex flex-row">
        {/* Left - Playlists */}
        <div className='bg-slate-900 w-3/5'>
          <div className='flex justify-between p-3'>
            <div className='text-4xl text-white font-bold pl-3'>Playlists</div>
            <div
              className='bg-green-900 text-yellow-400 rounded-md p-3 text-1xl cursor-pointer'
              onClick={() => setModal(1)}
            >
              Create New Playlist
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-4 space-y-6 pl-7">
            {existingPlaylists.map(({ playlist_id, name, thumbnail_url, videos }) => (
              <div key={playlist_id} className="border rounded shadow">
                <button
                  onClick={() => togglePlaylist(playlist_id)}
                  className="w-full flex items-center gap-4 px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  <img src={thumbnail_url} alt={`${name} thumbnail`} className="w-20 h-12 object-cover rounded" />
                  <span className="text-lg">{name}</span>
                </button>

                {openPlaylistId === playlist_id && (
                  <div className="p-4 bg-gray-50 grid grid-cols-2 gap-4">
                    {videos.map(({ id, title, video_file, description }) => (
                      <div
                        key={id}
                        className="relative group cursor-pointer"
                        onClick={() => openFullscreen(video_file)}
                      >
                        <video
                          src={video_file}
                          className="w-full rounded border"
                          muted
                          loop
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => e.currentTarget.pause()}
                          title={`${title} : ${description}`}
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-1 text-xs text-center opacity-0 group-hover:opacity-100 transition">
                          {title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Upload Panel */}
        <div className="w-2/5 bg-slate-600">
          <Upload existingPlaylists={existingPlaylists} setexistingPlaylists={setExistingPlaylists} />
        </div>
      </div>

      {/* Fullscreen video using video-react */}
      {fullscreenVideoSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeFullscreen}
        >
          <div className="w-full h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Player
              ref={fullscreenRef}
              src={fullscreenVideoSrc}
              autoPlay
              fluid={true}
              className="h-full"
            />
          </div>
          <button
            onClick={closeFullscreen}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            aria-label="Close fullscreen video"
          >
            &times;
          </button>
        </div>
      )}

      {/* Modal for creating playlist */}
      {modal ? (
        <Playlist_modal
          existingPlaylists={existingPlaylists}
          setexistingPlaylists={setExistingPlaylists}
          setmodal={setModal}
          hasplaylist={(playname) => existingPlaylists.some((p) => p.name === playname)}
        />
      ) : null}
    </>
  );
};

export default PlaylistPage;
