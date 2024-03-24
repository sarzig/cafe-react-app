
import './App.css';
import {  HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
        </Routes>
        <Home />
      </div>
    </HashRouter>
  );
}

export default App;
