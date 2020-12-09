import React from 'react';

export const Project = ({ project, setProject, selected=false }) => {
  const color = `bg-${project.color}-500 border-${project.color}-500`;
  const classes = `flex items-center my-1 py-1 cursor-pointer ${selected ? "bg-gray-200" : "" }`

  return (
    <li key={project.id}
      className={classes}
      onClick={() => setProject(project)}>
      <div className={`rounded-full w-3 h-3 mx-1 border-2 ${color}`} />
      <div className="block ml-3 flex-grow">
        {project.name}
      </div>
    </li>
  );
};
