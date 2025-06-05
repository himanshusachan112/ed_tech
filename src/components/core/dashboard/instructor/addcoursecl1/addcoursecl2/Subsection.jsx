import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deletesubsection } from '../../../../../../services/Courseservices';

const Subsection = ({
  subsection,
  setviewmode,
  seteditmode,
  subsectionmodal,
  setsubsectionmodal,
  sectionid
}) => {

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.Auth);

  return (
    <div className='flex items-center justify-between bg-yellow-300 px-3 py-2 rounded-md shadow-sm'>
      {/* Title */}
      <div
        className='w-full font-medium cursor-pointer'
        onClick={() => {
          setviewmode(true);
          setsubsectionmodal(subsection);
        }}
      >
        {subsection.title}
      </div>

      {/* Edit / Delete */}
      <div className='flex items-center gap-3 ml-4 text-lg'>
        <AiFillEdit
          onClick={() => {
            seteditmode(true);
            setsubsectionmodal(subsection);
          }}
          className='cursor-pointer hover:text-yellow-700'
        />
        <RiDeleteBin5Fill
          onClick={() =>
            dispatch(deletesubsection(course._id, sectionid, subsection._id, token))
          }
          className='cursor-pointer hover:text-red-600'
        />
      </div>
    </div>
  );
};

export default Subsection;
