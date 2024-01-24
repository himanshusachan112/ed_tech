import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiConnector } from '../utils/Apiconnecter';
import { courseroutes } from '../apis/apis';
import { useDispatch, useSelector } from 'react-redux';
import Custombutton from '../components/common/Custombutton';
import {addtocourse } from '../services/Courseservices';
import { addToCart } from '../slices/Cartslice';
import { buynow } from '../services/Paymentservices';
import ReactStars from "react-rating-stars-component";
import GetAvgRating from '../utils/Averagerating';

const CoursePage = () => {

  const location=useLocation();
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.Auth);
  const {profile}=useSelector((state)=>state.Profile);
  const courseid=location.pathname.split("/").at(-1);
  console.log("course id is =>",courseid);
  const [course,setcourse]=useState("");
  
  const navigate=useNavigate();
  console.log("profile data is ",profile)

  //making an api call.
  const getcourse=async ()=>{
    const toastid=toast.loading("Loading...");
    try{
      const response=await apiConnector("POST",courseroutes.GETCOURSE_API,{courseid},
      {
        Authorization: `Bearer ${token}`,
     })

     if(!response.data.success){
      throw new Error(response.data.message);
     }
     console.log("GET COURSE API RESPONSE ",response);
     
     console.log(response.data.data.ratingandreviews)
     setcourse(response.data.data);
     
     toast.success(response.data.message);
     toast.dismiss(toastid);

    }
    catch(err){
      console.log("GETCOURSE API RESPONSE ERROR",err);
      toast.error(err.message);
      toast.dismiss(toastid);
    }
  }

  const addtocarthandler=()=>{
    if(course.studentsenrolled.includes(profile._id)){
      return toast.error("Already Purchased the Course")
    }
    dispatch(addToCart(course));
  }

  const addtomycourseshandler=()=>{
    console.log("course st",course.studentsenrolled.includes(profile._id))
    if(course.studentsenrolled.includes(profile._id)){
      return toast.error("Already Added to my Courses");
    }
    dispatch(addtocourse(courseid,token));
    navigate("/dashboard/student/enrolled-courses");
    

  }

  const buynowhandler=()=>{
    if(course.studentsenrolled.includes(profile._id)){
      return toast.error("Already Purchased the Course")
    }
    dispatch(buynow([course],token,profile,navigate));
  }

  useEffect(()=>{
    getcourse();
    console.log("course datz is",course);
  },[])

  return (
    <div className='relative'>
      <div className='text-3xl font-bold text-fuchsia-500 bg-slate-600 w-full h-[250px]'>
        <div className='mx-10 pt-16'>
        {course?.coursename}
        </div>
        <div className='text-blue-600 italic text-[20px] mx-10'>
          {`by ${course?.instructor?.firstname +" "+  course?.instructor?.lastname}`}
        </div>
        <div className='mt-4 ml-10 flex flex-row gap-1'>
          <div>
          {course && <ReactStars
            count={5}
            size={30}
            edit={false}
            activeColor="#ffd700"
            value={GetAvgRating(course.ratingandreviews)}
          />}
          </div>
          <div className='text-sm text-green-600 mt-2'>
            {course && `avg ${GetAvgRating(course.ratingandreviews)}`}
          </div>
        </div>
      </div>
      <div className='absolute right-10 top-28 border-2 border-yellow-300 rounded-md z-10'>
        <div className='relative'>
          <div>
            <img src={course?.thumbnail} className='w-[300px] h-[300px] rounded-md'/>
          </div> 
          <div>
            {course?.price==0 && <div className='absolute top-1 right-1 bg-blue-600 p-1 px-2 rounded-lg'>Free</div>}
          </div>
        </div>
        <div>
          {course.price==0 ? 
          (<div className='p-1'>
            <Custombutton text={"Add to My Courses"} styles={"text-black bg-yellow-300 w-full "} fun={addtomycourseshandler}/>
          </div>):
          (<div className='p-1'>
            <Custombutton text={"Buy Now"} styles={"text-white bg-red-500 w-full "} fun={buynowhandler}/>
            <Custombutton text={"Add to Cart"} styles={"text-black bg-yellow-300 w-full mt-1"} fun={addtocarthandler}/>
          </div>)}
        </div>
      </div>
      <div className='w-full min-h-screen bg-black text-white'>
        <div>
          {`Category  ${course?.category?.name}`}
        </div>
        <div>
          Coursedescription
        </div>
        <div>
          {course.coursedescription}
        </div>
      </div>
    </div>
  )
}

export default CoursePage