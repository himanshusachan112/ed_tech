import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { apiConnector } from '../../../../utils/Apiconnecter';
import { courseroutes } from '../../../../apis/apis';
import { useSelector } from 'react-redux';

const Purchasehistory = () => {

  const {token}=useSelector((state)=>state.Auth);
  const [courses,setcourses]=useState([]);



  const enrolledcourses=async ()=>{
    const toastid=toast.loading("Loading...");
    try{
      const response=await apiConnector("POST",courseroutes.GETENROLLEDCOURSES_API,{},
      {
         Authorization: `Bearer ${token}`,
      })
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      setcourses(response.data.data.courses);
      console.log("GETCOURSE ENROLLED API RESPONES",response);
      toast.success(response.data.message);

    }
    catch(err){
      console.log("GETCOURSE ENROLLED API RESPONSE ERROR",err);
      toast.error(err.message);
    }
    toast.dismiss(toastid);
  }

  useEffect(()=>{
    enrolledcourses();
  },[])

  return (
    <div className='bg-black h-full'>
      <div className='text-slate-600 font-bold text-3xl text-center pt-4'>
        Your Purchased Courses
      </div>
      <div className='flex flex-row '>
        <div className=' flex flex-col gap-6 pl-6 p-1'>
          {courses.map((course)=>(
            course.price!==0 ? (<div className='flex flex-row gap-3 border-2 border-red-600 rounded-sm p-1'>
              <div>
                <img className='w-[12rem] h-[10rem] object-cover' src={course.thumbnail} alt=''/>
              </div>
              <div className='text-white text-xl flex flex-col gap-1'>
                <div>
                  {course.coursename}
                </div>
                <div>
                  {course.coursedescription}
                </div>
                <div className='text-green-500'>
                {`Price ₹ ${course.price}`}
                </div>
                <div className='text-blue-600 italic'>
                  {`by ${course.instructor.firstname + " "+ course.instructor.lastname}`}
                </div>
              </div>
            </div>):(null)
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Purchasehistory