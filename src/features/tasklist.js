import React from "react";

function TaskList({ tasks, onDragStart }) {
  return tasks.map((task) => {
    let classNames = `${task.completed ? "complete" : "incomplete"}`;
    return (
      <div
        key={task.id}
        className={`task ${task.category}`}
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}
        // onDragOver={}
      >
        <h2 className="mt-1 mb-1 pl-2">{task.title}</h2>
      </div>
    );
  });
}

export default TaskList;
