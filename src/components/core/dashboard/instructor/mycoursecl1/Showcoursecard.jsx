import React from 'react'
import Custombutton from '../../../../common/Custombutton'
import { setstep,setcourse,seteditcourse } from '../../../../../slices/Courseslice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletecourse, getaddcourses } from '../../../../../services/Courseservices'

const Showcoursecard = ({course,setinscourses,inscourses}) => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.Auth);

    const editcoursehandler=()=>{
        dispatch(setcourse(course));
        dispatch(seteditcourse(true));
        dispatch(setstep(1));
        navigate('/dashboard/instructor/add-courses');
    }

    const coursedeletehandler=async()=>{
        dispatch(deletecourse(course._id,token,inscourses,setinscourses));
    }


  return (
    <div className='border-[2px] flex flex-row justify-between border-gray-400 mt-1'>
        <div className='pl-[1px]'>
            {/* image */}
            <img src={course.thumbnail} alt='' className=' p-1 h-32 w-32 rounded-sm object-cover'/>
        </div>
        <div className='text-slate-500'>
            {/* details */}
            <div>{`CATEGORY ${course.category.name}`}</div>
            <div>{`DESCRIPTION ${course.coursedescription}`}</div>
            <div>{`NAME ${course.coursename}`}</div>
            <div>{`CREATED AT ${course.createdat}`}</div>
            <div>{`PRICE ${course.price}`}</div>
        </div>
        <div className='ml-1'>
            {/* buttons */}
            <Custombutton text={"EDIT"} styles={"bg-yellow-300 text-black mt-1 mr-1"} fun={editcoursehandler}/>
            {course.status!=="Published" && 
            <>
            
            <Custombutton text={"DELETE"} styles={"bg-red-700 text-white mt-1 mr-1"} fun={coursedeletehandler}/>
            </>}
        </div>
    </div>
    
  )
}

export default Showcoursecard