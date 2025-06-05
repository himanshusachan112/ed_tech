import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/Authservices'
import Custombutton from '../components/common/Custombutton'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Loginpage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [showpassword, setshowpassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: ""
      })
    }
  }, [reset, isSubmitSuccessful])

  const formsubmithandler = (data) => {
    dispatch(login(data.email, data.password, navigate))
  }

  return (
    <div className='bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center text-white'>
      <div className='w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-800 bg-gray-950'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Welcome Back</h2>
        <p className='mb-6 text-center text-gray-400'>Build skills for today, tomorrow, and beyond. <span className='text-cyan-400'>Education to future-proof your career.</span></p>
        <form onSubmit={handleSubmit(formsubmithandler)} className='space-y-5'>
          <div>
            <label htmlFor='email' className='block text-sm mb-1'>Email address <sup>*</sup></label>
            <input
              className='w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400'
              name='email'
              type='email'
              id='email'
              {...register("email", {
                required: { value: true, message: "Enter email address" }
              })}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor='password' className='block text-sm mb-1'>Password <sup>*</sup></label>
            <div className='relative'>
              <input
                className='w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-10'
                name='password'
                id='password'
                type={showpassword ? "text" : "password"}
                {...register("password", {
                  required: { value: true, message: "Enter the Password" }
                })}
              />
              <span onClick={() => setshowpassword(!showpassword)} className='absolute top-2 right-3 cursor-pointer text-xl'>
                {showpassword ? <FaRegEye /> : <IoEyeOffSharp />}
              </span>
            </div>
            <Link to="/forgotpassword" className='block text-right mt-2 text-sm text-cyan-400 hover:underline'>Forgot Password?</Link>
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
          </div>
          <div className='text-center'>
            <Custombutton text={"Sign In"} styles={"bg-cyan-400 hover:bg-cyan-600 text-black w-full py-2 rounded-xl"} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Loginpage
