import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Editandsave from './cl1/Editandsave';
import { saveuser } from '../../../../services/Userservices';
import Custombutton from '../../../common/Custombutton';
import { IoMdSave } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';


const Mysettings = () => {


  
  const dispatch=useDispatch();
  const {profile}=useSelector((state)=>state.Profile);
  const {token}=useSelector((state)=>state.Auth);
  console.log("profile abotu secion is",profile.additionaldetails.about);

  const [updateimage,setupdateimage]=useState(false);
  const [updatefirstname,setupdatefirstname]=useState(false);
  const [updatelastname,setupdatelastname]=useState(false);
  const [firstname,setfirstname]=useState(profile.firstname);
  const [lastname,setlastname]=useState(profile.lastname);
  const [userimage,setuserimage]=useState(profile.image);


  const onDrop=(acceptedfiles)=>{
    console.log("function reaches ondrop======================================================================")
    console.log("acceipted fiels",acceptedfiles)
    const file=acceptedfiles[0];
    setuserimage(file);
    if(!file){
      return toast.error("Select Some Files");
    }
    if(file){
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        console.log("reader.rsoutl",reader.result);
        // setuserimage(reader.result);
      }
    }
  }


  const {getInputProps,getRootProps,isDragActive}=useDropzone({
    accept:{"image/*":[".jpeg",".jpg",".png"]},
    onDrop:(files)=>onDrop(files)
  })

  const handleupdate=()=>{
    const formdata=new FormData();
    if(!firstname || !lastname || !userimage){
      return toast.error("Please Make some Changes")
    }
    formdata.append("firstname",firstname);
    formdata.append("lastname",lastname);
    formdata.append("userimage",userimage);
    dispatch(saveuser(formdata,token));
    setupdatefirstname(false);
    setupdatelastname(false);
    setupdateimage(false);

  }

 

  return (
    <div className='bg-black h-screen flex flex-col'>
      <div className='w-full text-3xl text-slate-600 text-center font-bold'>
        {`Hey ${profile.firstname + " "+ profile.lastname} Here You can Edit Your Profile`}
      </div>
      <div className='flex flex-row flex-wrap'>
        <div className='flex flex-col w-1/2 p-2 gap-4'>
            <div className='bg-slate-600 rounded-sm flex flex-row'>
              <div className='p-2'>
                <img className='w-20 h-20 rounded-full' src={profile.image}/>
              </div>
              <div className='flex flex-row gap-2 p-2 justify-end w-full'>
                <div className='bg-yellow-300 flex flex-row gap-2  rounded-sm h-12' onClick={()=>setupdateimage(!updateimage)}>
                  <div className='mt-3'><RiEditFill/></div>
                  <div><Custombutton text={"Change"}/></div>
                </div>
                {
                  updateimage===true? (
                    <>
                      <div {...getRootProps()} className='bg-yellow-300 flex flex-row rounded-sm h-12'>
                        <input {...getInputProps()}/>
                        <div className='mt-3'><LuUpload/></div>
                        <div><Custombutton text={"Upload"}/></div>     
                      </div>
                      <div className='bg-yellow-300 flex flex-row rounded-sm h-12' onClick={handleupdate}>
                          <div className='mt-3'><IoMdSave/></div>
                          <div><Custombutton text={"Update"}/></div>
                      </div>
                    </>
                  ):(null)
                }
                
              </div>
            </div>
            <div  className='bg-slate-600 rounded-sm flex flex-row justify-between p-2'>
              <div className='text-3xl w-[30%]'>
                FirstName
              </div>
              <div >
                {updatefirstname===true? (<input type='text' value={firstname} className='rounded-sm mt-2' onChange={(e)=>setfirstname(e.target.value)}/>):(<input type='text'  readOnly className='rounded-sm mt-2' value={profile.firstname}/>)}
              </div>
              <div className='flex flex-row gap-2'>
                <div onClick={()=>setupdatefirstname(!updatefirstname)} className='bg-yellow-300 rounded-sm flex flex-row'>
                  <div className='mt-3 pl-1'><RiEditFill/></div>
                  <div><Custombutton text={"Edit"} styles={"bg-yellow-300"}/></div>
                </div>
                {updatefirstname===true? (
                <div onClick={handleupdate} className='bg-yellow-300 rounded-sm flex flex-row'>
                  <div className='mt-3 pl-1'><IoMdSave/></div>
                  <div><Custombutton text={"Update"} styles={"bg-yellow-300"}/></div>
                </div>):(null)}
              </div>
            </div>
            <div  className='bg-slate-600 rounded-sm flex flex-row justify-between p-2'>
              <div className='text-3xl w-[30%]'>
                LastName
              </div>
              <div>
                {updatelastname===true? (<input type='text' value={lastname} onChange={(e)=>setlastname(e.target.value)} className='rounded-sm mt-2'/>):(<input type='text' readOnly value={profile.lastname} className='rounded-sm mt-2'/>)}
              </div>
              <div className='flex flex-row gap-2'>
                <div onClick={()=>setupdatelastname(!updatelastname)} className='bg-yellow-300 rounded-sm  flex flex-row'>
                  <div className='mt-3 pl-1'><RiEditFill/></div>
                  <div><Custombutton text={"Edit"} styles={"bg-yellow-300"}/></div>
                </div>
                {updatelastname===true? (
                <div onClick={handleupdate} className='bg-yellow-300 rounded-sm flex flex-row'>
                  <div className='mt-3 pl-1'><IoMdSave/></div>
                  <div><Custombutton text={"Update"} styles={"bg-yellow-300"}/></div>
                </div>):(null)}
              </div>
            </div>
        </div>
        <div className='w-[50%] h-1/2 bg-purple-950 rounded-sm' ></div>
        <div className='w-[50%] h-[60%] mt-[-20px] bg-purple-950 rounded-sm  '></div>
        <div className='flex flex-col w-1/2 gap-4  p-2'>
            <div>
              <Editandsave txt1={"About"} field={"about"} value={profile.additionaldetails.about}
              />
            </div>
            <div>
              <Editandsave txt1={"Date of Birth"} field={"dateofbirth"} value={profile.additionaldetails.dateofbirth}/>
            </div>
            <div>
              <Editandsave txt1={"Contact No"} field={"contactno"} value={profile.additionaldetails.contactno}/>
            </div>
            <div>
              <Editandsave txt1={"Gender"} field={"gender"} value={profile.additionaldetails.gender}/>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Mysettings