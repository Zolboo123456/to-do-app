import { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const clearTasks = () => setTasks([]);

  const addTask = () => {
    if (taskValue.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: Date.now(),
      value: taskValue,
      status: "active",
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskValue("");
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "active" ? "completed" : "active",
            }
          : task
      )
    );
  };

  const filteredTasks =
    filterValue === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterValue);

  return (
    <div className="appWrapper">
      <div className="App">
        <h2>To-Do list</h2>

        <div className="task-manager">
          <input
            type="text"
            maxLength={100}
            placeholder="Add a new task..."
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
          {tasks.length > 0 && <button onClick={clearTasks}>Clear</button>}
        </div>

        <div className="filters">
          {["all", "active", "completed"].map((filter) => (
            <button
              key={filter}
              style={{
                backgroundColor: filterValue === filter && "#3c82f6",
                color: filterValue === filter && "#fff",
                transition: "0.3s ease",
              }}
              onClick={() => setFilterValue(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="noTask">No tasks yet. Add one above!</div>
        )}

        <ul id="tasks">
          {filteredTasks.map((task) => (
            <div className="section" key={task.id}>
              <div className="taskuud">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => toggleTaskStatus(task.id)}
                />
                <li className="task">{task.value}</li>
              </div>
              <button className="deleteOne">Delete</button>
            </div>
          ))}
        </ul>

        <footer>
          <p className="p1">Powered by&nbsp;&nbsp;</p>
          <p className="p2">Zolboo</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
