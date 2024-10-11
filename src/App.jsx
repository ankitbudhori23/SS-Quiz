import { HashRouter , Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <HashRouter >
        <Routes>
          <Route path="/" element={<Start />} />
        </Routes>
      </HashRouter >
    </div>
  );
}
