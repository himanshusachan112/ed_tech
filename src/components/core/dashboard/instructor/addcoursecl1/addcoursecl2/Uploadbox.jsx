import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import { MdCloudUpload } from "react-icons/md";

const Uploadbox = ({setValue,errors,isSubmitSuccessful , video,formfield,thumbnail ,editdata,viewonly}) => {

  const videoref=useRef();
  const [file,setfile]=useState(null);
  const [preview,setpreview]=useState(false);


  const onDrop=(acceptedfiles)=>{
    const filedata=acceptedfiles[0];
    if(filedata){
      setfile(filedata);
      const reader=new FileReader();
      reader.readAsDataURL(filedata);
      reader.onloadend=()=>{
        // console.log("link to preview si =>",reader.result)
        setpreview(reader.result);
      }
    }
  }

  const {getInputProps,getRootProps}=useDropzone({
    accept:!video ? {"image/*":[".jpeg",".jpg",".png"]}:{"video/*": [".mp4"]},
    onDrop:(files)=>onDrop(files),
  })

  const cancelhandler=()=>{
    setfile(null);
    setpreview(false);
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      cancelhandler();
    }
    if(file){
      setValue(formfield,file);
    }
    else{
      setValue(formfield,"");
      console.log("box is null=============================================")
    }
    
  },[file,isSubmitSuccessful])


  useEffect(()=>{
    if(editdata){
      setpreview(editdata);
      setfile(editdata);
    }
    console.log("yes running on backprop")
  },[])

  return (
    <div  className='mt-2 w-full h-fit'>
      {preview ? 
      (<div>
        {/* showing preview image */}
        <div>
          {!video ? 
          (<div className='flex justify-center py-4 border-2 border-gray-900'>
            <img src={preview} className='w-[60%] h-[60%]  rounded-md'></img>
          </div>):
          (<div>
            <Player
              aspectRatio='16:9'
              playsInline
              poster={thumbnail && thumbnail}
              src={preview}

            />
          </div>)}
        </div>
        <div onClick={cancelhandler} className={`text-center bg-gray-800 text-white mt-1 ${viewonly && "pointer-events-none"}`}>
          Cancel
        </div>
      </div>):
      (<div {...getRootProps()} className='border-2 border-gray-800 flex items-center flex-col h-[200px] justify-center' >
        <input {...getInputProps()} />
        <div className='text-3xl'>
          {/* showing uploading tasks */}
          <MdCloudUpload/>
        </div>
        <div className='text-xl'>
          Click here to Upload file
        </div>
      </div>)}
      {errors[formfield] && <span className='text-red-800' >{errors[formfield].message}</span>}
    </div>
  )
}

export default Uploadbox