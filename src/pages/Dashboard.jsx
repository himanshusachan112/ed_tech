import React, { useState } from 'react'
import * as Icons from 'react-icons/vsc'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineLogout } from "react-icons/md";
import Confirmationmodal from '../components/common/Confirmationmodal'
import { logout } from '../services/Authservices'


//must define outline
const Dashboard = () => {

  const [highlight,sethighlight]=useState(1);
  const [logoutmodal,setlogoutmodal]=useState(null);
  const {profile}=useSelector((state)=>state.Profile);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const logouthandler=()=>{
    sethighlight(9);
    setlogoutmodal({
      txt1:"Are You Sure?",
      txt2:"You will be loggout from Your Account",
      btn1txt:"Logout",
      btn2txt:"Cancel",
      btn1handler:()=>dispatch(logout(navigate)),
      btn2handler:()=>{
        setlogoutmodal(null);
        navigate("/dashboard/my-profile");
        sethighlight(1);
      },
    })
  }

  


  
  console.log("reached dashboard options")
  return (
    <>
      <div className='flex flex-row'>
        <div className='bg-black min-h-screen w-[15%] flex flex-col gap-3 pt-3 pl-2 border-r-2 border-r-yellow-600'>
          {sidebarLinks.map((ele)=>{
            const Icon=Icons[ele.icon];
            if(ele.type && profile.accounttype !==ele.type) return null;

            return (<Link to={ele.path}>
              <div key={ele.id} onClick={()=>sethighlight(ele.id)} className={`flex flex-row p-1 border-l-2  gap-2 ${highlight===ele.id?"bg-yellow-800 text-yellow-300  border-l-amber-400":"text-white border-l-black"}`}>
                <div className='mt-1'>
                  <Icon />
                </div>
                <div>
                  {ele.name}
                </div>
              </div></Link>)
          })}
          {<div className={`flex flex-row p-1 border-l-2 cursor-pointer gap-2 ${highlight===9?"bg-yellow-800 text-yellow-300  border-l-amber-400":"text-white border-l-black"}`} onClick={logouthandler}>
            <div className='mt-1'>
              <MdOutlineLogout/>
            </div>
            <div >
              Logout
            </div>
          </div>}
        </div>
        <div className='w-full'>
        <Outlet/>
        </div>
      </div>
      {/* logout confirmation modal */}
      {logoutmodal && <Confirmationmodal modaldata={logoutmodal}/>}
    </>
  
  )
}

export default Dashboard