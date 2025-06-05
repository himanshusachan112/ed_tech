import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiConnector } from '../../../../utils/Apiconnecter';
import { courseroutes } from '../../../../apis/apis';
import { useNavigate } from 'react-router-dom';

const Enrolledcourses = () => {
  const { token } = useSelector((state) => state.Auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const enrolledcourses = async () => {
    const toastId = toast.loading('Loading enrolled courses...');
    setLoading(true);
    try {
      const response = await apiConnector(
        'POST',
        courseroutes.GETENROLLEDCOURSES_API,
        {},
        { Authorization: `Bearer ${token}` }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setCourses(response.data.data.courses);
      toast.success(response.data.message, { id: toastId });
    } catch (err) {
      console.error('GET ENROLLED COURSES ERROR:', err);
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    enrolledcourses();
  }, []);

  return (
    <div className="bg-black min-h-screen p-6">
      <h2 className="text-yellow-400 font-bold text-3xl text-center mb-6">Enrolled Courses</h2>

      {loading ? (
        <div className="text-yellow-300 text-center">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="text-red-500 text-center">
          No enrolled courses found. Please check back later.
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/student/courseplayer/${course._id}`)}
              className="flex cursor-pointer gap-4 border-2 border-yellow-400 bg-slate-800 rounded-md p-4 hover:bg-yellow-900 transition"
            >
              <img
                src={course.thumbnail}
                alt={course.coursename}
                className="w-40 h-24 object-cover rounded"
              />
              <div className="flex flex-col justify-center text-yellow-300">
                <h3 className="text-xl font-semibold">{course.coursename}</h3>
                <p className="text-sm opacity-80">{course.coursedescription}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrolledcourses;
