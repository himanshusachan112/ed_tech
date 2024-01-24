import React, { useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Custombutton from '../../../../../common/Custombutton';
import Subsection from './Subsection';
import { deletesection } from '../../../../../../services/Courseservices';
import { useDispatch, useSelector } from 'react-redux';
import Subsectionmodal from './Subsectionmodal';

const Section = ({section,editsection,seteditsection}) => {

    const dispatch=useDispatch();
    const {course}=useSelector((state)=>state.Course);
    const {token}=useSelector((state)=>state.Auth);


    const [subsectionmodal,setsubsectionmodal]=useState(null);
    const [showsubsection,setshowsubsection]=useState(false);
    const [viewmode,setviewmode]=useState(false);
    const [editmode,seteditmode]=useState(false);
    const [createmode,setcreatemode]=useState(false);
    

    const addlecturehandler=()=>{
        console.log("aay tou hai")
        setcreatemode(true);
    }
  return (
    <>
    <div className='pl-1 pr-2 bg-sky-400 rounded-sm pb-2'>
        <div>
            <summary onClick={()=>setshowsubsection(!showsubsection)} className='flex flex-row justify-between text-2xl'>
               <div >
                    {section.name}
               </div>
               <div className='flex flex-row gap-3'>
                <div onClick={(e)=>{e.preventDefault();seteditsection(section._id)}} className='mt-1'>
                    <AiFillEdit/>
                </div>
                <div onClick={(e)=>{e.preventDefault(); dispatch(deletesection(course._id,section._id,token))}} className='mt-1'>
                    <RiDeleteBin5Fill/>
                </div>
               </div>
            </summary>
            
            {showsubsection && <>
            <div  onClick={addlecturehandler} className='flex flex-row bg-yellow-300 mt-2 w-fit rounded-md pr-1'>
                <Custombutton text={"Add Lecture"}    /> <IoMdAdd className='mt-3 text-xl'/>
            </div>
            <div className='flex flex-col gap-2'>
                {section.subsection.map((subsection,index)=>(

                <Subsection key={index}  sectionid={section._id} seteditmode={seteditmode} setviewmode={setviewmode} subsection={subsection} subsectionmodal={subsectionmodal} setsubsectionmodal={setsubsectionmodal}  /> ))}
            </div>
            </>}
            
        </div>
    </div>
    {(subsectionmodal || createmode)  &&  <Subsectionmodal sectionid={section._id}  viewmode={viewmode} setviewmode={setviewmode}  editmode={editmode} seteditmode={seteditmode}  createmode={createmode} setcreatemode={setcreatemode}  subsectionmodal={subsectionmodal} setsubsectionmodal={setsubsectionmodal}  />}
    </>
  )
}

export default Section