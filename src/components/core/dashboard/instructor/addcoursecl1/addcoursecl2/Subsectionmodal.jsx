import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Uploadbox from './Uploadbox';
import { useDispatch, useSelector } from 'react-redux';
import Custombutton from '../../../../../common/Custombutton';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { createsubsection, updatesubsection } from '../../../../../../services/Courseservices';

const Subsectionmodal = ({seteditmode,setcreatemode,setviewmode ,viewmode,editmode,createmode,subsectionmodal,setsubsectionmodal ,sectionid}) => {

    const dispatch=useDispatch();
    const { course}=useSelector((state)=>state.Course);
    const {token}=useSelector((state)=>state.Auth);


    const {
        reset,
        setValue,
        getValues,
        register,
        handleSubmit,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    const isformupdated=()=>{
        const data=getValues();
        if(data?.title!==subsectionmodal?.title || 
            data?.description !==subsectionmodal?.description || 
            data?.video!==subsectionmodal?.videourl ){
            return true;
        }
        else{
           return false;
        }
    }



    const subsectionsubmithandler=(data)=>{
        console.log("data of subsection ",data);
        const formdata=new FormData();
        
        if(data?.title!==subsectionmodal?.title){
            formdata.append("title",data?.title);
        }
        if(data?.description!==subsectionmodal?.description){
            formdata.append("description",data?.description)
        }
        if(data?.video!==subsectionmodal?.videourl){
            formdata.append("video",data?.video)
        }
        formdata.append("courseid",course._id)
        formdata.append("sectionid",sectionid);
        if(editmode){
            formdata.append("subsectionid",subsectionmodal._id);
            dispatch(updatesubsection(formdata,token));
            seteditmode(false);
            setsubsectionmodal(null);
            
            
        }
        if(createmode){
            dispatch(createsubsection(formdata,token));
            setcreatemode(false);
            setsubsectionmodal(null);
        }


    }

    const onsubmit=(e)=>{
        e.preventDefault();
        if(!isformupdated()){
            return toast.error("No Field are Updated");
        }
        handleSubmit(subsectionsubmithandler)();
        

    }

    useEffect(()=>{

        register("video",{
            required:{value:true,message:"Video is Required"}
        })
        if(editmode || viewmode){
            setValue("title",subsectionmodal.title);
            setValue("description",subsectionmodal.description);
            setValue("video",subsectionmodal.videourl);
        }

    },[])

  return (
    <div className='absolute top-0 h-full left-0 right-0 backdrop-blur-sm z-10'>
        <div className='w-1/2 h-fit mx-auto bg-slate-500 mt-9 rounded-sm border-2 border-yellow-300 p-4' >
            <div className='flex flex-row justify-between'>
                <div className='text-3xl'>
                    {viewmode && "Your Lecture"}
                    {editmode && "Edit Lecture"}
                    {createmode && "Create Lecture"}
                </div>
                <div onClick={()=>{
                    setsubsectionmodal(null);
                    setcreatemode(false);
                    seteditmode(false);
                    setviewmode(false)}} className='text-red-600 text-3xl'>
                    <RxCross2/>
                </div>
            </div>
           <form className='flex flex-col gap-4' onSubmit={onsubmit}>

                {/* title */}
                <div className={`${viewmode && "pointer-events-none"}`}>
                    <div>
                        <label htmlFor='title'>Title <sup className='text-red-800'>*</sup></label>
                    </div>
                    <div>
                        <input
                            id='title'
                            name='title'
                            placeholder='Enter The Title'
                            className='w-full rounded-sm '
                            {...register("title",{
                                required:{value:true,message:"Title is Required"}
                            })}
                        />
                        {errors.title && <span className='text-red-800'>{errors.title.message}</span>}
                    </div>
                </div>

                {/* description */}
                <div className={`${viewmode && "pointer-events-none"}`}>
                    <div>
                        <label htmlFor='description'>Description <sup className='text-red-800'>*</sup></label>
                    </div>
                    <div>
                        <input
                            id='description'
                            name='description'
                            placeholder='Enter The Description'
                            className='w-full rounded-sm'
                            {...register("description",{
                                required:{value:true,message:"Description is Required"}
                            })}
                            />
                        {errors.description && <span className='text-red-800'>{errors.description.message}</span>}
                    </div>
                </div>

                {/* video */}
                <div >
                    <Uploadbox setValue={setValue} errors={errors} formfield={"video"} isSubmitSuccessful={isSubmitSuccessful} video={true} thumbnail={course.thumbnail} editdata={subsectionmodal?.videourl} viewonly={viewmode} />
                </div>

                {/* buttons logic */}
                <div className='flex flex-row justify-end items-end'>
                    {!viewmode && <Custombutton text={"Save"} styles={"bg-yellow-300 text-black"}/>}
                </div>
           </form>
        </div>
    </div>
  )
}

export default Subsectionmodal