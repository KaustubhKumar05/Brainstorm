import { Route, Routes } from "react-router-dom";
import Editor from "./Editor";
import Home from "./Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doc/:slug" element={<Editor />} />
    </Routes>
  );
}

export default App;
