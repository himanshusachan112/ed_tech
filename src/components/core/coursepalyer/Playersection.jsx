import React, { useState } from 'react';
import Playersubsection from './Playersubsection';

const Playersection = ({ section, setcurrentvideo, completedlecture }) => {
  const [showlecture, setshowlecture] = useState(false);

  return (
    <div>
      <div
        onClick={() => setshowlecture(!showlecture)}
        className="text-green-600 border-2 border-yellow-300 mt-3 rounded-sm pl-1 cursor-pointer select-none"
      >
        {section.name}
      </div>
      <div
        style={{
          maxHeight: showlecture ? '1000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        {showlecture &&
          section.subsection.map((lecture) => (
            <Playersubsection
              key={lecture._id}
              lecture={lecture}
              setcurrentvideo={setcurrentvideo}
              completedlecture={completedlecture}
            />
          ))}
      </div>
    </div>
  );
};

export default Playersection;
