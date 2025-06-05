import React from 'react'
import { useSelector } from 'react-redux'

const Myprofile = () => {
  const { profile } = useSelector((state) => state.Profile)

  const profileFields = [
    { label: 'Account Type', value: profile.accounttype },
    { label: 'Email', value: profile.email },
    { label: 'About', value: profile?.additionaldetails?.about || 'N/A' },
    { label: 'Date of Birth', value: profile?.additionaldetails?.dateofbirth || 'N/A' },
    { label: 'Contact Number', value: profile?.additionaldetails?.contactno || 'N/A' },
    { label: 'Gender', value: profile?.additionaldetails?.gender || 'N/A' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={profile.image}
            alt={`${profile.firstname} ${profile.lastname}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
          />
          <h1 className="text-3xl font-semibold text-yellow-400">
            {profile.firstname} {profile.lastname}
          </h1>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          {profileFields.map(({ label, value }, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-700 rounded-md p-4 shadow-inner"
            >
              <span className="text-gray-300 text-lg font-medium">{label}</span>
              <span className="text-yellow-300 text-lg mt-2 sm:mt-0 max-w-xl break-words">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Myprofile
