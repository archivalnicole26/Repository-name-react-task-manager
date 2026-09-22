import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add a task
  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTask("");
  };

  // Complete / uncomplete a task
  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== id)
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">✓</div>

          <div>
            <h2>FocusFlow</h2>
            <span>Task Manager</span>
          </div>
        </div>

        <nav>
          <div className="nav-item active">
            <span>▦</span>
            Dashboard
          </div>

          <div className="nav-item">
            <span>✓</span>
            My Tasks
          </div>

          <div className="nav-item">
            <span>★</span>
            Completed
          </div>
        </nav>

        <div className="sidebar-footer">
          <p>Stay focused.</p>
          <strong>Get things done.</strong>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="top-header">

          <div>
            <p className="welcome">WELCOME BACK 👋</p>

            <h1>Task Manager</h1>

            <p className="subtitle">
              Plan your day. Complete your goals. Stay productive.
            </p>
          </div>

          <div className="date-box">
            <span>Today</span>

            <strong>
              {new Date().toLocaleDateString()}
            </strong>
          </div>

        </header>

        {/* Add Task */}
        <section className="add-card">

          <div className="add-title">

            <div className="plus-icon">+</div>

            <div>
              <h2>Create a new task</h2>

              <p>
                What do you want to accomplish?
              </p>
            </div>

          </div>

          <div className="task-input">

            <input
              type="text"
              placeholder="Enter your task..."
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

        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">

            <div className="stat-icon total">
              ▦
            </div>

            <div>
              <span>Total Tasks</span>
              <strong>{totalTasks}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon completed">
              ✓
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon pending">
              ◷
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingTasks}</strong>
            </div>

          </div>

        </section>

        {/* My Tasks */}
        <section className="tasks-card">

          <div className="section-heading">

            <div>
              <h2>My Tasks</h2>

              <p>
                Your personal productivity list
              </p>
            </div>

            <span className="task-count">
              {totalTasks}{" "}
              {totalTasks === 1 ? "task" : "tasks"}
            </span>

          </div>

          {tasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                Your task list is empty
              </h3>

              <p>
                Add your first task above and start
                getting things done.
              </p>

            </div>

          ) : (

            <div className="task-list">

              {tasks.map((item) => (

                <div
                  className={`task-item ${
                    item.completed ? "completed" : ""
                  }`}
                  key={item.id}
                >

                  <label className="task-left">

                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() =>
                        toggleTask(item.id)
                      }
                    />

                    <span className="custom-check"></span>

                    <span className="task-title">
                      {item.title}
                    </span>

                  </label>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

        <footer>
          <p>
            FocusFlow • Simple tools for better productivity
          </p>
        </footer>

      </main>

    </div>
  );
}

export default App;