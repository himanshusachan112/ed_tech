import React, { useEffect, useRef, useState } from 'react'
import {setstep,setcourse,seteditcourse,resetCourseState } from '../../../../../slices/Courseslice'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../../../utils/Apiconnecter';
import { categoryroutes } from '../../../../../apis/apis';
import { HiOutlineCurrencyRupee } from "react-icons/hi"//
import Taginputs from './addcoursecl2/Taginput'
import Requirementfield from './addcoursecl2/Requirementfield';
import Uploadbox from './addcoursecl2/Uploadbox';
import Custombutton from '../../../../common/Custombutton';
import { toast } from 'react-toastify';
import { createcourse, updatecourse } from '../../../../../services/Courseservices';

const Courseinformation = () => {

  const dispatch=useDispatch();
  const {course,editcourse,step}=useSelector((state)=>state.Course);
  const {token}=useSelector((state)=>state.Auth)
  const [categories,setcategories]=useState([]);
  const [pricefield,setpricefield]=useState(null);
  const [cat,setcat]=useState("");

  const fetchcategory=async ()=>{
    try{
      const response=await apiConnector("GET",categoryroutes.FETCHCATEGORY_API);
      console.log("FETCH CATEGORY API RESPONSE=>",response);
      setcategories(response.data.data);
    }
    catch(err){
      console.log("FETCH CATEGORY API ERROR=>",err);
    }
  }

  //importig all useforms hooks function.
  const {
    reset,
    handleSubmit,
    getValues,
    setValue,
    register,
    formState:{errors,isSubmitSuccessful}
  }=useForm();


  useEffect(()=>{

    fetchcategory();
    register("coursetype",{
      required:{value:true,message:"Choose The course Type"}   
    });
    register("tags",{
      required:{value:true,message:"Enter the Tags"}
    })
    register("requirements",{
      required:{value:true,message:"Enter requirements requirements"}
    })
    register("thumbnail",{
      required:{value:true,message:"Thumbnail required"}
    })
    register("category",{
      required:{value:true,message:"Choose a Category"},
    })



    if(editcourse){
      setValue("coursetitle",course.coursename);
      setValue("coursedescription",course.coursedescription);
      setValue("courseprice",course.price);
      setValue("tags",course.tag);
      setValue("requirements",course.instructions);
      setValue("thumbnail",course.thumbnail);
      setValue("category",course.category.name);
      setcat(course.category.name);
      console.log("===============",course.category.name);
      setValue("whatyouwilllearn",course.whatyouwilllearn);
      if(course.price===0){
        setValue("coursetype","free");
        setpricefield(false);
      }
      else{
        setValue("coursetype","paid");
        setpricefield(true);
      }
      
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  

  useEffect(()=>{

    if(isSubmitSuccessful ){
      reset({
        coursetitle:"",
        coursedescription:"",
        coursetype:"",
        courseprice:null,
        category:"",
        whatyouwilllearn:'',
        tag:[],
        requirements:[],
        thumbnail:""

      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSubmitSuccessful])

  const isformupdated=()=>{
    const curval=getValues();
    if(curval.coursetitle!==course?.coursename || curval.coursedescription!==course?.coursedescription ||
      curval.courseprice!==course?.price || curval.tags.toString()!==course?.tag.toString() ||
      curval.requirements.toString()!==course?.instructions.toString() || curval.thumbnail!==course?.thumbnail ||
      curval.category!==course?.category.name || curval.whatyouwilllearn!==course?.whatyouwilllearn ){
      return true;
    }
    else{
      return false;
    }
  }

  
  const courseinformationsubmithandler=(data)=>{
    console.log("reached inside handler")
    setpricefield(null);
    console.log("courseinformation submit data ",data);
    const formdata=new FormData();
    if(data.coursetitle!==course?.coursename ){
      formdata.append("coursename",data.coursetitle)     
    }
    if(data.coursedescription!==course?.coursedescription ){
          formdata.append("coursedescription",data.coursedescription)
    }
   
    if(data.courseprice!==course?.price ){
          formdata.append("price",data.courseprice)
    }
    if(data.tags.toString()!==course?.tag.toString()){
          formdata.append("tag",JSON.stringify(data.tags))
    } 
     
    if(data.requirements.toString()!==course?.instructions.toString()){
          formdata.append("instructions",JSON.stringify(data.requirements))
    } 
    if(data.thumbnail!==course?.thumbnail ){
          formdata.append("thumbnail",data.thumbnail)
    }
     
    if(data.category!==course?.category.name ){
          formdata.append("category",data.category)
    }
    if(data.whatyouwilllearn!==course?.whatyouwilllearn){
          formdata.append("whatyouwilllearn",data.whatyouwilllearn)
    }

    if(course){
      formdata.append("courseid",course._id);
      dispatch(updatecourse(formdata,token));
    }
    else{
      dispatch(createcourse(formdata,token))
    }


    
  }


  const onSubmit = (e) => {
    e.preventDefault();
    console.log("data sendidng while updating",getValues())
    if (!isformupdated()) {
      // If form is not updated, prevent submission and display an error
      toast.error("No fields are Updated");
      return;
    }
    // If form is updated, proceed with submission
    handleSubmit(courseinformationsubmithandler)();
  };
  


  return (
    <div>
      <form id='form' onSubmit={onSubmit} className='flex flex-col gap-5'>
        {/* coursetitle */}
        <div>
          <label htmlFor='coursetitle'>Course Title <sup className='text-red-800'>*</sup></label><br/>
          <input
            type='text'
            id='coursetitle'
            name='coursetitle'
            placeholder='Course Title'
            className='w-full rounded-sm pl-2'
            {...register("coursetitle",{
              required:{value:true,message:"Enter Course Title"}
            })}
          />
          {errors.coursetitle && <span className='text-red-800'>{errors.coursetitle.message}</span>}
        </div>

        {/*coursedescription  */}
        <div>
          <label htmlFor='coursedescription'>Course Description <sup className='text-red-800'>*</sup></label><br/>
          <textarea
            type='text'
            id='coursedescription'
            name='coursedescription'
            placeholder='Course Description'
            className='h-[120px] w-full rounded-sm pl-2'
            {...register("coursedescription",{
              required:{value:true,message:"Enter Course Description"}
            })}
          />
          {errors.coursedescription && <span className='text-red-800'>{errors.coursedescription.message}</span>}
        </div>

        {/* courseprice */}
        <div>
            <div className='flex flex-row w-[60%] justify-between'>
              <div>Course Type</div>
              <div className='flex flex-row gap-1'>
                <label htmlFor='free' >Free</label>
                <input type='radio' id='free' checked={pricefield===false} name='options' onChange={(e)=>{ if(e.target.checked){setpricefield(false);setValue("coursetype","free");setValue("courseprice",0)}}} />
              </div>
              <div className='flex flex-row gap-1'>
                <label htmlFor='paid'>Paid</label>
                <input type='radio' id='paid' checked={pricefield===true}  name='options' onChange={(e)=>{if(e.target.checked){setpricefield(true);setValue("coursetype","paid");setValue("courseprice",null)}}} />
              </div>
            </div>
            {errors.coursetype && <span className='text-red-800'>{errors.coursetype.message}</span>}
            {
              pricefield===true ? (
                <div className='relative'>
                  <label htmlFor='courseprice'>Course Price <sup className='text-red-800'>*</sup></label><br/>
                  <input
                    type='number'
                    id='courseprice'
                    name='courseprice'
                    placeholder='Course Price'
                    {...register("courseprice",{
                      required:{value:true,message:"Enter Course Price"},
                      valueAsNumber:true,
                      pattern:{value:/^(0|[1-9]\d*)(\.\d+)?$/}
                    })}
                    className='w-full rounded-sm pl-6'
                  />
                  
                  <span className='absolute left-1 mt-[5px]'><HiOutlineCurrencyRupee/></span>
                  {errors.courseprice && <span className='text-red-800'>{errors.courseprice.message}</span>}
        </div>
        ):(null)
            }
        </div>

        {/* course category */}
        <div>
          <div>Course  Category <sup className='text-red-800'>*</sup></div>
          <div>
            <select
              name='category'
              id='category'
              className='w-full rounded-sm'
              form='form'
              value={cat}
              onChange={(e)=>{setValue("category",e.target.value);setcat(e.target.value)}}
              >
              <option value="" >--------------------------------Choose a Category--------------------------------</option>
              {categories.length>0 &&  categories.map((ele,index)=>(
                <option key={index}  value={ele.name}>{ele.name}</option>
              ))}

            </select>
            {errors.category && <span className='text-red-800'>{errors.category.message}</span>}
          </div>
        </div>

        {/*  tags*/}
        <div>
          <Taginputs  setValue={setValue} reset={reset} getValues={getValues} errors={errors} isSubmitSuccessful={isSubmitSuccessful} editdata={course?.tag} />
        </div>

        {/*course thumbnail  */}
        <div className='mt-3'>
          <div>Thumbnail <sup className='text-red-800'>*</sup></div>
          <Uploadbox setValue={setValue}  errors={errors} isSubmitSuccessful={isSubmitSuccessful} formfield={"thumbnail"} editdata={course?.thumbnail}  />
        </div>

        {/* benifits of course  */}
        <div>
          <label htmlFor='whatyouwilllearn'>Benifits of Course <sup className='text-red-800'>*</sup></label><br/>
          <textarea
            type='text'
            id='whatyouwilllearn'
            name='whatyouwilllearn'
            placeholder='Course Benifits'
            className='w-full rounded-sm pl-2'
            {...register("whatyouwilllearn",{
              required:{value:true,message:"Enter Course Benifits"}
            })}
          />
          {errors.whatyouwilllearn && <span className='text-red-800'>{errors.whatyouwilllearn.message}</span>}
        </div>

        {/*requirrement /instructions  */}
        <div>
          <Requirementfield setValue={setValue} reset={reset} getValues={getValues} errors={errors} isSubmitSuccessful={isSubmitSuccessful} editdata={course?.instructions}/>
        </div>

        {/* buttons logic */}
        <div className='flex flex-row items-end justify-end'>
          
          {editcourse ? 
          (<div className='flex flex-row gap-2'>
            <div onClick={()=>dispatch(setstep(2))}>
              <Custombutton text={"Continue Without Saving"} styles={"bg-yellow-300 mt-1 text-black"}/>
            </div>
            <div >
              <Custombutton  text={"Save and Next"} styles={"bg-yellow-300 mt-1 text-black"}/>
            </div>
          </div>):
          (<div>
            <Custombutton text={"Next"} styles={"bg-yellow-300 mt-1 text-black"} />
          </div>)}

        </div>
        

      </form>
    </div>
  )
}

export default Courseinformation