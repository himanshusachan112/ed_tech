import React from 'react'
import { useEffect, useRef } from "react";
import { apiConnector } from '../../../utils/Apiconnecter';
import { playlist_earning } from '../../../apis/apis';
import { useSelector } from 'react-redux';

const Track_watchtime_player = ({fullscreenVideo,setFullscreenVideo,videoid}) => {

     const videoRef = useRef(null);
    const lastSecondRef = useRef(0);
    const watchedCounterRef = useRef(0);
    const { token } = useSelector((state) => state.Auth);


    useEffect(() => {
        const video = videoRef.current;
        const handleTimeUpdate = () => {
            const now = Math.floor(video.currentTime);
            if (now > lastSecondRef.current) {
                watchedCounterRef.current += now - lastSecondRef.current;

                // When 10s watched, send to backend
                if (watchedCounterRef.current >= 10) {
                    // Call async function
                    (async () => {
                        try {
                        const time=10;
                        const response= await apiConnector("POST", playlist_earning.SAVE_VIDEOWATCHTIME , {videoid, time} , 
                            { Authorization: `Bearer ${token}` }
                        )
                        console.log("wathtime api response =>",response)
                        
                        } catch (err) {
                        console.error("Watch time update failed");
                        }
                        watchedCounterRef.current = 0;
                    })();


                    
                }
                lastSecondRef.current = now;
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    },[videoid]);



  return (
    <video ref={videoRef} 
    src={fullscreenVideo} 
    controls 
    autoPlay
    className="w-[90vw] h-[90vh]"
    onClick={(e) => e.stopPropagation()}
    onEnded={() => setFullscreenVideo(null)}

     />   
  )
}

export default Track_watchtime_player