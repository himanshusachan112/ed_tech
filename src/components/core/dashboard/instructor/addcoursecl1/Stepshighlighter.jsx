import React from 'react';

const steps = [
  { id: 1, label: 'Course Information' },
  { id: 2, label: 'Course Builder' },
  { id: 3, label: 'Publish' },
];

const StepsHighlighter = ({ step }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full px-4">
      {steps.map((s, index) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center relative">
            <div
              className={`rounded-full border-2 p-2 w-10 h-10 flex items-center justify-center font-bold transition-all duration-300 
              ${step >= s.id ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-400 text-gray-500'}`}
            >
              {s.id}
            </div>
            <span className="text-sm text-center mt-1 w-24 sm:w-auto">
              {s.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden sm:block w-24 h-[2px] bg-gray-400 mx-2 relative">
              <div
                className={`absolute top-0 left-0 h-full transition-all duration-300 
                ${step > s.id ? 'bg-amber-500 w-full' : 'bg-gray-400 w-0'}`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepsHighlighter;
