import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiConnector } from '../utils/Apiconnecter';
import { courseroutes } from '../apis/apis';
import Coursesbox from '../components/core/catalog/Coursesbox';

const Catalogpage = () => {

    const location=useLocation();
    console.log("path is ",location.pathname.split("/").at(-1))
    const searchedpath=location.pathname.split("/").at(-1);
    const [categories,setcategories]=useState([]);

    const getcategorycourses=async ()=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.GETCATEGORYCOURSES_API,{firstcategory:searchedpath})
            console.log("CATEGORY COURSES API RESPONSE ",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            setcategories(response.data.data);
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("CATEGORY COURSES API RESPONSE ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }

    }    

    useEffect(()=>{
        getcategorycourses();
    },[location.pathname])

  return (
    <div className='bg-black w-full h-full'>
        <div className='text-3xl text-slate-600 font-bold text-center border-b-2 border-fuchsia-600 py-2'>
            Welcome To ED_TECH Courses
        </div>
        <div className='flex flex-col gap-4 mt-3'>
            {categories.map((category,index)=>(
                <Coursesbox key={index} category={category}/>
            ))}
        </div>
    </div>
  )
}

export default Catalogpage