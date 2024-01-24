import React, { useState } from 'react'
import { setstep,setcourse,seteditcourse,resetCourseState } from '../../../../../slices/Courseslice'
import { useDispatch, useSelector } from 'react-redux';
import Custombutton from '../../../../common/Custombutton';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../../../utils/Apiconnecter';
import { courseroutes } from '../../../../../apis/apis';
import { toast } from 'react-toastify';


const Publishcourse = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {course,editcourse,step}=useSelector((state)=>state.Course);
  const {token}=useSelector((state)=>state.Auth);
  const [publish,setpublish]=useState(null);

  const laststephandler=async ()=>{
    if(publish){
      const toastid=toast.loading("Loading...")
      const formdata=new FormData();
      formdata.append("courseid",course._id);
      formdata.append("status",publish);
      await apiConnector("POST",courseroutes.UPDATECOURSE_API,formdata,
      {
        Authorization: `Bearer ${token}`
      })
      toast.dismiss(toastid);
    }

    dispatch(resetCourseState());
    navigate('/dashboard/instructor/my-courses');


    
    
  }
  

  return (
    <div>
      <div className='flex flex-row gap-2'>
        <div>
          <label htmlFor='publish'>Publish Course</label>
        </div>
        <div>
          <input
            id='publish'
            name='publish'
            type='checkbox'
            onChange={(e)=>{
              if(e.target.checked){
                setpublish("Published");
              }
              else{
                setpublish(null);
              }
            }}
          />
        </div>
        
      </div>
      <div className='flex flex-row gap-2 justify-end items-end'>
        <Custombutton text={"Back"} styles={"bg-yellow-300 text-black"} fun={()=>dispatch(setstep(2))}/>
        <Custombutton text={"Save to My Courses"} styles={"bg-yellow-300 text-black"} fun={laststephandler} />
        
      </div>
    </div>
  )
}

export default Publishcourse