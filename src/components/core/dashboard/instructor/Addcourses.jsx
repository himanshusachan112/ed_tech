import React, { useEffect, useState } from 'react'
import { AiFillThunderbolt } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import Stepshighlighter from './addcoursecl1/Stepshighlighter';
import { useSelector } from 'react-redux';
import { setstep,setcourse,seteditcourse,resetCourseState } from '../../../../slices/Courseslice';
import Courseinformation from './addcoursecl1/Courseinformation';
import Coursebuilder from './addcoursecl1/Coursebuilder';
import Publishcourse from './addcoursecl1/Publishcourse';

const Addcourses = () => {

  const {course,editcourse,step}=useSelector((state)=>state.Course);
  useEffect(()=>{
    
  },[step])
  

  return (
    <div className='bg-black h-full flex flex-row'>
      <div className='w-[60%] h-full'>
        <div className='bg-slate-600 w-[80%] h-fit mt-10 mx-auto rounded-md border-yellow-300 border-2 p-4'>
          <div className='text-white text-2xl'>Add Course</div>
          <div>

            {/* handling circles of steps */}
            <Stepshighlighter setstep={setstep} step={step}/>

          </div>
          <div className='mt-10'>

            {/* form components */}
            {step===1 && <Courseinformation/>}
            {step===2 && <Coursebuilder/>}
            {step===3 && <Publishcourse/>}
            
          </div>
        </div>
      </div>
      <div className=' w-[40%] h-full'>
        <div className='fixed w-[25%] h-fit mt-10 rounded-md p-4 bg-slate-600 border-yellow-300 border-2'>
          <ul className='text-white flex flex-col gap-2 text-sm'>
            <li className='flex flex-row gap-3 w-full'>
              < AiFillThunderbolt className='text-orange-500 size-5 mt-1'/> <span className='text-xl w-full text-orange-500 '>Course Upload Tips</span>
            </li>
            <li>
              * Set the Course Price option or make it free.
            </li>
            <li>
            * Standard size for the course thumbnail is 1024x576
            </li>
            <li>
            * Video section controls the course overview video.
            </li>
            <li>
            * Course Builder is where you create & organize a course.
            </li>
            <li>
            * Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
            </li>
            <li>
            * Information from the Additional Data section shows up on the course single page.
            </li>
            <li>
            * Make Announcements to notify any important 
            </li>
            <li>
            * Notes to all enrolled students at once.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Addcourses