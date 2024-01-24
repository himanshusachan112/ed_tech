import React from 'react'

const Playersubsection = ({lecture,setcurrentvideo,completedlecture}) => {

    console.log("completed lecture is ",completedlecture)
  return (
    <div onClick={()=>setcurrentvideo(lecture)} className='flex flex-row '>
        <div>
            
            <input
                type='checkbox'
                checked={completedlecture?.includes(lecture?._id)? true : false}
                readOnly
            />
        </div>
        <div className='text-xl ml-3 text-black bg-yellow-700 mt-1 pl-1 rounded-sm w-full'>
            {lecture.title}
        </div>
    </div>
  )
}

export default Playersubsection