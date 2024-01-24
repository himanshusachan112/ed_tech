import React from 'react'

const Stepshighlighter = ({step}) => {
  return (
    <div className='flex flex-row justify-center items-center mt-2'>
        
            <div className={`${step>=1 ? "text-amber-400":""}`}>
                <div className={`rounded-full border-2 border-dashed p-2 ${step>=1 ? "p-1 border-amber-400 bg-amber-800":"border-black"}`}>1</div>
                <div className='absolute mx-[-20px]'>Course Information</div>
            </div>
            <div className={`${step>1 ? " text-amber-400":""}`}>---------------------------------------</div>
            <div className={`${step>=2 ? "text-amber-400":""}`} >
                <div className={`rounded-full border-2 border-dashed p-2 ${step>=2 ? "p-1 border-amber-400 bg-amber-800":"border-black"}`}>2</div>
                <div className='absolute mx-[-20px]'>Course Builder</div>
            </div>
            <div className={`${step>2 ? " text-amber-400":""}`}>---------------------------------------</div>
            <div className={`${step>=3 ? "text-amber-400":""}`}>
                <div className={`rounded-full border-2 border-dashed p-2 ${step>=3 ? "p-1 border-amber-400 bg-amber-800":"border-black"}`}>3</div>
                <div className='absolute mx-[-20px]'>Publish</div>
            </div>
    
    </div>
  )
}

export default Stepshighlighter