import { useState, useEffect } from "react";
import "./App.css";

function App() {
 const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
 const [task, setTask] = useState("");
 
 useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <h1>React Task Manager</h1>
          <p>Organize your tasks and stay productive.</p>
        </header>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="statistics">

          <div className="stat-card">
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h2>{pendingTasks}</h2>
            <p>Pending</p>
          </div>

        </div>

        <div className="task-container">

          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <p className="empty">
              No tasks yet. Add your first task!
            </p>
          ) : (
            tasks.map((item) => (
              <div
                className={`task-item ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >

                <div className="task-left">

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />

                  <span>{item.title}</span>

                </div>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

        <footer>
          React Task Manager © 2026
        </footer>

      </div>
    </div>
  );
}

export default App;