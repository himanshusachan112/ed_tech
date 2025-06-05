import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profiledropdown = () => {
  const { profile } = useSelector((state) => state.Profile)

  return (
    <div className="relative group cursor-pointer">
      {/* Profile Picture */}
      <img
        src={profile.image}
        alt="profile"
        className="rounded-full w-8 h-8 mr-2 border border-yellow-400"
      />

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 bg-slate-700 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-48 z-40">
        <Link
          to="/dashboard/my-profile"
          className="block px-4 py-2 hover:bg-slate-600"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/my-settings"
          className="block px-4 py-2 hover:bg-slate-600"
        >
          Settings
        </Link>

        {profile.accounttype === "Student" ? (
          <>
            <Link
              to="/dashboard/student/enrolled-courses"
              className="block px-4 py-2 hover:bg-slate-600"
            >
              Enrolled Courses
            </Link>
            <Link
              to="/dashboard/student/my-cart"
              className="block px-4 py-2 hover:bg-slate-600"
            >
              My Cart
            </Link>
          </>
        ) : (
          <Link
            to="/dashboard/instructor/my-courses"
            className="block px-4 py-2 hover:bg-slate-600"
          >
            My Courses
          </Link>
        )}
      </div>
    </div>
  )
}

export default Profiledropdown
