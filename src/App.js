import { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");

  const clearTasks = () => setTasks([]);
  const addTask = () => {
    if (taskValue === "") {
      alert("Please enter a task!");
    }

    setTasks((prev) => [...prev, taskValue]);
    setTaskValue("");
  };

  console.log(tasks);

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
          <button onClick={clearTasks}>Clear</button>
        </div>

        <div className="filters">
          <button className="button1">All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>

        <ul id="tasks">
          {tasks.map((task) => {
            return <li>{task}</li>;
          })}
        </ul>

        <div>
          <p className="noTask">No tasks yet. Add one above!</p>
        </div>

        <footer>
          <p className="p1">Powered by&nbsp;&nbsp;</p>
          <p className="p2">Pinecone Academy</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
