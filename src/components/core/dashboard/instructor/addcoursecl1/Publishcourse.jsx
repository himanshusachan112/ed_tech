import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setstep, resetCourseState } from '../../../../../slices/Courseslice';
import { courseroutes } from '../../../../../apis/apis';
import { apiConnector } from '../../../../../utils/Apiconnecter';
import Custombutton from '../../../../common/Custombutton';

const Publishcourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course, token } = useSelector((state) => ({
    course: state.Course.course,
    token: state.Auth.token,
  }));
  const [publish, setPublish] = useState(false);

  const lastStepHandler = async () => {
    if (publish) {
      const toastId = toast.loading("Publishing course...");
      const formdata = new FormData();
      formdata.append("courseid", course._id);
      formdata.append("status", "Published");

      try {
        await apiConnector("POST", courseroutes.UPDATECOURSE_API, formdata, {
          Authorization: `Bearer ${token}`,
        });
        toast.success("Course published successfully!");
      } catch (error) {
        toast.error("Failed to publish course.");
      } finally {
        toast.dismiss(toastId);
      }
    }

    dispatch(resetCourseState());
    navigate('/dashboard/instructor/my-courses');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3">
        <input
          id="publish"
          name="publish"
          type="checkbox"
          className="w-5 h-5 text-amber-500 accent-amber-500"
          checked={publish}
          onChange={(e) => setPublish(e.target.checked)}
        />
        <label htmlFor="publish" className="text-lg font-medium text-gray-800">
          Publish Course
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
        <Custombutton
          text="Back"
          styles="bg-yellow-300 text-black hover:bg-yellow-400"
          fun={() => dispatch(setstep(2))}
        />
        <Custombutton
          text="Save to My Courses"
          styles="bg-yellow-300 text-black hover:bg-yellow-400"
          fun={lastStepHandler}
        />
      </div>
    </div>
  );
};

export default Publishcourse;
