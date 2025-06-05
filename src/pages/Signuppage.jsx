import React, { useEffect, useState } from 'react'
import { variables } from '../data/Variables'
import { useForm } from 'react-hook-form'
import Custombutton from '../components/common/Custombutton'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setuserdata } from "../slices/Authslice"
import { sendotp } from '../services/Authservices'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";

const Signuppage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    getValues,
    setValue
  } = useForm();

  const [tab, settab] = useState("Student");
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);

  const signuppagehandler = async (data) => {
    if (data.password !== data.confirmpassword) {
      return toast.error("Incorrect Confirm Password")
    }
    dispatch(setuserdata(data));
    dispatch(sendotp(data.email, navigate))
  }

  useEffect(() => {
    register("accounttype", { required: true })
    setValue("accounttype", "Student");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmpassword: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen text-white flex flex-col md:flex-row p-6'>
      <div className='md:w-1/2 space-y-6'>
        <h1 className='text-4xl font-bold'>
          Join the millions learning to code with Code_Rep for free
        </h1>
        <p className='text-gray-400 text-lg'>
          Build skills for today, tomorrow, and beyond <span className='text-cyan-400 italic'>Education to future-proof your career.</span>
        </p>
        <div className='flex gap-5 bg-gray-800 p-1 rounded-full text-lg w-fit'>
          <span
            className={`px-4 py-2 cursor-pointer rounded-full ${tab === "Student" ? "bg-black text-white" : "text-gray-300"}`}
            onClick={() => { setValue("accounttype", "Student"); settab("Student") }}>
            {variables.student}
          </span>
          <span
            className={`px-4 py-2 cursor-pointer rounded-full ${tab === "Instructor" ? "bg-black text-white" : "text-gray-300"}`}
            onClick={() => { setValue("accounttype", "Instructor"); settab("Instructor") }}>
            {variables.instructor}
          </span>
        </div>

        <form onSubmit={handleSubmit(signuppagehandler)} className='space-y-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1'>
              <label className='text-gray-300' htmlFor='firstname'>First Name<sup className="text-red-500">*</sup></label>
              <input
                type='text'
                placeholder='Enter First Name'
                id='firstname'
                className='w-full mt-1 p-2 rounded-lg text-black'
                {...register("firstname", { required: "Enter First Name" })}
              />
              {errors.firstname && <span className='text-red-400'>{errors.firstname.message}</span>}
            </div>
            <div className='flex-1'>
              <label className='text-gray-300' htmlFor='lastname'>Last Name<sup className="text-red-500">*</sup></label>
              <input
                type='text'
                placeholder='Enter Last Name'
                id='lastname'
                className='w-full mt-1 p-2 rounded-lg text-black'
                {...register("lastname", { required: "Enter Last Name" })}
              />
              {errors.lastname && <span className='text-red-400'>{errors.lastname.message}</span>}
            </div>
          </div>

          <div>
            <label className='text-gray-300' htmlFor='email'>Email Address<sup className="text-red-500">*</sup></label>
            <input
              type='email'
              placeholder='Enter Email Address'
              id='email'
              className='w-full mt-1 p-2 rounded-lg text-black'
              {...register("email", { required: "Enter Email Address" })}
            />
            {errors.email && <span className='text-red-400'>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1 relative'>
              <label className='text-gray-300' htmlFor='password'>Password<sup className="text-red-500">*</sup></label>
              <input
                type={showpassword ? "text" : "password"}
                placeholder='Enter Password'
                id='password'
                className='w-full mt-1 p-2 rounded-lg text-black'
                {...register("password", { required: "Enter Password" })}
              />
              <span className='absolute right-3 top-9 cursor-pointer text-white' onClick={() => setshowpassword(!showpassword)}>
                {showpassword ? <FaRegEye /> : <IoEyeOffSharp />}
              </span>
              {errors.password && <span className='text-red-400'>{errors.password.message}</span>}
            </div>
            <div className='flex-1 relative'>
              <label className='text-gray-300' htmlFor='confirmpassword'>Confirm Password<sup className="text-red-500">*</sup></label>
              <input
                type={showconfirmpassword ? "text" : "password"}
                placeholder='Confirm Password'
                id='confirmpassword'
                className='w-full mt-1 p-2 rounded-lg text-black'
                {...register("confirmpassword", { required: "Confirm your password" })}
              />
              <span className='absolute right-3 top-9 cursor-pointer text-white' onClick={() => setshowconfirmpassword(!showconfirmpassword)}>
                {showconfirmpassword ? <FaRegEye /> : <IoEyeOffSharp />}
              </span>
              {errors.confirmpassword && <span className='text-red-400'>{errors.confirmpassword.message}</span>}
            </div>
          </div>

          <Custombutton text={"Create Account"} styles={"bg-yellow-300 text-black w-[200px] mt-4"} />
        </form>
      </div>

      <div className='md:w-1/2 flex items-center justify-center mt-10 md:mt-0'>
        {/* Add a themed coding image or animation here */}
        <img
          src='https://source.unsplash.com/featured/?coding,developer'
          alt='coding banner'
          className='w-[90%] rounded-xl shadow-2xl'
        />
      </div>
    </div>
  )
}

export default Signuppage
