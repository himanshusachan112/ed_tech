import React from 'react'
import Custombutton from './Custombutton'

const Confirmationmodal = ({ modaldata }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-black text-white rounded-md border-8 border-yellow-400 p-6 max-w-sm w-full shadow-lg flex flex-col gap-6">
        <div className="text-lg font-semibold text-center">
          {modaldata.txt1}
        </div>
        <div className="text-sm text-center text-gray-300">
          {modaldata.txt2}
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={modaldata.btn1handler}
            className="bg-red-700 hover:bg-red-800 text-black rounded-md py-2 px-4 font-semibold transition"
          >
            {modaldata.btn1txt}
          </button>
          <button
            onClick={modaldata.btn2handler}
            className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-md py-2 px-4 font-semibold transition"
          >
            {modaldata.btn2txt}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmationmodal
