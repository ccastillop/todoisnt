import React, { useState } from 'react';
import { Task } from "./Task";

export const Tasks = ({ tasks, toggleCompleted }) => {

  const handleCompleted = (task) => {
    toggleCompleted(task)
  }
  
  return (
    <section>
      <ul className="mb-4">
        {tasks
          .map((task) => (
            <Task
              task={task}
              key={task.id}
              handleCompleted={() => handleCompleted(task)}
            />
          ))}
      </ul>
    </section>
  );
};
