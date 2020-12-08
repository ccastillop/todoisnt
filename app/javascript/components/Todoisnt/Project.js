import React from 'react';

export const Project = ({ project }) => {
  const color = `bg-${project.color}-500 border-${project.color}-500`;
  return (
    <li key={project.id} className="flex items-center my-1 py-1">
      <div className={`rounded-full w-3 h-3 mx-1 border-2 ${color}`} />
      <div className="block ml-3 flex-grow">
        {project.name}
      </div>
    </li>
  );
};
