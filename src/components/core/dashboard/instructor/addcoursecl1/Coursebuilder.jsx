import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from "react-icons/io";
import { createsection, updatesection } from '../../../../../services/Courseservices';
import { setstep, seteditcourse } from '../../../../../slices/Courseslice';
import Section from './addcoursecl2/Section';
import Custombutton from '../../../../common/Custombutton';

const Coursebuilder = () => {
  const dispatch = useDispatch();
  const { course, editcourse } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.Auth);
  const [editsection, seteditsection] = useState(null);

  const gobackhandler = () => {
    dispatch(setstep(1));
    dispatch(seteditcourse(true));
  };

  const addsectionhandler = (e) => {
    if (e.key === "Enter") {
      const name = e.target.value.trim();
      if (!name) return;

      if (!editsection) {
        dispatch(createsection(name, course._id, token));
      } else {
        dispatch(updatesection(name, course._id, editsection, token));
        seteditsection(null);
      }
      e.target.value = "";
    }
  };

  return (
    <div className="text-white">
      {/* Add/Edit Section */}
      <div className="mb-4">
        <label htmlFor="section" className="flex items-center gap-2 text-lg font-medium">
          {editsection ? "Edit Section" : "Add Section"} {!editsection && <IoMdAdd />}
        </label>
        <input
          id="section"
          placeholder={editsection ? "Enter new name & press Enter" : "Enter section name & press Enter"}
          className="w-1/2 mt-1 p-2 rounded-sm text-black"
          onKeyDown={addsectionhandler}
        />
        {editsection && (
          <div
            className="inline-block bg-yellow-300 text-black px-2 py-1 mt-2 rounded cursor-pointer text-sm"
            onClick={() => seteditsection(null)}
          >
            Cancel Edit
          </div>
        )}
      </div>

      {/* Section List */}
      <div className="flex flex-col gap-3 mb-4">
        {course.sections.map((section, index) => (
          <Section
            key={index}
            section={section}
            editsection={editsection}
            seteditsection={seteditsection}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
        <Custombutton
          text="Go Back"
          fun={gobackhandler}
          styles="bg-yellow-300 text-black"
        />
        <Custombutton
          text="Next"
          fun={() => dispatch(setstep(3))}
          styles="bg-yellow-300 text-black"
        />
      </div>
    </div>
  );
};

export default Coursebuilder;
