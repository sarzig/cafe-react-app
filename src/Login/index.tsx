import { useState } from "react";
import { Link } from "react-router-dom";
import { accounts } from "../Database";

function Login() {
    const [thisUser, setThisUser] = useState('');
    const [thisPassword, setThisPassword] = useState('');
    
    return (
        <div>
            <hr />
            Login
            <span>
                Don't have an account? Register <Link to={`/Login/Register`}>here</Link>
            </span>
            Email
            <input type="text" className="form-control" onChange={(e) => setThisUser(e.target.value)} />
            Password
            <input type="text" className="form-control" onChange={(e) => setThisPassword(e.target.value)}/>
            <hr />
            <div className="float-end">
                <button className="btn">Cancel</button>
                <button className="btn btn-primary" >Login</button>
            </div>
        </div>
    );
};