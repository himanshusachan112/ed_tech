import React, { useState } from 'react'
import Custombutton from '../../common/Custombutton'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiConnector } from '../../../utils/Apiconnecter';
import { courseroutes } from '../../../apis/apis';

const Reviewmodal = ({reviewmodal,course}) => {

    const dispatch=useDispatch();
    const [rating,setrating]=useState(0);
    const [review,setreview]=useState("");
    const {token}=useSelector((state)=>state.Auth);

    const handlestars=(newrating)=>{
        console.log("stars are ",newrating);
        setrating(newrating);
    }

    const submitreivewhandler=async()=>{
        console.log("submitting the reivew")
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.CREATERAING_API,{courseid:course._id,rating,review},
            {
                Authorization: `Bearer ${token}`,
            })
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            reviewmodal.cancelhandler();
            console.log("CREATE RATING API RESPONSE",response);
            toast.success(response.data.message);


        }
        catch(err){
            console.log("CREATE RAING API ERROR RESPONSE",err);
            toast.error(err.message);
        }
        toast.dismiss(toastid);
    }

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 flex-col backdrop-blur-md flex justify-center items-center'>
        <div className='bg-slate-600 w-[40%] h-fit py-2 flex flex-col gap-2 p-2 border-2 border-yellow-300 rounded-sm'>
            <div className='text-center text-white text-lg'>
                Rate The Course
            </div>
            <div className='pl-[37%]'>
                <ReactStars
                    count={5}
                    size={20}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar></FaStar>}
                    filledIcon={<FaStar/>}
                    onChange={handlestars}   
                              
                />
            </div>
            <div className='text-center text-white text-lg'>
                Review The Course
            </div>
            <div className='flex justify-center'>
                <input
                    type='text'
                    onChange={(e)=>setreview(e.target.value)}
                    className='w-[13rem] h-[3rem] rounded-sm text-center'
                    placeholder='Review Course'
                />
            </div>
            <div className='flex flex-row justify-between gap-2'>
                <div className='w-1/2'>
                    <Custombutton text={"Submit"} styles={"bg-yellow-300 text-black w-full"} fun={submitreivewhandler}/>
                </div>
                <div  className='w-1/2'>
                    <Custombutton text={"Cancel"} styles={"bg-red-600 text-white w-full"} fun={reviewmodal.cancelhandler}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reviewmodal