import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Users/Login";
import Register from './Users/Login/Register';
import { Provider } from "react-redux";
import store from "./store";
import Navigation from './Navigation';
import Profiles from './Profile/Profiles';
import Profile from './Users/Profile';
import EditProfile from './Users/Profile/Edit';
import Menu from './Menu';
import Admin from './Admin';

function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <div>
      <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Profile/Edit" element={<EditProfile/>} />
          <Route path="/Login/*" element={<Login/>} />
          <Route path="/Login/Register" element={<Register/>} />
          <Route path="/Menu/*" element={<Menu/>} />
          <Route path="/Admin-Tools/*" element={<Admin/>} />
          <Route path="/All-Profiles" element={<Profiles/>} />"
        </Routes>
      </div>
    </HashRouter>
    </Provider>
  );
}

export default App;