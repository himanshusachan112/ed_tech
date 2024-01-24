import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Custombutton from '../../../common/Custombutton';
import { removeFromCart, resetCart } from '../../../../slices/Cartslice';
import { useNavigate } from 'react-router-dom';
import { buynow } from '../../../../services/Paymentservices';
import { apiConnector } from '../../../../utils/Apiconnecter';

const Mycart = () => {

  const {cart,total,totalItems}=useSelector((state)=>state.Cart);
  const {token}=useSelector((state)=>state.Auth);
  const {profile}=useSelector((state)=>state.Profile);
  const dispatch=useDispatch();
  const  navigate=useNavigate();
 

  const buynowhandler=async()=>{
    const newprofile=await apiConnector("POST",)
    dispatch(buynow(cart,token,profile,navigate));
    dispatch(resetCart())
  }



  return (
    <div className='bg-black h-full'>
      <div className='text-slate-600 font-bold text-3xl text-center pt-4'>
        Welcome to your Cart
      </div>
      <div className='flex flex-row '>
        <div className='w-1/2 flex flex-col gap-6 pl-6 p-1'>
          {cart.map((course)=>(
            <div className='flex flex-row gap-3 border-2 border-red-600 rounded-sm p-1'>
              <div>
                <img className='w-[12rem] h-fit object-cover' src={course.thumbnail} alt=''/>
              </div>
              <div className='text-white text-xl flex flex-col gap-1'>
                <div>
                  {course.coursename}
                </div>
                <div>
                  {course.coursedescription}
                </div>
                <div className='text-green-500'>
                {`Price ₹ ${course.price}`}
                </div>
                <div className='text-blue-600 italic'>
                  {`by ${course.instructor.firstname + " "+ course.instructor.lastname}`}
                </div>
                <div onClick={()=>dispatch(removeFromCart(course._id))}>
                  <Custombutton text={"Remove Item"} styles={"bg-yellow-300 text-black"}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-1/2' >
          <div className='fixed mt-6 ml-60 bg-slate-600 text-green-500 p-6 px-20 flex flex-col gap-3 border-2 border-yellow-300 rounded-sm'>
            <div className='text-xl'>
              {`Total Items ${totalItems}`}
            </div>
            <div className='text-xl '>
              {`Total Price ₹ ${total}`}
            </div>
            <div >
              <Custombutton text={"Checkout Now"} styles={"bg-red-600 w-full text-white"} fun={buynowhandler}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Mycart