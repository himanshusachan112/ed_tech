import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getaddcourses } from '../../../../services/Courseservices';
import Showcoursecard from './mycoursecl1/Showcoursecard';

const Mycourses = () => {

  const {token}=useSelector((state)=>state.Auth);
  const dispatch=useDispatch();
  const [type,settype]=useState("Draft");
  const [inscourses,setinscourses]=useState([]);

  const getinstructorcourses=async ()=>{
    dispatch(getaddcourses(token,setinscourses));
  }

  const drafthandler=()=>{
    settype("Draft");
  }

  const publishhandler=()=>{
    settype("Published");
  }

  useEffect(()=>{
    getinstructorcourses();
  },[])

  return (
    <div className='bg-black w-full h-full p-3'>
      <div className='text-slate-500 text-3xl'>My Courses</div>
      <div className='flex flex-row gap-2 text-white mt-2 border-b-2 border-yellow-300'>
        <div onClick={drafthandler} className={`${type==="Draft" ? "text-yellow-300":""}`}>Drafted</div>
        <div onClick={publishhandler} className={`${type==="Published" ? "text-yellow-300":""}`}>Published</div>
      </div>
      <div className='mt-2 border-[0.5px] border-yellow-800 '>
        {inscourses.length ? 
        (<div>
          {type==="Draft" ? 
          (<div>
            {inscourses.filter((course)=>course.status===type).map((course)=>(
              <Showcoursecard course={course} inscourses={inscourses} setinscourses={setinscourses} />
            ))}
          </div>):
          <div>
            {inscourses.filter((course)=>course.status===type).map((course)=>(
                <Showcoursecard course={course} inscourses={inscourses} setinscourses={setinscourses} />
              ))}
          </div>}
        </div>):
        (<div className='text-white'>
          No course have been Created yet
        </div>)}
      </div>
    </div>
  )
}

export default Mycourses