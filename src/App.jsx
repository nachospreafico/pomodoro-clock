import { useState } from "react";
import "./App.css";
import PomodoroClock from "./PomodoroClock";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PomodoroClock />
    </>
  );
}

export default App;
