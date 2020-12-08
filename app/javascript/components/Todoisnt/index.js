import React from 'react'
import inboxIcon from 'images/inbox.svg'
import chevronIcon from 'images/chevron-r.svg'
import plusIcon from 'images/plus.svg'

const tasks = [
  { id: 1, name: "Task 01", completed: false },
  { id: 2, name: "Task 02", completed: false },
  { id: 3, name: "Task 03", completed: false },
  { id: 4, name: "Task 04", completed: false },
  { id: 5, name: "Task 05", completed: true },
  { id: 6, name: "Task 06", completed: true },
  { id: 7, name: "Task 07", completed: true },
  { id: 8, name: "Task 08", completed: true },
]

const projects = [
  { id: 1, name: "Project 01", color:"green" },
  { id: 2, name: "Project 02", color:"blue" },
  { id: 3, name: "Project 03", color:"red" },
  { id: 4, name: "Project 04", color:"pink" },
]

const IconButton = ({icon, text}) => {
  return (
    <div className="flex mb-2 cursor-pointer">
      <img src={icon} className="mr-2" />
      { text }
    </div>
  )
}

const Projects = (props) => {
  return (
    <section className="w-1/3">
      <IconButton icon={inboxIcon} text={"Inbox"} />
      <IconButton icon={chevronIcon} text={"Projects"} />
      <ul>
        {projects.map((project) => (
            <Project project={project} key={project.id} />
          ))
        }
      </ul>
      <IconButton icon={plusIcon} text={"Create project"} />
    </section>
  )
}

const Project = ({project}) => {
  const color = `bg-${project.color}-500 border-${project.color}-500`
  return (
    <li key={project.id} className="flex items-center my-1 py-1">
      <div className={`rounded-full w-3 h-3 mx-1 border-2 ${color}`} />
      <div className="block ml-3 flex-grow">
        {project.name}
      </div>
    </li>
  )
}


const Task = ({task}) => {
  return(
    <li key={task.id} className="border-b border-gray-600 py-2">
      <input type="checkbox" className="mr-2" checked={task.completed} />
      {task.name}
    </li>
  )  
}

const Tasks = ({completed}) => {
  return (
    <section>
      <ul className="mb-4">
        {tasks
          .filter( task => task.completed === completed)
          .map((task) => (
            <Task task={task} key={task.id} />
          ))
        }
      </ul>
    </section>
  )
}


const App = (props) => {
  return (
    <div className="flex">
      <Projects />
      <div className="w-2/3 ml-8">
        <h1 className="font-bold mb-2">Tasks</h1>
        <Tasks completed={false} />
        <IconButton icon={plusIcon} text={"Add"} />
        <IconButton icon={chevronIcon} text={"Hide completed"} />
        <Tasks completed={true} />
      </div>
    </div>
  )
}

export default App
