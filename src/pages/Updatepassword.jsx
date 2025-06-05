import React, { useState } from 'react'
import Custombutton from '../components/common/Custombutton'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetpassword } from '../services/Authservices';

const Updatepassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [data, setdata] = useState({ password: "", confirmpassword: "" });

  const passwordhandler = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  }

  const setpasswordhandler = () => {
    const { password, confirmpassword } = data;
    const token = location.pathname.split("/").at(-1);
    setdata({ password: "", confirmpassword: "" });
    dispatch(resetpassword(password, confirmpassword, token, navigate));
  }

  return (
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center justify-center text-white px-4'>
      <div className='w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Reset Your Password</h2>
        <p className='text-sm text-gray-400 mb-6 text-center'>Enter your new password below</p>

        <div className='mb-5 relative'>
          <label htmlFor='password' className='text-gray-300'>New Password <sup className='text-red-500'>*</sup></label>
          <div className='flex items-center bg-gray-700 rounded-md px-3 mt-1'>
            <input
              className='bg-transparent outline-none w-full py-2 text-white placeholder:text-gray-400'
              name='password'
              id='password'
              value={data.password}
              type={showpassword ? "text" : "password"}
              placeholder='Enter new password'
              onChange={passwordhandler}
            />
            <span onClick={() => setshowpassword(!showpassword)} className='cursor-pointer text-xl'>
              {showpassword ? <FaRegEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>

        <div className='mb-6 relative'>
          <label htmlFor='confirmpassword' className='text-gray-300'>Confirm Password <sup className='text-red-500'>*</sup></label>
          <div className='flex items-center bg-gray-700 rounded-md px-3 mt-1'>
            <input
              className='bg-transparent outline-none w-full py-2 text-white placeholder:text-gray-400'
              name='confirmpassword'
              id='confirmpassword'
              value={data.confirmpassword}
              type={showconfirmpassword ? "text" : "password"}
              placeholder='Re-enter new password'
              onChange={passwordhandler}
            />
            <span onClick={() => setshowconfirmpassword(!showconfirmpassword)} className='cursor-pointer text-xl'>
              {showconfirmpassword ? <FaRegEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>

        <Custombutton
          text={"Set Password"}
          styles={"w-full bg-yellow-300 text-black hover:bg-yellow-400 font-semibold py-2 rounded-md"}
          fun={setpasswordhandler}
        />
      </div>
    </div>
  )
}

export default Updatepassword
