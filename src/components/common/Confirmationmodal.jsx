import React from 'react'
import Custombutton from './Custombutton'

const Confirmationmodal = ({modaldata}) => {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm flex justify-center items-center'>
        <div className='flex flex-col p-4 bg-black text-white rounded-md border-[10px] border-yellow-300 font-semibold'>
            <div>
                {modaldata.txt1}
            </div>
            <div>
                {modaldata.txt2}
            </div>
            <div className='flex flex-row justify-between'>
                <span>
                    <Custombutton text={modaldata.btn1txt} fun={modaldata.btn1handler} styles={"bg-red-800 text-black"}/>
                </span> 
                <span>
                    <Custombutton text={modaldata.btn2txt} fun={modaldata.btn2handler} styles={"bg-yellow-300 text-black "}/>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Confirmationmodal