import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import Custombutton from '../components/common/Custombutton'
import { sendotp, signup } from '../services/Authservices'

const Verifyotp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [otp, setotp] = useState("")
  const { userdata, loading } = useSelector((state) => state.Auth)

  useEffect(() => {
    if (!userdata) navigate("/signup")
  }, [])

  const resendotphandler = (e) => {
    e.preventDefault()
    dispatch(sendotp(userdata.email, navigate))
  }

  const verifyotphandler = (e) => {
    e.preventDefault()
    const { firstname, lastname, password, confirmpassword, email, accounttype } = userdata
    dispatch(signup(navigate, firstname, lastname, accounttype, email, password, confirmpassword, otp))
  }

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Verify Your Email</h2>
        <p className="text-gray-400 text-sm text-center">Enter the 6-digit code sent to your email <span className="text-yellow-300 font-semibold">{userdata?.email}</span></p>

        <OtpInput
          value={otp}
          onChange={setotp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl rounded bg-gray-700 border border-yellow-300 text-yellow-400 focus:outline-none"
            />
          )}
          containerStyle={{ justifyContent: "center", gap: "10px" }}
        />

        <div
          onClick={resendotphandler}
          className="text-blue-400 hover:text-blue-500 text-sm cursor-pointer mt-1"
        >
          Resend OTP
        </div>

        <Custombutton
          text="Verify OTP"
          styles="w-full bg-yellow-300 text-black py-2 rounded font-semibold hover:bg-yellow-400"
          fun={verifyotphandler}
        />
      </div>
    </div>
  )
}

export default Verifyotp
