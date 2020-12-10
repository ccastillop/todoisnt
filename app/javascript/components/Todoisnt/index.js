import React, { useState, useEffect } from 'react'
import chevronIcon from 'images/chevron-r.svg'
import plusIcon from 'images/plus.svg'
import { Tasks } from './Tasks'
import { IconButton } from './IconButton'
import { Projects } from './Projects'

const App = () => {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState()
  const [tasks, setTasks] = useState([])
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

  const getTasks = () => {
    const task_url = selectedProject ? `/tasks.json?project_id=${selectedProject.id}` : "/tasks.json"
    fetch(task_url)
    .then(res => res.json())
    .then((results) => {
      setTasks(results)
    })
  }
  
  const getProjects = () => {
    const projects_url = "/projects.json"
    fetch(projects_url)
    .then(res => res.json())
    .then((results) => {
      setProjects(results)
    })
  }

  const setNewProject = (name) => {
    const task_url = `/projects.json`
    fetch(task_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        project: {name: name}
      })
    })
    .then(res => res.json())
    .then((response) => {
      console.log(response)
      getProjects()
    })
  }

  const handleCompletedOpen = () => {
    setIsCompletedOpen(!isCompletedOpen)
  }

  const handleSetProject = (project) => {
    setSelectedProject(project)
    console.log(project)
  }

  const toggleCompleted = (task) => {
    const task_url = `/tasks/${task.id}.json`
    fetch(task_url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        task: {completed: !task.completed}
      })
    })
    .then(res => res.json())
    .then(getTasks)
  }
  
  useEffect(getTasks,[selectedProject])

  useEffect(getProjects,[])

  return (
    <div className="flex">
      <Projects projects={projects}
        setProject={(project)=>handleSetProject(project)}
        selectedProject={selectedProject}
        setNewProject={setNewProject}
      />
      <div className="w-2/3 ml-8">
        <h1 className="font-bold mb-2">
          {`${selectedProject ? selectedProject.name : ""} Tasks`}
        </h1>
        <Tasks 
          tasks={tasks.filter(task => !task.completed)}
          toggleCompleted={toggleCompleted}
        />
        <IconButton icon={plusIcon} text={"Add"} />
        <IconButton
          icon={chevronIcon}
          text={ isCompletedOpen ? "Hide completed" : "Show completed"}
          rotate={isCompletedOpen}
          handleClick={handleCompletedOpen}
        />
        {isCompletedOpen && (
          <Tasks
            tasks={tasks.filter(task => task.completed)}
            toggleCompleted={toggleCompleted}
          />
        )}
      </div>
    </div>
  )
}

export default App
