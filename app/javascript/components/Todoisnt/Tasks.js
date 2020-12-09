import React, { useState, useEffect } from 'react';
import { Task } from "./Task";

export const Tasks = ({ tasks }) => {
  return (
    <section>
      <ul className="mb-4">
        {tasks
          .map((task) => (
            <Task task={task} key={task.id} />
          ))}
      </ul>
    </section>
  );
};
