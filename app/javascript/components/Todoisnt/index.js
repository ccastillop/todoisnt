import React, { useState } from 'react'
import chevronIcon from 'images/chevron-r.svg'
import plusIcon from 'images/plus.svg'
import { Tasks } from './Tasks'
import { IconButton } from './IconButton'
import { Projects } from './Projects'

const App = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex">
      <Projects />
      <div className="w-2/3 ml-8">
        <h1 className="font-bold mb-2">Tasks</h1>
        <Tasks isCompleted={false} />
        <IconButton icon={plusIcon} text={"Add"} />
        <div onClick={handleOpen}>
          <IconButton icon={chevronIcon} text={"Hide completed"} rotate={isOpen} />
        </div>
        {isOpen && (
          <Tasks isCompleted={true} />
        )}
      </div>
    </div>
  )
}

export default App
