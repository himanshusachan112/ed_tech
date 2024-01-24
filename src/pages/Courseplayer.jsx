import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiConnector } from '../utils/Apiconnecter';
import { courseroutes } from '../apis/apis';
import { useSelector } from 'react-redux';
import { CgDetailsMore } from "react-icons/cg";
import Playersection from '../components/core/coursepalyer/Playersection';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import Custombutton from '../components/common/Custombutton';
import Reviewmodal from '../components/core/coursepalyer/Reviewmodal';
import Percentagecompleted from '../utils/Percentagecompleted';


const Courseplayer = () => {

    const location=useLocation();
    const courseid=location.pathname.split("/").at(-1);
    const {token}=useSelector((state)=>state.Auth);


    const [course,setcourse]=useState("");
    const [currentvideo,setcurrentvideo]=useState(null);
    const [completedlecture,setcompletedlecture]=useState(null);
    const [reviewmodal,setreviewmodal]=useState(null);
    const [totalsections,settotalsections]=useState(null);


    const getcoursedetails=async ()=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.GETCOURSEPAGEDETAILS_API,{courseid},
            {
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const completedvid=await apiConnector("POST",courseroutes.GETCOMPLETEDVIDEOS_API,{courseid},
            {
                Authorization: `Bearer ${token}`,
            })
            setcompletedlecture(completedvid?.data?.data?.completedvideos)
            setcourse(response.data.data)
            setcurrentvideo(response.data.data.sections[0].subsection[0])
            let sections=[];
            response.data.data.sections?.forEach((section)=>{
                sections=[...sections,...section.subsection]
            })
            console.log("list of all subsections is ",sections);
            settotalsections(sections);
            console.log("GETCOURSEPAGE DETAILS API RESPONSE",response);
            console.log("course is ",response.data.data)
            toast.success(response.data.message)


        }
        catch(err){
            console.log("GET COURSEPAGE DETAILS API ERROR RESPONSE",err);
            toast.error(err.message)
        }
        toast.dismiss(toastid);
    }

    const updatecourseprogress=async()=>{
        console.log("Course has been completed update in progress");
        try{
            const response=await apiConnector("POST",courseroutes.UPDATECOURSEPROGRESS_API,{courseid:course._id,subsectionid:currentvideo._id},
            {
                Authorization: `Bearer ${token}`,
            })
            

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            setcompletedlecture(response?.data?.data?.completedvideos)
            console.log("UPDATE COURSEPROGRESS API RESPONSE ",response);


        }
        catch(err){
            console.log("UPDATE COURSEPROGRESS API RESPONSE ERROR",err);
        }

    }


    useEffect(()=>{
        getcoursedetails();

    },[]);


  return (
    <>
        <div className='flex flex-row'>
        <div className=' bg-slate-600 min-h-screen p-2  text-2xl w-[16rem]'>
            <div className='flex flex-row gap-1'>
                <div className='mt-1 text-yellow-300 '>
                    <CgDetailsMore/>
                </div>
                <div>
                    Course Section
                </div>
            </div>
            <div className='text-sm text-green-500'>
                {course && `${Percentagecompleted(totalsections,completedlecture)} % completed`}
            </div>
            <div>
                {course && course.sections.map((section)=>(
                    <Playersection section={section} setcurrentvideo={setcurrentvideo} completedlecture={completedlecture}/>
                ))}
            </div>

        </div>
        <div className='bg-black w-full flex flex-col'>
            <div className='relative h-[60%] bg-black px-16 mt-2 rounded-sm '>
                <div className=''>
                    <Player
                        aspectRatio='16:9'
                        playsInline
                        src={currentvideo?.videourl}
                        onEnded={()=>updatecourseprogress()}
                        
                    />
                </div>
            </div>
            <div className='h-[30%] p-4 px-16'>
                <div  onClick={()=>setreviewmodal({
                    cancelhandler:()=>setreviewmodal(null),

                })} >
                    <Custombutton text={"Review Course"} styles={"bg-yellow-300 text-black  w-full mt-40"}/>
                </div>
            </div>
        </div>

    </div>
    {reviewmodal && <Reviewmodal reviewmodal={reviewmodal} course={course}/> }
    </>
  )
}

export default Courseplayer