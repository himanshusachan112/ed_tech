import React, { useEffect, useRef, useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { apiConnector } from '../../../utils/Apiconnecter';
import { playlist_earning } from '../../../apis/apis';
import { useSelector } from 'react-redux';

const Homepage_loggedin = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const loader = useRef(null);
  const { token } = useSelector((state) => state.Auth);

  const fetchVideos = async () => {
    try {
      const res = await apiConnector(
        'GET',
        `${playlist_earning.GET_PAGINATED_VIDEOS}?page=${page}&limit=10`,
        null,
        { Authorization: `Bearer ${token}` }
      );
      const data = res.data.data;

      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      setVideos((prev) => [...prev, ...data]);
    } catch (err) {
      console.error('Failed to load videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page]);

  useEffect(() => {
    if (!loader.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );

    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader.current, hasMore]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = videos.filter((video) => {
      const titleMatch = video.title.toLowerCase().includes(term);
      const playlistMatch = video.playlist?.name?.toLowerCase().includes(term);
      const tagMatch = video.taglist?.some((tag) => tag.toLowerCase().includes(term));
      return titleMatch || playlistMatch || tagMatch;
    });
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  return (
    <div className="bg-black min-h-screen p-4 text-white pl-8">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, playlist, or tags..."
          className="w-full max-w-xl p-3 rounded bg-gray-800 text-white focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer overflow-hidden"
            onClick={() => setFullscreenVideo(video.video_file)}
          >
            <HoverVideoPlayer
              videoSrc={video.video_file}
              pausedOverlay={
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              }
              className="w-full h-48"
            />
            <p className="mt-2 text-center">{video.title + " : " + video.description}</p>
          </div>
        ))}
      </div>

      {/* Loader */}
      {hasMore && (
        <div ref={loader} className="text-center p-6 text-gray-400">
          Loading more videos...
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreenVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={() => setFullscreenVideo(null)}
        >
          <video
            src={fullscreenVideo}
            controls
            autoPlay
            className="w-[90vw] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            onEnded={() => setFullscreenVideo(null)}
          />
          <button
            onClick={() => setFullscreenVideo(null)}
            className="absolute top-5 right-6 text-white text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage_loggedin;
