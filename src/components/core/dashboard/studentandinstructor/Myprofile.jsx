import React from 'react'
import { useSelector } from 'react-redux'

const Myprofile = () => {

  const {profile}=useSelector((state)=>state.Profile);


  return (
    <div className=' p-10 bg-black h-screen flex flex-col gap-5'>
      <div className='flex flex-row bg-slate-600 rounded-md p-2 border-fuchsia-700 border-y-4'>
        <div>
          <img className='w-20 h-20 rounded-full' src={profile.image}/>
        </div>
        <div className='w-full flex justify-center items-center' >
          <div className='text-3xl '>{ `${profile.firstname + " "+ profile.lastname}`}</div>
        </div>

      </div>
      <div className='flex flex-row bg-slate-600 rounded-md p-2  h-20 border-y-4  border-fuchsia-700'>
        <div className='text-3xl'>
          ACCOUNTTYPE
        </div>
        <div className='text-3xl mx-auto'>
          {profile.accounttype}
        </div>
      </div>
      <div className='flex flex-row bg-slate-600 rounded-md p-2  h-20 border-y-4  border-fuchsia-700'>
        <div className='text-3xl '>
          EMAIL ID
        </div>
        <div className='text-3xl mx-auto'>
          {profile.email}
        </div>
      </div>


      <div className='flex flex-row bg-slate-600 rounded-md p-2  h-20 border-y-4  border-fuchsia-700'>
        <div className='text-3xl '>
          ABOUT
        </div>
        <div className='text-3xl mx-auto'>
          {profile.additionaldetails.about}
        </div>
      </div>


      <div className='flex flex-row bg-slate-600 rounded-md p-2  h-20 border-y-4  border-fuchsia-700'>
        <div className='text-3xl '>
          DATE OF BIRTH
        </div>
        <div className='text-3xl mx-auto'>
          {profile.additionaldetails.dateofbirth}
        </div>
      </div>


      <div className='flex flex-row bg-slate-600 rounded-md p-2  h-20 border-y-4  border-fuchsia-700'>
        <div className='text-3xl '>
          CONTACT NO
        </div>
        <div className='text-3xl mx-auto'>
          {profile.additionaldetails.contactno}
        </div>
      </div>



      <div className='flex flex-row bg-slate-600 rounded-md p-2  h-20 border-y-4  border-fuchsia-700'>
        <div className='text-3xl '>
          GENDER
        </div>
        <div className='text-3xl mx-auto'>
          {profile.additionaldetails.gender}
        </div>
      </div>

    </div>
  )
}

export default Myprofile