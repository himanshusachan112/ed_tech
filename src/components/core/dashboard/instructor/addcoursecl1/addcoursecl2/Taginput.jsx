
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

const Taginputs = ({setValue,errors,getValues,reset,isSubmitSuccessful ,editdata}) => {

  const [chips,setchips]=useState([]);

  const handlekeydown=(event)=>{
    if(event.key==="Enter"){
      event.preventDefault();
      const chipvalue=event.target.value.trim();
      console.log("trimmed value is ",chipvalue);
      if(chipvalue && !chips.includes(chipvalue)){
        console.log("aaya tou hai ")
        setchips([...chips,chipvalue]);
      }
      event.target.value="";
    } 
  }

  const deletechip=(chipindex)=>{
    console.log("chipindex is ",chipindex)
    const updatedchips=chips.filter((_,index)=>index!==chipindex)
    console.log("updated chips is ",updatedchips)
    setchips(updatedchips);
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      setchips([]);
    }
    setValue("tags",chips)
  },[chips,isSubmitSuccessful])

  useEffect(()=>{
    if(editdata){
      setchips(editdata);
    }
  },[])

  return (
    <div>
      <div className='flex flex-row gap-4 p-2 flex-wrap'>
        {chips.map((chip,index)=>(
          <div key={index} className='flex flex-row gap-1 rounded-lg px-1 bg-amber-600'>
            <div>
              {chip}
            </div>
            <div className='mt-1' onClick={()=>deletechip(index)}>
              <IoClose/>
            </div>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor='tags' >Tags <sup className='text-red-800'>*</sup></label>
      </div>
      <div className='w-full'>
        <input
          type='text'
          id='tags'
          name='tags'
          placeholder='Enter Tag and Press Enter'
          onKeyDown={handlekeydown}
          className='w-full'
        />
        {errors.tags && <span className='text-red-800'>{errors.tags.message}</span>}
      </div>
    </div>
  )
}

export default Taginputs