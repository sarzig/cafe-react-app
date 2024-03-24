import { useState } from "react";
import { Link } from "react-router-dom";
import { accounts } from "../Database";

function Login() {
    const [thisUser, setThisUser] = useState('');
    const [thisPassword, setThisPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [thisFirstName, setThisFirstName] = useState('');
    const [thisLastName, setThisLastName] = useState('');
    
    return (
        <div>
            <hr />
            Register
            <span>
                Have an account? Login <Link to={`/Login`}>here</Link>
            </span>
            <div>
                First Name
                <input type="text" className="form-control" onChange={(e) => setThisFirstName(e.target.value)}/>
                Last Name
                <input type="text" className="form-control" onChange={(e) => setThisLastName(e.target.value)}/>
            </div>
            Email
            <input type="text" className="form-control" onChange={(e) => setThisUser(e.target.value)} />
            Password
            <input type="text" className="form-control" onChange={(e) => setThisPassword(e.target.value)}/>
            Re-Type Password
            <input type="text" className="form-control" onChange={(e) => setPasswordCheck(e.target.value)}/>
            <hr />
            <div className="float-end">
                <button className="btn">Cancel</button>
                <button className="btn btn-primary" >Login</button>
            </div>
        </div>
    );
};