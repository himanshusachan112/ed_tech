import React, { useState } from 'react'
import Subsectionmodal from './Subsectionmodal';
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deletesubsection } from '../../../../../../services/Courseservices';

const Subsection = ({subsection,setviewmode,seteditmode,subsectionmodal,setsubsectionmodal,sectionid}) => {

    const dispatch=useDispatch();
    
    const {course}=useSelector((state)=>state.Course);
    const {token}=useSelector((state)=>state.Auth);


  return (
    <>
        <div className='flex flex-row justify-between '>
            <div className='w-full bg-yellow-300 rounded-sm mt-2 pl-2'
            onClick={()=>{
                setviewmode(true);
                setsubsectionmodal(subsection);
            }}>
                {subsection.title}
            </div>
            <div className='flex flex-row gap-3 mt-2 bg-yellow-300 pr-1 '> 
                <div onClick={()=>{
                    seteditmode(true);
                    setsubsectionmodal(subsection);
                }} className='mt-1'><AiFillEdit/></div>
                <div className='mt-1' onClick={()=>dispatch(deletesubsection(course._id,sectionid,subsection._id,token))}><RiDeleteBin5Fill/></div>
            </div>
        </div>
        
    </>
  )
}

export default Subsection