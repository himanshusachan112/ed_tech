import React, { useState } from 'react'
import Playersubsection from './Playersubsection'

const Playersection = ({section,setcurrentvideo,completedlecture}) => {

    const [showlecture,setshowlecture]=useState(false);

  return (
    <div>
        <div onClick={()=>setshowlecture(!showlecture)} className='text-green-600 border-2 border-yellow-300 mt-3 rounded-sm pl-1' >
            {section.name}
        </div>
        <div >
            {showlecture &&  section.subsection.map((lecture)=>(
                <Playersubsection lecture={lecture} setcurrentvideo={setcurrentvideo} completedlecture={completedlecture}/>
            ))}
        </div>
    </div>
  )
}

export default Playersection