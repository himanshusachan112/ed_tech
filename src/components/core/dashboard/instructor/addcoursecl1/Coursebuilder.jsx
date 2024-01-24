import React, { useState } from 'react'
import { setstep,setcourse,seteditcourse,resetCourseState } from '../../../../../slices/Courseslice'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from "react-icons/io";
import { createsection, updatesection } from '../../../../../services/Courseservices';
import Section from './addcoursecl2/Section';
import Custombutton from '../../../../common/Custombutton';

const Coursebuilder = () => {

  const dispatch=useDispatch();
  const {course,editcourse,step}=useSelector((state)=>state.Course);
  const {token}=useSelector((state)=>state.Auth);
  const [editsection,seteditsection]=useState(null);
  const gobackhandler=()=>{
    dispatch(setstep(1));
    dispatch(seteditcourse(true));   
  }


  const addsectionhandler=(e)=>{
    if(e.key==="Enter"){
      console.log("section value is ",e.target.value)
      const name=e.target.value;
      
      if(!editsection){
        dispatch(createsection(name,course._id,token));
        
      }else{
        dispatch(updatesection(name,course._id,editsection,token));
        seteditsection(null);
      }
      e.target.value="";

    }
  }

  return (
    <div>
      {/* add section */}
      <div className='flex flex-col' >
        <div className='flex flex-row'>
          <label htmlFor='section' >{editsection ? "Edit section" : "Add Section"}</label> {!editsection && <IoMdAdd className='mt-1' />}
        </div>
        <div>
          <input 
            name='section'
            id='section'
            placeholder={`${editsection ? "Enter New Section Name and Press Enter":"Enter the Section and Press Enter"}`}
            className='w-1/2 pl-2 rounded-sm'
            onKeyDown={addsectionhandler}
            />
        </div>
        {editsection && <div className='bg-yellow-300 w-fit px-1 rounded-sm mt-1' onClick={()=>seteditsection(null)}>Cancel edit</div>}
      </div>

      {/* section and subsection */}
      <div className='flex flex-col gap-3 mt-2'>
        {course.sections.map((section,index)=>(
          <Section key={index} section={section} editsection={editsection} seteditsection={seteditsection}/>
        ))}

      </div>


      {/* buttons */}
      <div className='flex flex-row justify-end items-end gap-2'>
          <Custombutton text={"Go Back"} fun={gobackhandler} styles={"bg-yellow-300 text-black mt-1"}/>
          <Custombutton text={"Next"} fun={()=>dispatch(setstep(3))} styles={"bg-yellow-300 text-black mt-1"}/>
      </div>
    </div>
  )
}

export default Coursebuilder