import React from 'react';



export const Task = ({ task }) => {
  return (
    <li key={task.id} className="border-b border-gray-600 py-2">
      <input type="checkbox" className="mr-2" checked={task.completed} />
      {task.name}
    </li>
  );
};
