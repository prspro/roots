import "./App.css";
import ForceTree from "./components/ForceTree/ForceTree";
import Generations from "./components/Generations/Generations";
import Tree from "./components/Tree/Tree";

function App() {
  return (
    <div className="App">
      <Generations />
      {/* <Tree /> */}
      <ForceTree />
    </div>
  );
}

export default App;
