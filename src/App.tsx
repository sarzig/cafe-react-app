
import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Navigation from './Navigation';
import Profile from './Profile';
import Login from './Login';
import Menu from './Menu';
import Admin from './Admin';

function App() {
  return (
    <HashRouter>
      <div>
      <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/My-Profile" element={<Profile/>} />
          <Route path="/Login/*" element={<Login/>} />
          <Route path="/Menu/*" element={<Menu/>} />
          <Route path="/Admin-Tools/*" element={<Admin/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
