import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiConnector } from '../utils/Apiconnecter'
import { courseroutes } from '../apis/apis'
import Coursesbox from '../components/core/catalog/Coursesbox'

const Catalogpage = () => {
  const location = useLocation()
  const searchedpath = location.pathname.split("/").at(-1)
  const [categories, setcategories] = useState([])
  const [loading, setLoading] = useState(true)

  const getcategorycourses = async () => {
    const toastid = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector("POST", courseroutes.GETCATEGORYCOURSES_API, {
        firstcategory: searchedpath,
      })

      if (!response.data.success) throw new Error(response.data.message)

      setcategories(response.data.data)
      toast.success(response.data.message)
    } catch (err) {
      toast.error(err.message || "Failed to load courses")
    } finally {
      toast.dismiss(toastid)
      setLoading(false)
    }
  }

  useEffect(() => {
    getcategorycourses()
  }, [location.pathname])

  return (
    <div className="bg-black min-h-screen w-full text-white px-4 sm:px-10">
      <div className="text-center text-3xl font-extrabold text-yellow-300 py-6 border-b border-yellow-500">
        Welcome to ED_TECH Courses
      </div>

      {loading ? (
        <div className="text-center text-yellow-200 mt-10 text-lg">Loading courses...</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 text-md">
          No courses found for category <span className="text-yellow-300 font-medium">{searchedpath}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6 py-6">
          {categories.map((category, index) => (
            <Coursesbox key={index} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogpage
