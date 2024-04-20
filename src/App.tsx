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
import { useEffect, useState } from 'react';
import * as client from "./Users/client";

function App() {
  const [userType, setUserType] = useState("guest");

   // Example initial user type
  const fetchProfile = async () => {
    try {
        const account = await client.profile();
        setUserType(account.role);
    } catch {
        setUserType("guest");
    }
  }
    const handleSignOut = () => {
        setUserType("guest");
    };
  useEffect(() => {
    fetchProfile();
  }, [userType]);
  return (

    <Provider store={store}>
    <HashRouter>
      <div>
      <Navigation userType={userType} />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/My-Profile" element={<Profile onSignOut={handleSignOut}/>} />
          <Route path="/My-Profile/Edit" element={<EditProfile/>} />
          <Route path="/Login-~-Signup/*" element={<Login />} />
          <Route path="/Login-~-Signup/Register" element={<Register/>} />
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