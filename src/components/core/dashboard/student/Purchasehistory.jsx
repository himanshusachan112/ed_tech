import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiConnector } from '../../../../utils/Apiconnecter';
import { courseroutes } from '../../../../apis/apis';
import { useSelector } from 'react-redux';

const Purchasehistory = () => {
  const { token } = useSelector((state) => state.Auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPurchasedCourses = async () => {
    const toastId = toast.loading('Loading purchased courses...');
    setLoading(true);
    try {
      const response = await apiConnector(
        'POST',
        courseroutes.GETENROLLEDCOURSES_API,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) throw new Error(response.data.message);
      setCourses(response.data.data.courses);
      toast.success(response.data.message, { id: toastId });
    } catch (err) {
      console.error('Error fetching purchased courses:', err);
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const paidCourses = courses.filter((course) => course.price > 0);

  return (
    <div className="bg-black min-h-screen p-6">
      <h2 className="text-yellow-400 font-bold text-3xl text-center mb-6">
        Your Purchased Courses
      </h2>

      {loading ? (
        <p className="text-yellow-300 text-center">Loading courses...</p>
      ) : paidCourses.length === 0 ? (
        <p className="text-red-500 text-center">No purchased courses found.</p>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {paidCourses.map((course) => (
            <div
              key={course._id}
              className="flex gap-4 border-2 border-red-600 rounded-md p-4 bg-slate-900"
            >
              <img
                src={course.thumbnail}
                alt={course.coursename}
                className="w-48 h-40 object-cover rounded"
              />
              <div className="flex flex-col text-white text-lg gap-2">
                <h3 className="font-semibold">{course.coursename}</h3>
                <p className="text-slate-300">{course.coursedescription}</p>
                <p className="text-green-500 font-semibold">{`Price ₹ ${course.price}`}</p>
                <p className="text-blue-500 italic">{`by ${course.instructor.firstname} ${course.instructor.lastname}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchasehistory;
