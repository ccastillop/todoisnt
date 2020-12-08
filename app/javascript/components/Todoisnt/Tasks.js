import React from 'react';
import { tasks } from "./constants";
import { Task } from "./Task";

export const Tasks = ({ isCompleted }) => {
  return (
    <section>
      <ul className="mb-4">
        {tasks
          .filter(task => task.completed === isCompleted)
          .map((task) => (
            <Task task={task} key={task.id} />
          ))}
      </ul>
    </section>
  );
};
