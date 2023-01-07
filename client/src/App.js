import { Route, Routes } from "react-router-dom";
import TextEditor from "./TextEditor";
import Home from "./Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doc/:slug" element={<TextEditor />} />
    </Routes>
  );
}

export default App;
