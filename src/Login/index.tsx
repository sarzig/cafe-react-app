import { useState } from "react";
import { Link } from "react-router-dom";
import { accounts } from "../Database";
import {
    addAccount,
    deleteAccount,
    updateAccount,
    setAccount,
} from "./reducer";
import { WebsiteState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Login() {
    const [thisUser, setThisUser] = useState('');
    const [thisPassword, setThisPassword] = useState('');
    const accountList = useSelector((state: WebsiteState) => 
        state.accountsReducer.accounts);
    const account = useSelector((state: WebsiteState) => 
        state.accountsReducer.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function login() { 
        for (var account of accounts) {
         if (thisUser == account._id) {
           if (thisPassword == account.password) {
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
    return (
        <div className="mt-5 pt-5">
            <div className="form-control">
            <h3>Login</h3>
            <div className="mb-2">
                Don't have an account? Register <Link to={`/Login/Register`}>here</Link>
            </div>
            
            <div className="form-group mb-1">
                <h6>Email address</h6>
                <input type="text" className="form-control" placeholder={account._id} onChange={(e) => setThisUser(e.target.value)} />
            </div>
            <div className="mb-5">
                <h6>Password</h6>
                <input type="text" className="form-control mb-2" placeholder={account.password} onChange={(e) => setThisPassword(e.target.value)}/>
                <div className="float-end">
                <button className="btn" onClick={() => goHome()}>Cancel</button>
                <button className="btn btn-primary" onClick={() => login()}>Login</button>
            </div>
            </div>
            
            </div>
        </div>
    );
}
export default Login;