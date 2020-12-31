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
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [form, setForm] = useState({ name: "" })
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")

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

  const setNewTask = (name) => {
    const task_url = `/tasks.json`
    const payload = {
      task: {
        name: name, 
        project_id: selectedProject ? selectedProject.id : null
      }
    }
    fetch(task_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then((response) => {
      console.log(response)
      getTasks()
    })
  }

  const handleCompletedOpen = () => {
    setIsCompletedOpen(!isCompletedOpen)
  }

  const handleSetProject = (project) => {
    setSelectedProject(project)
    console.log(project)
  }

  const handleShowAddNewTaskForm = () => {
    if (!showNewTaskForm) setForm({})
    setShowNewTaskForm(!showNewTaskForm)
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

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setForm( prevForm => Object.assign({}, prevForm, {[name]:value} ))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowNewTaskForm(false)
    setNewTask(form.name)
  }

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
        { showNewTaskForm 
        ? 
          (
            <form className="form my-4" onSubmit={handleSubmit}>
              <div className="field">
                <input
                  className="w-full"
                  placeholder="Add a Task"
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
                    Add Task
                  </button>
                </div>
                <div>
                  <div
                    className="btn btn-secondary block cursor-pointer"
                    onClick={handleShowAddNewTaskForm} >
                    Cancel
                  </div>
                </div>
              </div>
            </form>
          )
        : 
          (
            <IconButton icon={plusIcon} text={"Add"} handleClick={handleShowAddNewTaskForm} />
          )
        }
        
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
