import React, { useState } from 'react'
import { saveprofile } from '../../../../../services/Userservices'
import { IoMdSave } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import Custombutton from '../../../../common/Custombutton';

const Editandsave = ({txt1,field,value}) => {
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.Auth)
    console.log("data to pass is updateprofile ")

    const [edit,setedit]=useState(false);
    const [data,setdata]=useState(value);

    const handlesave=()=>{
        console.log("hanflesave function started")
        dispatch(saveprofile({[field]:data,token}))
        setedit(false);
    }



  return (
    <div className='p-3 bg-slate-600 rounded-sm flex flex-row gap-2 justify-between'>
        <div className='text-3xl w-[30%]'>
            {txt1}
        </div>
        <div className='mt-2'>
            {edit===true? (

            <input
                type='text'
                value={data}
                onChange={(e)=>setdata(e.target.value)}
                className='pl-2 rounded-sm'
            />):(
            <input 
                type='text'
                value={value}
                readOnly
                className='pl-2 rounded-sm'
                
                />)}
        </div>
        <div className='flex flex-row gap-2'>
            <div className='flex flex-row bg-yellow-300 rounded-sm' onClick={()=>setedit(!edit)}>
                <div className='mt-3 pl-1'><RiEditFill/></div>
                <div><Custombutton text={"Edit"} styles={" mt-0"}/></div>
            </div>
            <div className='bg-yellow-300 rounded-sm'>
                {edit===true ? (
                    <div className='flex flex-row' onClick={handlesave}>
                        <div className='mt-3 pl-1'><IoMdSave/></div>
                        <div><Custombutton text={"Save"} styles={" mt-0"}/></div>
                    </div>):(null)}
            </div>
        </div>
    </div>
  )
}

export default Editandsave