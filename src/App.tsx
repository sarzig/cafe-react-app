
import './App.css';
import {  HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from './Login/Register';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Login/Register" element={<Register />}/>
        </Routes>
        <Home />
      </div>
    </HashRouter>
    </Provider>
  );
}

export default App;
