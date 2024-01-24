import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const Profiledropdown = () => {
  const navigate=useNavigate()
  const {profile}=useSelector((state)=>state.Profile);

  return (
    <div className='group'>
      <div>
        <img className='rounded-full w-7 h-7 mr-5 ' alt='' src={profile.image}/>
      </div>
      
      <div className='text-white flex flex-col absolute  bg-slate-600 border-t-[0.7rem] border-black invisible group-hover:visible w-[5rem] h-fit px-3 right-2 pb-1 z-30'>
        <Link to='/dashboard/my-profile'><div>Profile</div></Link>
        <Link to='/dashboard/my-settings'><div>Settings</div></Link>
        {
          profile.accounttype==="Student" ? 
          (<>
            <Link to='/dashboard/student/enrolled-courses'><div>Enrolled Courses</div></Link>
            {/* <div onClick={()=>navigate('/dashboard/student/enrolled-courses')}>enrolled</div> */}
            <Link to='/dashboard/student/my-cart'><div>My Cart</div></Link>

          </>):
          (<>
            <Link to='/dashboard/instructor/my-courses'><div>MyCourses</div></Link>
          </>)
        }
        
      </div>

    </div>
  )
}

export default Profiledropdown