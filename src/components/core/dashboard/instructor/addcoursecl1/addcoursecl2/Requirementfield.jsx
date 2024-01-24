
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

const Requirementfield = ({setValue,errors,getValues,reset,isSubmitSuccessful,editdata}) => {

  const [requirements,setrequirements]=useState([]);

  const handlekeydown=(event)=>{
    if(event.key==="Enter"){
      event.preventDefault();
      const newreq=event.target.value.trim();
      if(newreq && !requirements.includes(newreq)){
        setrequirements([...requirements,newreq])
      }
      event.target.value="";
    }
  }

  const deletereq=(reqindex)=>{
    const updatedreq=requirements.filter((_,index)=>index!==reqindex)
    setrequirements(updatedreq);
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      setrequirements([]);
    }
    setValue("requirements",requirements)

  },[requirements,isSubmitSuccessful])


  useEffect(()=>{
    if(editdata){
      setrequirements(editdata);
    }
  },[])

  return (
    <div className='w-full'>
      <div>
        <label htmlFor='requirements'>Course Requirements <sup className='text-red-800'>*</sup></label>
      </div>
      <div>
        <input
          type='text'
          name='requirements'
          id='requirements'
          onKeyDown={handlekeydown}
          className='w-full rounded-sm'
          placeholder='Enter the requirements and press Enter'
        />
      </div>
      <div className='w-full flex flex-col gap-2'>
        {requirements.map((req,index)=>(
          <div className='flex flex-row w-full bg-blue-900 p-1'>
            <div>
              {req}
            </div>
            <div className='mt-1' onClick={()=>deletereq(index)}>
              <IoClose/>
            </div>
          </div>
        ))}
      </div>
    </div>
 )
}

export default Requirementfield