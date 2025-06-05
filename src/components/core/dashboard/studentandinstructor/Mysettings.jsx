import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Editandsave from './cl1/Editandsave'
import { saveuser } from '../../../../services/Userservices'
import Custombutton from '../../../common/Custombutton'
import { IoMdSave } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'
import { LuUpload } from 'react-icons/lu'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

const Mysettings = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.Profile)
  const { token } = useSelector((state) => state.Auth)

  const [updateImage, setUpdateImage] = useState(false)
  const [updateFirstName, setUpdateFirstName] = useState(false)
  const [updateLastName, setUpdateLastName] = useState(false)

  const [firstname, setFirstname] = useState(profile.firstname)
  const [lastname, setLastname] = useState(profile.lastname)
  const [userimage, setUserimage] = useState(profile.image)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) {
      return toast.error('Please select an image file.')
    }
    setUserimage(file)
  }

  const { getInputProps, getRootProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    onDrop,
  })

  const handleUpdate = () => {
    if (!firstname.trim() || !lastname.trim() || !userimage) {
      return toast.error('Please fill in all required fields or make changes.')
    }
    const formdata = new FormData()
    formdata.append('firstname', firstname.trim())
    formdata.append('lastname', lastname.trim())
    formdata.append('userimage', userimage)
    dispatch(saveuser(formdata, token))

    setUpdateFirstName(false)
    setUpdateLastName(false)
    setUpdateImage(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-8 text-center px-2">
        {`Hey ${profile.firstname} ${profile.lastname}, Edit Your Profile`}
      </h2>

      <div className="flex flex-col md:flex-row max-w-6xl w-full gap-8">
        {/* Left Panel */}
        <div className="flex flex-col flex-1 gap-6 bg-gray-800 rounded-lg p-6 shadow-lg">
          {/* Profile Image Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={
                userimage instanceof File
                  ? URL.createObjectURL(userimage)
                  : userimage
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setUpdateImage((prev) => !prev)}
                className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition"
              >
                <RiEditFill size={20} />
                Change
              </button>
            </div>
          </div>

          {/* Upload & Save Buttons for Image */}
          {updateImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                {...getRootProps()}
                className="flex items-center justify-center gap-2 cursor-pointer bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition"
              >
                <input {...getInputProps()} />
                <LuUpload size={20} />
                Upload Image
              </div>
              <button
                onClick={handleUpdate}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                <IoMdSave size={20} />
                Save
              </button>
            </div>
          )}

          {/* Firstname */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="text-yellow-400 font-semibold text-lg w-full sm:w-32">
              First Name
            </label>
            {updateFirstName ? (
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="flex-grow rounded px-3 py-2 text-gray-900 w-full sm:w-auto"
              />
            ) : (
              <input
                type="text"
                value={firstname}
                readOnly
                className="flex-grow rounded px-3 py-2 bg-gray-700 text-yellow-300 cursor-default w-full sm:w-auto"
              />
            )}
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => setUpdateFirstName((prev) => !prev)}
                className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                <RiEditFill />
                Edit
              </button>
              {updateFirstName && (
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  <IoMdSave />
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Lastname */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="text-yellow-400 font-semibold text-lg w-full sm:w-32">
              Last Name
            </label>
            {updateLastName ? (
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="flex-grow rounded px-3 py-2 text-gray-900 w-full sm:w-auto"
              />
            ) : (
              <input
                type="text"
                value={lastname}
                readOnly
                className="flex-grow rounded px-3 py-2 bg-gray-700 text-yellow-300 cursor-default w-full sm:w-auto"
              />
            )}
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => setUpdateLastName((prev) => !prev)}
                className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                <RiEditFill />
                Edit
              </button>
              {updateLastName && (
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  <IoMdSave />
                  Save
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col flex-1 gap-6 bg-gray-800 rounded-lg p-6 shadow-lg">
          <Editandsave
            txt1="About"
            field="about"
            value={profile.additionaldetails.about}
          />
          <Editandsave
            txt1="Date of Birth"
            field="dateofbirth"
            value={profile.additionaldetails.dateofbirth}
          />
          <Editandsave
            txt1="Contact No"
            field="contactno"
            value={profile.additionaldetails.contactno}
          />
          <Editandsave
            txt1="Gender"
            field="gender"
            value={profile.additionaldetails.gender}
          />
        </div>
      </div>
    </div>
  )
}

export default Mysettings
