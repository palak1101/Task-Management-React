import React, { useState } from "react";
import "./styles.css";
import "./animate.css";

import TaskList from "./features/tasklist.js";
import TaskForm from "./features/taskform";

const DEFAULT_STATE = [
  { id: 1, title: "Learn JS", completed: true, category: "complete" },
  { id: 2, title: "Learn React", completed: true, category: "complete" },
  { id: 3, title: "Learn Node.js", completed: false, category: "wip" },
  { id: 4, title: "Learn Angular", completed: false, category: "wip" },
  { id: 5, title: "Master Full Stack", completed: false, category: "wip" }
];

//tO make it more readable-
// function TaskList({ tasks }) {
//   return tasks.map((task) => {
//     return (
//       <div>
//         <h2>{task.title}</h2>
//       </div>
//     );
//   });
// }

function App() {
  const [tasks, setTasks] = useState(DEFAULT_STATE);
  const [form, showTaskForm] = useState(false);

  const onShowTaskForm = () => {
    // alert(form);
    showTaskForm((prev) => !prev);
  };

  const onAddTask = (title) => {
    // alert(title);
    let newTask = {
      id: +new Date(),
      title: title,
      completed: "false",
      category: "wip"
    };

    setTasks([...tasks, newTask]);
    onShowTaskForm(); //taskform hides if it is true
  };

  //to segregate
  let ui = {
    wip: [],
    complete: []
  };

  tasks.forEach((t) => {
    ui[t.category].push(t);
  });

  console.log("Categories: ", ui);

  //to drag and drop
  const onDragStart = (e, id) => {
    console.log("onDragStart", id);
    e.dataTransfer.setData("text/plain", id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, cat) => {
    console.log("Dropped", cat);
    let id = e.dataTransfer.getData("text/plain");

    let updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        task.completed = !task.completed;
        task.category = cat;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <TaskForm show={form} onHide={onShowTaskForm} onNewTask={onAddTask} />
      </div>
      <div className="row">
        <h2 className="app-header">
          TASK APP
          <button
            type="button"
            class="btn btn-primary"
            onClick={onShowTaskForm}
          >
            ADD
          </button>
        </h2>

        <div
          className="col-md-9"
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, "wip");
          }}
        >
          <h6 className="wip-header">WORK IN PROGRESS</h6>
          <div className="wrapper taskline-wip">
            <TaskList tasks={ui.wip} onDragStart={onDragStart} />
          </div>
        </div>

        <div
          className="col-md-3 completed-section droppable"
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, "complete");
          }}
        >
          <div className="row">
            <h6 className="completed-header mb-0">COMPLETE</h6>
          </div>

          <div className="row taskline-c">
            <TaskList tasks={ui.complete} onDragStart={onDragStart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
