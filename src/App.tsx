import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Navigation from './Navigation';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
        </Routes>
        <Navigation />
        <Home />
      </div>
    </HashRouter>
  );
}

export default App;