import React, { useState } from 'react'
import Custombutton from '../components/common/Custombutton'
import { FaArrowLeft } from "react-icons/fa6"
import { useDispatch } from 'react-redux'
import { sentforgotpasswordlink } from '../services/Authservices'
import { Link } from 'react-router-dom'

const Forgotpassword = () => {
  const dispatch = useDispatch()
  const [email, setemail] = useState("")
  const [emailsent, setemailsent] = useState(false)

  const linksubmithandler = () => {
    setemailsent(true)
    dispatch(sentforgotpasswordlink(email))
  }

  return (
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center justify-center text-white px-4'>
      <div className='w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-bold mb-3'>
          {!emailsent ? "Reset Your Password" : "Check Your Email"}
        </h2>
        <p className='text-gray-400 text-sm mb-6'>
          {!emailsent
            ? "We’ll send you instructions to reset your password. If you no longer have access to your email, we can help you recover your account."
            : `We’ve sent password reset instructions to ${email}`}
        </p>

        {!emailsent && (
          <div className='mb-6'>
            <label htmlFor='email' className='text-gray-300'>Email Address <sup className='text-red-500'>*</sup></label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder='Enter your email'
              className='w-full mt-1 p-2 rounded-md bg-gray-700 text-white outline-none placeholder-gray-400'
            />
          </div>
        )}

        <Custombutton
          text={!emailsent ? "Send Email" : "Resend Email"}
          styles='w-full bg-yellow-300 text-black hover:bg-yellow-400 py-2 rounded-md font-semibold'
          fun={linksubmithandler}
        />

        <div className='mt-4'>
          <Link to='/login' className='flex items-center gap-2 text-blue-400 hover:text-blue-500'>
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Forgotpassword
