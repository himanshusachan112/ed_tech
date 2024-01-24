import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiConnector } from '../../../../utils/Apiconnecter';
import { courseroutes } from '../../../../apis/apis';
import { useNavigate } from 'react-router-dom';

const Enrolledcourses = () => {

  const {token}=useSelector((state)=>state.Auth);
  const [courses,setcourses]=useState([]);
  const navigate=useNavigate();

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

  useEffect (()=>{
    enrolledcourses();
  },[])

  return (
    <div className='bg-black h-full'>
      <div className='text-red-500'>--------------------------------------------Please Reload The page if Course is Not Shown--------------------------------------------</div>
      <div className='text-slate-600 font-bold text-3xl text-center pt-4'>
        Enrolled Courses
      </div>
      <div className='flex flex-row '>
        <div className=' flex flex-col gap-6 pl-6 p-1'>
          {courses.map((course)=>(
            <div onClick={()=>navigate(`/student/courseplayer/${course._id}`)} className='flex flex-row gap-3 border-2 border-yellow-300 bg-slate-600 rounded-sm p-1'>
              <div>
                <img className='w-[10rem] h-[5rem] object-cover' src={course.thumbnail} alt=''/>
              </div>
              <div className='text-black text-xl flex flex-col gap-1'>
                <div>
                  {course.coursename}
                </div>
                <div>
                  {course.coursedescription}
                </div>
        
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Enrolledcourses