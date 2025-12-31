import "./App.css";

const App = () => {
  return (
    <div className="appWrapper">
      <div className="App">
        <h2>To-Do list</h2>

        <div className="main">
          <input placeholder="Add a new task ..." />
          <button>Add</button>
        </div>

        <div className="filters">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>

        <footer>
          <p className="p1">Powered by</p>
          <p className="p2">Pinecone Academy</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
