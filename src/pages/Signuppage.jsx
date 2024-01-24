import React, { useEffect, useState } from 'react'
import { variables } from '../data/Variables'
import { useForm } from 'react-hook-form'
import Custombutton from '../components/common/Custombutton'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {setuserdata} from "../slices/Authslice"
import { sendotp } from '../services/Authservices'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";



const Signuppage = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful},
    getValues,
    setValue}=useForm()
  const [tab,settab]=useState("Student");
  const [showpassword,setshowpassword]=useState(false);
  const [showconfirmpassword,setshowconfirmpassword]=useState(false);

  

  const signuppagehandler=async (data)=>{
    console.log("form data is =>",data);
    if(data.password!==data.confirmpassword){
      return toast.error("Incorrect Confirm Password")
    }
    dispatch(setuserdata(data));
    dispatch(sendotp(data.email,navigate))
  }

  useEffect(()=>{
      register("accounttype",{
        required:{value:true}
      })
      setValue("accounttype","Student");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        password:"",
        confirmpassword:"",
      })
    }
  },[reset,isSubmitSuccessful])

    
  


  return (
    <div className='bg-black min-h-screen'>
      <div className='w-[50%] p-6 tracking-normal '>
        <div className='text-white font-bold font-serif text-3xl '>
        Join the millions learning to code with StudyNotion for free
        </div>
        <div className='text-gray-500 text-lg'>Build skills for today, tomorrow, and beyond  <span className='text-blue-500 italic'>Education to future-proof your career.</span></div>
        <div className=' flex gap-5 mt-2 bg-slate-700 p-0.5 text-lg w-fit rounded-full  text-slate-200 '>
          <span className={`p-2 cursor-pointer rounded-full ${tab==="Student" ? "bg-black":"" }`} 
            onClick={()=>{setValue("accounttype","Student");
                          settab("Student")
            }}>{variables.student}
          </span>
          <span className={`p-2 cursor-pointer rounded-full ${tab==="Instructor" ? "bg-black":"" }`}
           onClick={()=>{setValue("accounttype","Instructor");
                         settab("Instructor")
           }}>{variables.instructor}
           </span>
        </div>  
        <form onSubmit={handleSubmit(signuppagehandler)}>
          <div className='lg:flex flex-row gap-10'>
            <span>
              <label className='text-gray-500' htmlFor='firstname'>FirstName<sup className="text-red-500">*</sup></label><br/>
              <input
              type='text'
              placeholder='Enter FirstName' 
              name='firstname' 
              id='firstname'
              {...register("firstname",{
                required:{value:true,message:"Enter First Name"},

              })}
              />
              {errors.firstname && <span className='text-red-800'>{errors.firstname.message}</span>}<br/>
            </span>
            <span>
              <label className='text-gray-500' htmlFor='lastname'>LastName<sup className="text-red-500">*</sup></label><br/>
              <input 
              type='text'
              placeholder='Enter LastName' 
              name='lastname' 
              id='lastname'
              {...register("lastname",{
                required:{value:true,message:"Enter Last Name"}
              })}
              />
              {errors.lastname && <span className='text-red-800'>{errors.lastname.message}</span>}
            </span>
          </div>
          <div>
            <label className='text-gray-500' htmlFor='email'>Email Address<sup className="text-red-500">*</sup></label><br/>
            <input 
            type='email'
            placeholder='Enter Email Address'
            id='email'
            name='email'
            {...register("email",{
              required:{value:true,message:"Enter Email Address"}
            })}
            />
            {errors.email && <span className='text-red-800'>{errors.email.message}</span>}
          </div>
          <div  className=' lg:flex flex-row gap-10 '>
            <div>
              <label className='text-gray-500' htmlFor='password'>Password<sup className="text-red-500">*</sup></label><br/>
              <input 
                type={`${showpassword?"text":"password"}`}
                placeholder='Password'
                id='password'
                name='password'
                {...register("password",{
                  required:{value:true,message:"Enter Password"}
                })}
              />
              <span className='text-white' onClick={()=>setshowpassword(!showpassword)}>{showpassword? <FaRegEye/> : <IoEyeOffSharp/>} </span>

              <br/>
              {errors.password && <span className='text-red-800'>{errors.password.message}</span>}<br/>
            </div>
            <div>
              <label className='text-gray-500' htmlFor='confirmpassword'>confirm Password<sup className="text-red-500">*</sup></label><br/>
                <input 
                  type={`${showconfirmpassword?'text':'password'}`}
                  placeholder='Password'
                  id='confirmpassword'
                  name='confirmpassword'
                  {...register("confirmpassword",{
                    required:{value:true,message:"Enter Password"}
                  })}
                />
                <span className='text-white' onClick={()=>setshowconfirmpassword(!showconfirmpassword)}>{showconfirmpassword? <FaRegEye/> : <IoEyeOffSharp/>} </span>

                <br/>
                {errors.confirmpassword && <span className='text-red-800'>{errors.confirmpassword.message}</span>}<br/>
            </div>
          </div>
          
          <Custombutton  text={"Create Account"} styles={"bg-yellow-300 text-black w-[200px]"}/>




        </form>
      </div>
      <div className='w-[50%]'>
        
      </div>
    </div>
  )
}

export default Signuppage