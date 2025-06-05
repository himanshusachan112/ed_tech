import React, { useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Custombutton from '../../../../../common/Custombutton';
import Subsection from './Subsection';
import { deletesection } from '../../../../../../services/Courseservices';
import { useDispatch, useSelector } from 'react-redux';
import Subsectionmodal from './Subsectionmodal';

const Section = ({ section, editsection, seteditsection }) => {

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.Auth);

  const [subsectionmodal, setsubsectionmodal] = useState(null);
  const [showsubsection, setshowsubsection] = useState(false);
  const [viewmode, setviewmode] = useState(false);
  const [editmode, seteditmode] = useState(false);
  const [createmode, setcreatemode] = useState(false);

  const addlecturehandler = () => {
    setcreatemode(true);
  }

  return (
    <>
      <div className='p-2 bg-sky-400 rounded-md mt-2'>
        {/* Section Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
          <div 
            className='text-xl font-semibold cursor-pointer' 
            onClick={() => setshowsubsection(!showsubsection)}
          >
            {section.name}
          </div>

          {/* Action Icons */}
          <div className='flex flex-row gap-4 mt-2 sm:mt-0'>
            <AiFillEdit
              onClick={(e) => {
                e.preventDefault();
                seteditsection(section._id);
              }}
              className='text-xl cursor-pointer hover:text-yellow-800'
            />
            <RiDeleteBin5Fill
              onClick={(e) => {
                e.preventDefault();
                dispatch(deletesection(course._id, section._id, token));
              }}
              className='text-xl cursor-pointer hover:text-red-700'
            />
          </div>
        </div>

        {/* Subsections */}
        {showsubsection && (
          <div className='mt-4 space-y-3'>
            <div
              onClick={addlecturehandler}
              className='flex flex-row items-center gap-2 bg-yellow-300 w-fit rounded-md px-2 py-1 cursor-pointer'
            >
              <Custombutton text={"Add Lecture"} />
              <IoMdAdd className='text-xl mt-1' />
            </div>

            <div className='flex flex-col gap-2'>
              {section.subsection.map((subsection, index) => (
                <Subsection
                  key={index}
                  sectionid={section._id}
                  seteditmode={seteditmode}
                  setviewmode={setviewmode}
                  subsection={subsection}
                  subsectionmodal={subsectionmodal}
                  setsubsectionmodal={setsubsectionmodal}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {(subsectionmodal || createmode) && (
        <Subsectionmodal
          sectionid={section._id}
          viewmode={viewmode}
          setviewmode={setviewmode}
          editmode={editmode}
          seteditmode={seteditmode}
          createmode={createmode}
          setcreatemode={setcreatemode}
          subsectionmodal={subsectionmodal}
          setsubsectionmodal={setsubsectionmodal}
        />
      )}
    </>
  )
}

export default Section
