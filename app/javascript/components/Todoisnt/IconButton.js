import React from 'react';

export const IconButton = ({ icon, text, rotate=false, handleClick, selected=false }) => {
  const rotateClass = rotate ? "rotate-90" : ""
  const activeClass = selected ? "bg-gray-200" : ""
  return (
    <div className={`flex mb-2 cursor-pointer ${activeClass}`} onClick={handleClick}>
      <img src={icon} className={`mr-2 transition-transform transform ${rotateClass}`} />
      {text}
    </div>
  );
};
