import React from 'react';

const Playersubsection = ({ lecture, setcurrentvideo, completedlecture }) => {
  const isCompleted = completedlecture?.includes(lecture?._id);

  return (
    <div
      onClick={() => setcurrentvideo(lecture)}
      className="flex flex-row items-center cursor-pointer"
    >
      <input
        type="checkbox"
        checked={isCompleted}
        readOnly
        className="mt-1"
      />
      <div className="text-xl ml-3 text-black bg-yellow-700 mt-1 pl-1 rounded-sm w-full">
        {lecture.title}
      </div>
    </div>
  );
};

export default Playersubsection;
