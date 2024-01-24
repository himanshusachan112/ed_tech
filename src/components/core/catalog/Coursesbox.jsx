import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import {Pagination,FreeMode,Navigation,Autoplay} from "swiper/modules"
import ReactStars from "react-rating-stars-component";
import GetAvgRating from '../../../utils/Averagerating';

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom'

const Coursesbox = ({category}) => {


    const navigate=useNavigate();
    console.log("category is ",category)

  return (
    <div className='w-full'>
        <div className='text-3xl text-slate-600'>
            {category.name}
        </div>
        <div className=' bg-slate-600 border-2 border-yellow-300 mt-8 p-3 '>
            <Swiper 
                slidesPerView={4}
                spaceBetween={25}
                modules={[FreeMode,Pagination,Autoplay,Navigation]}
                loop={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                breakpoints={{
                1024: {
                slidesPerView: 3,
                    },
                }}   
                className="mySwiper max-h-[30rem]">

            {category.courses.map((course,index)=>(
                course.status==="Published" &&
                <SwiperSlide key={index}>
                    <div className='w-52 flex flex-col overflow-auto pb-6 '>
                        <div>
                           <div onClick={()=>navigate(`/course/${course._id}`)} className='w-52 h-52 relative'>
                             <img src={course.thumbnail} alt='' className='w-52 h-52'/>
                             <div className='absolute bg-blue-600 text-white right-2 top-2 px-1 rounded-md'>
                                {course.price==0 && "Free"}
                             </div>
                             <div className='absolute bottom-0 left-11'>
                                <ReactStars
                                    count={5}
                                    size={30}
                                    edit={false}
                                    activeColor="#ffd700"
                                    value={GetAvgRating(course.ratingandreviews)}
                                    
                                    
                                />
                             </div>
                           </div>
                        </div>
                        
                        <div className='text-yellow-300 w-52' >
                            {course.coursename}
                        </div>          
                    </div>
                </SwiperSlide>
            ))}

            </Swiper>
        </div>
    </div>
  )
}

export default Coursesbox