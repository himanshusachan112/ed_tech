import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/Authservices'
import Custombutton from '../components/common/Custombutton'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Loginpage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();

  const [showpassword,setshowpassword]=useState(false);
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState:{errors,isSubmitSuccessful}
  }=useForm()

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        password:""
      })
    }
  },[reset,isSubmitSuccessful])

  

  const formsubmithandler=(data)=>{
    console.log(data);
    dispatch(login(data.email,data.password,navigate))
    
  }

  return (
    <div className='bg-black h-screen w-screen text-white'>
      <div className='p-5'>
        <div>
          <div>
          Welcome Back
          </div>
          <div>
          Build skills for today, tomorrow, and beyond. <span>Education to future-proof your career.</span>
          </div>
          <div>
            <form onSubmit={handleSubmit(formsubmithandler)}>
              <div>
                <label htmlFor='email'>Email address <sup>*</sup></label><br/>
                <input
                className='text-black'
                  name='email'
                  type='email'
                  id='email'
                  {...register("email",{
                    required:{value:true,message:"Enter email address"}
                  })}
                />
                <br/>
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
              </div>
              <div>
                <label htmlFor='password'>Password <sup>*</sup></label><br/>
                <div className='flex flex-row'>
                <input
                className='text-black'
                  name='password'
                  id='password'
                  type={`${showpassword===true ? "text" : "password"}`}
                  {...register("password",{
                    required:{value:true,message:"Enter the Password"}
                  })}

                />
                <span onClick={()=>setshowpassword(!showpassword)}>{showpassword===true? <FaRegEye className='text-white'/> : <IoEyeOffSharp className='text-white'/>}</span>
                </div>
                <Link to="/forgotpassword"><div className='text-blue-800'>Forgot Password</div></Link>
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
              </div>
              <div>
                  <Custombutton text={"Sign In" } styles={"bg-yellow-200 text-black w-[12%]"}/>
              </div>
            </form>
          </div>
        </div>
        <div>
          {/* imaes yet to upload */}
        </div>
      </div>
    </div>
  )
}

export default Loginpage