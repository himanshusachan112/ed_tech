import React, { useState } from 'react'
import { FaMessage } from 'react-icons/fa6'
import MessageModal from './MessageModal';

const Messagesection = () => {

  const [modal,setmodal]=useState(0);
  
  







  return (
    <>
    <div className='fixed text-green-500 right-8 bottom-5 size-10 text-3xl' onClick={()=>setmodal(1)} >
      <FaMessage/>
    </div>
    {modal &&  <MessageModal setmodal={setmodal} /> }
    
    </>
  )
}

export default Messagesection