import { useState } from "react";
import { Link } from "react-router-dom";
import { users } from "../../Database";
import {
    addAccount,
    deleteAccount,
    updateAccount,
    setAccount,
} from "./reducer";
import { User } from "../client";
import * as client from "../client";
import { WebsiteState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [credentials, setCredentials] = useState<User>({ _id: "", full_name: "", image: "",
    email: "", password: "", hometown: "", bio: "", interests: [], favorite_cafe_days: [],
    favorite_drinks: [], favorite_menu_items: [], favorite_recipes: [], role: "guest"});
    const [thisUser, setThisUser] = useState('');
    const [thisPassword, setThisPassword] = useState('');
    const userList = useSelector((state: WebsiteState) => 
        state.usersReducer.users);
    const user = useSelector((state: WebsiteState) => 
        state.usersReducer.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function login() { 
        for (var user of users) {
         if (thisUser == user._id) {
           if (thisPassword == user.password) {
             //set account of current session to be the user
             navigate(`/Home`);
             return;
           }
           else {
             alert("Incorrect password.");
             return;
           }
         }
        }
        if (window.confirm("Email address not found. Would you like to create an account?")) {
         navigate(`/Login/Register`);
        }
    }
    function goHome() {
        navigate(`/Home`);
    }
    const signin = async () => {
        try {
          await client.signin(credentials);
          navigate(`/Home`);
        } catch (error) {
          console.error("Sign-in failed:", error);
        }
    }
    return (
        <div className="mt-5 pt-5">
            <div className="form-control">
            <h3>Login</h3>
            <div className="mb-2">
                Don't have an account? Register <Link to={`/Login/Register`}>here</Link>
            </div>
            
            <div className="form-group mb-1">
                <h6>Email address</h6>
                <input type="text" className="form-control" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
            </div>
            <div className="mb-5">
                <h6>Password</h6>
                <input type="text" className="form-control mb-2" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                <div className="float-end">
                <button className="btn" onClick={() => goHome()}>Cancel</button>
                <button className="btn btn-primary" onClick={signin}>Login</button>
            </div>
            </div>
            
            </div>
        </div>
    );
};