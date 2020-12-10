import React from 'react';

export const Task = ({ task, handleCompleted }) => {
  return (
    <li key={task.id} className="border-b border-gray-600 py-2">
      <input
        name="completed"
        type="checkbox"
        className="mr-2"
        checked={task.completed}
        onChange={handleCompleted}
      />
      {task.name}
    </li>
  );
};
