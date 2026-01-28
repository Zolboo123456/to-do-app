import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./App.css";

const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(storedTasks);
  const [taskValue, setTaskValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const clearTasks = () => {
    if (window.confirm("Do you really want to delete all the tasks?")) {
      setTasks(() => {
        localStorage.removeItem("tasks");
        return [];
      });
    }
  };

  const addTask = (e) => {
    e.preventDefault();

    if (taskValue.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: uuidv4(),
      value: taskValue,
      status: "active",
    };

    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setTaskValue("");
  };

  const filteredTasks =
    filterValue === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterValue);

  const handleToggle = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "active" ? "completed" : "active",
            }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleDeleteCompleted = () => {
    if (window.confirm("Do you really want to delete all completed tasks?")) {
      setTasks((prev) => {
        const updatedTasks = prev.filter((task) => task.status === "active");
        if (updatedTasks.length === 0) {
          localStorage.removeItem("tasks");
        } else {
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }

        return updatedTasks;
      });
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id);
      if (updatedTasks.length === 0) {
        localStorage.removeItem("tasks");
      } else {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
      return updatedTasks;
    });
  };

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div id="app-container">
      <div id="card">
        <h1>To-Do List</h1>

        <form onSubmit={addTask}>
          <div id="task-manager">
            <input
              type="text"
              maxLength={100}
              placeholder="Add a new task..."
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
            />
            <button type="submit">Add</button>
            {tasks.length > 0 && (
              <button type="button" onClick={clearTasks}>
                Clear
              </button>
            )}
          </div>
        </form>

        <div id="filter">
          <button
            style={{
              backgroundColor: filterValue === "all" && "#3c82f6",
              color: filterValue === "all" && "#fff",
            }}
            onClick={() => setFilterValue("all")}
          >
            All
          </button>
          <button
            style={{
              backgroundColor: filterValue === "active" && "#3c82f6",
              color: filterValue === "active" && "#fff",
            }}
            onClick={() => setFilterValue("active")}
          >
            Active
          </button>
          <button
            style={{
              backgroundColor: filterValue === "completed" && "#3c82f6",
              color: filterValue === "completed" && "#fff",
            }}
            onClick={() => setFilterValue("completed")}
          >
            Completed
          </button>
        </div>

        {tasks.length === 0 && (
          <div id="no-task">No tasks yet. Add one above!</div>
        )}

        <div id="tasks">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => handleToggle(task.id)}
              />
              <p
                style={{
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none",
                }}
              >
                {task.value}
              </p>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>

        <div id="summary">
          <div>
            {tasks.length > 0 &&
              `${completedCount} / ${tasks.length} tasks completed.`}
          </div>
          {completedCount > 0 && (
            <button onClick={handleDeleteCompleted}>Clear Completed</button>
          )}
        </div>

        <p id="footer-text">
          Powered By{" "}
          <a
            href="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg"
            target="_blank"
            rel="noreferrer"
          >
            Zolboo
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
