import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getaddcourses } from '../../../../services/Courseservices';
import Showcoursecard from './mycoursecl1/Showcoursecard';

const Mycourses = () => {
  const { token } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [type, setType] = useState("Draft");
  const [inscourses, setInscourses] = useState([]);

  const getInstructorCourses = async () => {
    dispatch(getaddcourses(token, setInscourses));
  }

  useEffect(() => {
    getInstructorCourses();
  }, []);

  return (
    <div className='bg-black w-full min-h-screen p-4'>
      <h1 className='text-slate-500 text-3xl font-semibold mb-4'>My Courses</h1>

      <div className='flex gap-6 text-white border-b-2 border-yellow-300 mb-4'>
        <button
          onClick={() => setType("Draft")}
          className={`pb-2 border-b-4 cursor-pointer ${type === "Draft" ? "border-yellow-300 text-yellow-300" : "border-transparent hover:text-yellow-400"}`}
        >
          Drafted
        </button>
        <button
          onClick={() => setType("Published")}
          className={`pb-2 border-b-4 cursor-pointer ${type === "Published" ? "border-yellow-300 text-yellow-300" : "border-transparent hover:text-yellow-400"}`}
        >
          Published
        </button>
      </div>

      <div className='border border-yellow-800 rounded-md p-2 min-h-[200px]'>
        {inscourses.length ? (
          inscourses
            .filter((course) => course.status === type)
            .map((course) => (
              <Showcoursecard
                key={course.id || course._id}
                course={course}
                inscourses={inscourses}
                setinscourses={setInscourses}
              />
            ))
        ) : (
          <p className='text-white text-center mt-10'>No courses have been created yet.</p>
        )}
      </div>
    </div>
  )
}

export default Mycourses
