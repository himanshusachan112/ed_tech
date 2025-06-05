import React from 'react'
import Custombutton from '../../../../common/Custombutton'
import { setstep, setcourse, seteditcourse } from '../../../../../slices/Courseslice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletecourse } from '../../../../../services/Courseservices'

const Showcoursecard = ({ course, setinscourses, inscourses }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);

  const editcoursehandler = () => {
    dispatch(setcourse(course));
    dispatch(seteditcourse(true));
    dispatch(setstep(1));
    navigate('/dashboard/instructor/add-courses');
  }

  const coursedeletehandler = async () => {
    dispatch(deletecourse(course._id, token, inscourses, setinscourses));
  }

  return (
    <div className='border-2 border-gray-400 rounded-md p-2 mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      
      {/* Image */}
      <img 
        src={course.thumbnail} 
        alt={course.coursename} 
        className='h-32 w-full sm:w-32 rounded-sm object-cover'
      />

      {/* Details */}
      <div className='text-slate-500 flex-1 text-sm space-y-1'>
        <div><span className='font-semibold'>Category:</span> {course.category.name}</div>
        <div><span className='font-semibold'>Description:</span> {course.coursedescription}</div>
        <div><span className='font-semibold'>Name:</span> {course.coursename}</div>
        <div><span className='font-semibold'>Created At:</span> {new Date(course.createdat).toLocaleDateString()}</div>
        <div><span className='font-semibold'>Price:</span> {course.price}</div>
      </div>

      {/* Buttons */}
      <div className='flex flex-row gap-2 flex-wrap'>
        <Custombutton 
          text="EDIT" 
          styles="bg-yellow-300 text-black"
          fun={editcoursehandler} 
        />
        {course.status !== "Published" && (
          <Custombutton 
            text="DELETE" 
            styles="bg-red-700 text-white" 
            fun={coursedeletehandler} 
          />
        )}
      </div>
    </div>
  )
}

export default Showcoursecard
