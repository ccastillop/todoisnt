import React, { useState, useEffect } from 'react'
import chevronIcon from 'images/chevron-r.svg'
import plusIcon from 'images/plus.svg'
import { Tasks } from './Tasks'
import { IconButton } from './IconButton'
import { Projects } from './Projects'

const App = () => {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false)
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false)
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState()
  const projects_url = "/projects.json"

  const [isTasksLoaded, setIsTasksLoaded] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const task_url = selectedProject ? `/tasks.json?project_id=${selectedProject.id}` : "/tasks.json"
    fetch(task_url)
    .then(res => res.json())
    .then((results) => {
      setIsTasksLoaded(true)
      setTasks(results)
    })
  },[selectedProject])

  useEffect(() => {
    fetch(projects_url)
    .then(res => res.json())
    .then((results) => {
      setIsProjectsLoaded(true)
      setProjects(results)
    })
  },[])

  const handleCompletedOpen = () => {
    setIsCompletedOpen(!isCompletedOpen)
  }

  const handleSetProject = (project) => {
    setSelectedProject(project)
  }
  
  return (
    <div className="flex">
      <Projects projects={projects}
        setProject={(project)=>handleSetProject(project)}
        selectedProject={selectedProject} />
      <div className="w-2/3 ml-8">
        <h1 className="font-bold mb-2">Tasks</h1>
        <Tasks tasks={tasks.filter(task => !task.completed)} />
        <IconButton icon={plusIcon} text={"Add"} />
        <div onClick={handleCompletedOpen}>
          <IconButton icon={chevronIcon} text={"Hide completed"} rotate={isCompletedOpen} />
        </div>
        {isCompletedOpen && (
          <Tasks tasks={tasks.filter(task => task.completed)} />
        )}
      </div>
    </div>
  )
}

export default App
