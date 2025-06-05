import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Custombutton from '../../../common/Custombutton';
import { removeFromCart, resetCart } from '../../../../slices/Cartslice';
import { useNavigate } from 'react-router-dom';
import { buynow } from '../../../../services/Paymentservices';

const Mycart = () => {
  const { cart, total, totalItems } = useSelector((state) => state.Cart);
  const { token } = useSelector((state) => state.Auth);
  const { profile } = useSelector((state) => state.Profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buynowhandler = async () => {
    try {
      await dispatch(buynow(cart, token, profile, navigate));
      dispatch(resetCart());
    } catch (err) {
      console.error("Buy Now Failed", err);
    }
  };

  return (
    <div className="bg-black dark:bg-slate-900 min-h-screen text-white">
      <div className="text-yellow-400 font-bold text-3xl text-center pt-6">
        Welcome to your Cart
      </div>
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
        {/* Cart Items */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 text-xl">Your cart is empty.</div>
          ) : (
            cart.map((course) => (
              <div
                key={course._id}
                className="flex flex-col md:flex-row gap-4 border-2 border-yellow-500 rounded-md p-4 bg-slate-800"
              >
                <img
                  className="w-full md:w-48 h-auto object-cover rounded"
                  src={course.thumbnail}
                  alt="Course Thumbnail"
                />
                <div className="flex flex-col gap-2 text-white">
                  <h3 className="text-2xl font-semibold">{course.coursename}</h3>
                  <p className="text-sm text-gray-300">{course.coursedescription}</p>
                  <span className="text-green-400 font-semibold">{`Price: ₹${course.price}`}</span>
                  <span className="text-blue-400 italic">
                    {`By ${course.instructor.firstname} ${course.instructor.lastname}`}
                  </span>
                  <div>
                    <Custombutton
                      text="Remove Item"
                      styles="bg-yellow-300 text-black hover:bg-yellow-400"
                      fun={() => dispatch(removeFromCart(course._id))}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-20 bg-slate-700 text-white p-6 border-2 border-yellow-300 rounded-md shadow-md flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-yellow-300">Cart Summary</h3>
            <p className="text-lg">{`Total Items: ${totalItems}`}</p>
            <p className="text-lg">{`Total Price: ₹${total}`}</p>
            <Custombutton
              text="Checkout Now"
              styles="bg-red-600 w-full text-white hover:bg-red-700"
              fun={buynowhandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mycart;
