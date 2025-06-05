import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, FreeMode, Navigation, Autoplay } from "swiper/modules"
import ReactStars from "react-rating-stars-component"
import GetAvgRating from '../../../utils/Averagerating'
import { useNavigate } from 'react-router-dom'

// Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"

const Coursesbox = ({ category }) => {
  const navigate = useNavigate()

  return (
    <div className='w-full px-4 md:px-12 mb-12'>
      <div className='text-2xl md:text-3xl text-yellow-400 font-bold mb-3'>
        {category.name}
      </div>

      <div className='bg-slate-700 border-2 border-yellow-300 p-4 rounded-md'>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {category.courses.map((course, index) =>
            course.status === "Published" && (
              <SwiperSlide key={index}>
                <div
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="cursor-pointer rounded-md overflow-hidden shadow-md bg-slate-800 hover:shadow-yellow-500 transition-shadow duration-300"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 w-full">
                    <img
                      src={course.thumbnail}
                      alt={course.coursename}
                      className="object-cover w-full h-full"
                    />
                    {/* Price tag */}
                    {course.price === 0 && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm px-2 py-1 rounded">
                        Free
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-2 flex flex-col gap-2 text-white">
                    <div className="text-yellow-300 font-semibold line-clamp-2 h-[3rem]">
                      {course.coursename}
                    </div>
                    <div className="flex items-center justify-center">
                      <ReactStars
                        count={5}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                        value={GetAvgRating(course.ratingandreviews)}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default Coursesbox
