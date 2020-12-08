import React from 'react';

export const IconButton = ({ icon, text, rotate=false }) => {
  const rotateClass = rotate ? "rotate-90" : ""
  return (
    <div className="flex mb-2 cursor-pointer">
      <img src={icon} className={`mr-2 transition-transform transform ${rotateClass}`} />
      {text}
    </div>
  );
};
