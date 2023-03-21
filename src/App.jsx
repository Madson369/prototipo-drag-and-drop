import { useState } from "react";
import { MultiTables } from "./components/teste";
import "./App.css";
import { data } from "./consts";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <MultiTables data={data}></MultiTables>
    </>
  );
}

export default App;
