import { useState } from "react";
import { Link } from "react-router-dom";
import { accounts } from "../Database";

function Login() {
    const [thisUser, setThisUser] = useState('');
    const [thisPassword, setThisPassword] = useState('');
    
    return (
        <div>
            <hr />
            <div className="form-group">
            <h3>Login</h3>
            <span>
                Don't have an account? Register <Link to={`/Login/Register`}>here</Link>
            </span>
            </div>
            <div className="form-control">
                <h6>Email address</h6>
                <input type="text" className="" onChange={(e) => setThisUser(e.target.value)} />
            </div>
            <div>
                <h6>Password</h6>
                <input type="text" className="form-control" onChange={(e) => setThisPassword(e.target.value)}/>
            </div>
            <hr />
            <div className="float-end">
                <button className="btn">Cancel</button>
                <button className="btn btn-primary" >Login</button>
            </div>
        </div>
    );
}
export default Login;