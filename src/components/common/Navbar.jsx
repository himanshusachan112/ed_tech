import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/code-reps.png"
import { NavbarLinks } from '../../data/navbar-links'
import { Link, useLocation } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { FaShoppingCart, FaAlignJustify } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { variables } from '../../data/Variables'
import Profiledropdown from './Profiledropdown'
import { apiConnector } from '../../utils/Apiconnecter'
import { categoryroutes } from '../../apis/apis'
import Homesidebar from './Homesidebar'

const Navbar = () => {
  const location = useLocation()
  const [sidebar, setSidebar] = useState(false)
  const [category, setCategory] = useState([])
  const { token, userdata } = useSelector((state) => state.Auth)

  const fetchCategory = async () => {
    try {
      const response = await apiConnector("GET", categoryroutes.FETCHCATEGORY_API)
      setCategory(response.data.data)
    } catch (err) {
      console.error("FETCH CATEGORY API ERROR =>", err)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <>
      <div className='bg-black flex justify-between items-center border-b border-yellow-400 relative z-30'>
        {/* Sidebar Toggle & Logo */}
        <div className='flex items-center gap-3'>
          <FaAlignJustify className='text-white text-xl cursor-pointer' onClick={() => setSidebar(!sidebar)} />
          <Link to="/home" onClick={() => setSidebar(false)}>
            <img src={logo} alt='Logo' className='w-[130px]' />
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className='flex gap-6 text-white items-center relative'>
          {NavbarLinks.map((sublink, index) => (
            sublink.title === "Courses" ? (
              <div key={index} className='relative group cursor-pointer'>
                <div className='flex items-center gap-1'>
                  <span className='hover:text-yellow-400'>Courses</span>
                  <IoIosArrowDropdownCircle className='mt-[2px]' />
                </div>
                {/* Dropdown */}
                <div className='absolute left-0 top-8 bg-yellow-500 text-black p-2 rounded shadow-md scale-0 group-hover:scale-100 transition-transform duration-200 origin-top min-w-[200px] z-40'>
                  {category.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/catalog/${item.name.split(" ").join("-")}`}
                      className='block px-2 py-1 hover:bg-yellow-300 rounded'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={index} to={sublink.path} className={`hover:text-yellow-300`}>
                {sublink.title}
              </Link>
            )
          ))}
        </div>

        {/* Right Side Auth/Profile */}
        <div className='flex items-center gap-3'>
          {!token ? (
            <>
              <Link to="/login">
                <button className='bg-slate-600 px-3 py-1 rounded text-white'>Login</button>
              </Link>
              <Link to="/signup">
                <button className='bg-slate-600 px-3 py-1 rounded text-white'>Sign Up</button>
              </Link>
            </>
          ) : userdata?.accounttype === variables.student ? (
            <>
              <FaShoppingCart className='text-yellow-400 text-xl cursor-pointer' />
              <Profiledropdown />
            </>
          ) : (
            <Profiledropdown />
          )}
        </div>
      </div>

      {/* Sidebar */}
      {sidebar && <Homesidebar />}
    </>
  )
}

export default Navbar
