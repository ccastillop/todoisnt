import React, { useState } from 'react';
import inboxIcon from 'images/inbox.svg';
import chevronIcon from 'images/chevron-r.svg';
import plusIcon from 'images/plus.svg';
import { IconButton } from './IconButton';
import { Project } from './Project';

export const Projects = ({projects, setProject, selectedProject, setNewProject}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [form, setForm] = useState({ name: "" })

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  
  const handleNewFormOpen = () => {
    setIsNewOpen(!isNewOpen)
  }

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm( prevForm => Object.assign({}, prevForm, {[name]:value} ))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsNewOpen(false)
    setNewProject(form.name)
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

    {isNewOpen 
      ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              className="w-full"
              placeholder="Add a project"
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="actions mt-2 flex">
            <div>
              <button
                name="button"
                type="submit"
                className="btn btn-primary block"
              >
                Add Project
              </button>
            </div>
            <div>
              <div
                className="btn btn-secondary block cursor-pointer"
                onClick={handleNewFormOpen} >
                Cancel
              </div>
            </div>
          </div>
        </form>
      )
      : (
      <IconButton icon={plusIcon} text={"Create project"} handleClick={handleNewFormOpen} />
    )}
    </section>
  );
};
