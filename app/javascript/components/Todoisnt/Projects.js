import React, { useState } from 'react';
import inboxIcon from 'images/inbox.svg';
import chevronIcon from 'images/chevron-r.svg';
import plusIcon from 'images/plus.svg';
import { IconButton } from './IconButton';
import { Project } from './Project';

export const Projects = ({projects, setProject, selectedProject}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }  

  return (
    <section className="w-1/3">

      <IconButton
        icon={inboxIcon}
        text={"Inbox"}
        selected={!selectedProject}
        handleClick={() => setProject(null)}
      />

      <IconButton
        icon={chevronIcon}
        text={`Projects (${projects.length})`} rotate={isOpen}
        handleClick={handleOpen}
      />

      {isOpen && (
        <ul>
          {projects.map((project) => (
            <Project
              project={project}
              key={project.id}
              setProject={setProject}
              selected={selectedProject && project.id === selectedProject.id}
            />
          ))}
        </ul>
      )}

      <IconButton icon={plusIcon} text={"Create project"} />

    </section>
  );
};
