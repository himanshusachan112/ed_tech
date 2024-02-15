import React, { useEffect, useState } from 'react'
import edupulses from "../../assets/Logo/edupulses.webp"
import { NavbarLinks } from '../../data/navbar-links'
import { Link } from 'react-router-dom'
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { variables } from '../../data/Variables'
import Profiledropdown from './Profiledropdown'
import { apiConnector } from '../../utils/Apiconnecter'
import { categoryroutes } from '../../apis/apis'

const Navbar = () => {
  const [currenttab,setcurrenttab]=useState('Home');
  const [category,setcategory]=useState([]);
  const {token,userdata}=useSelector((state)=>state.Auth);

  const fetchcategory=async ()=>{
    try{
      const response=await apiConnector("GET",categoryroutes.FETCHCATEGORY_API);
      console.log("FETCH CATEGORY API RESPONSE=>",response);
      setcategory(response.data.data);
    }
    catch(err){
      console.log("FETCH CATEGORY API ERROR=>",err);
    }
  }

  useEffect(()=>{
    
    fetchcategory();

  },[])

  return (
    <div className='bg-black p-2 flex flex-row justify-between border-b-[1px] border-b-yellow-400'>
      <div>
        <Link to="/"><img src={edupulses} className='absolute top-[-5px]  w-[10%] h-[8%]' onClick={()=>{setcurrenttab("Home")}} alt=''></img></Link>
      </div>
      <div className='text-white flex flex-row gap-3'>
        {NavbarLinks.map((sublink,index)=>(
          sublink.title==="Catalog" ? (
            <div key={index} onClick={()=>{setcurrenttab(`${sublink.title}`)}} className={`${sublink.title===currenttab?"text-yellow-300":""} flex flex-row group`}>
              <div>{sublink.title}</div>
              <div className='mt-1.5'><IoIosArrowDropdownCircle/></div>
              <div className={ `absolute z-20 invisible group-hover:visible `}>
                <div className='w-[20px] h-[20px] rotate-45 bg-yellow-500 mt-10 ml-5'>
                  
                </div>
                <div className='bg-yellow-500 absolute w-[200px] mt-[-10px] text-black p-2'>
                  {category.length!==0 && (<div>
                    {category.map((sublink,index)=>(<div key={index}><Link to={`/catalog/${sublink.name.split(" ").join("-")}`}>{sublink.name}</Link></div>))}
                    {/* link is yet to edit */}
                  </div>)}
                </div>
              </div>
        

            </div>):(
            <div key={index} onClick={()=>{setcurrenttab(`${sublink.title}`)}} className={`${sublink.title===currenttab?"text-yellow-300":""}`}>
              <Link to={sublink.path}><div>{sublink.title}</div></Link>
            </div>)
        ))}
      </div>
      <div >
        {token===null ? (
          <div className='flex flex-row gap-2'>
            <Link to="/login"><button className='bg-slate-500 rounded-sm p-1 text-white' >Login</button></Link>
            <Link to="/signup"><button className='bg-slate-500 rounded-sm p-1 text-white'>SignUp</button></Link>
          </div>): userdata?.accounttype===variables.student ? (
            <div>
              <div>
                <FaShoppingCart className='text-yellow-500'/>
                {/* managing number of items still left */}
              </div>
              <div>
                <Profiledropdown/>
              </div>
            </div>):(
              <div>
                <Profiledropdown/>
              </div>)}
      </div>

    </div>
  )
}

export default Navbar