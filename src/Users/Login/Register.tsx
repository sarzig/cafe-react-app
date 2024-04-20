import { useState } from "react";
import { Link } from "react-router-dom";
import { users } from "../../Database";
import { WebsiteState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAccount } from "./reducer";

function Register() {
    const [thisUser, setThisUser] = useState('');
    const [thisPassword, setThisPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [thisFirstName, setThisFirstName] = useState('');
    const [thisLastName, setThisLastName] = useState('');
    const navigate = useNavigate();
    const accountList = useSelector((state: WebsiteState) => 
        state.usersReducer.users);
    const account = useSelector((state: WebsiteState) => 
        state.usersReducer.user);
    const dispatch = useDispatch();
    function checkExistence() {
        for (var user of users) {
            if (thisUser == user._id) {
                return true;
            }
        }
        return false;
    }
    function createAccount() {
        if (account.checkExistence) {
            if (window.confirm("This email is already in use. Login instead?")) {
                navigate(`/Login-~-Signup`);
            }
        }
        else {
            const accountInfo: { [key: string]: any} = {};
            accountInfo._id = thisUser;
            if (thisPassword == passwordCheck && thisPassword != "") {
                accountInfo.password = thisPassword;
            }
            else if (thisPassword == "") {
                alert("Password cannot be blank. Try again.");
                return;
            }
            else {
                alert("Passwords do not match. Try again.");
                return;
            }
            accountInfo.firstName = thisFirstName;
            accountInfo.lastName = thisLastName;
            accountInfo.userRole = "customer";
            dispatch(addAccount(accountInfo));
            alert("Success! Account created.");
            navigate(`/Home`);
        }
    }
    function goHome() {
        navigate(`/Home`);
    }
    return (
        <div className="form-control mt-5 pt-5">
            <h3>Register</h3>
            <div className="mb-2">
                Have an account? Login <Link to={`/Login-~-Signup`}>here</Link>
            </div>
            <div className="form-group mb-1 flex-container">
                <div className="row">
                <div className="col">
                First Name
                <input type="text" className="form-control" placeholder={account.firstName} onChange={(e) => setThisFirstName(e.target.value)}/>
                </div>
                <div className="col">
                Last Name
                <input type="text" className="form-control" placeholder={account.lastName} onChange={(e) => setThisLastName(e.target.value)}/>
                </div>
                </div>
            </div>
            <div className="form-group mb-1">
            <h6>Email address</h6>
            <input type="text" className="form-control" placeholder={account._id} onChange={(e) => setThisUser(e.target.value)} />
            </div>
            <div className="form-group mb-1">
            <h6>Password</h6>
            <input type="text" className="form-control" placeholder={account.password} onChange={(e) => setThisPassword(e.target.value)}/>
            </div>
            <div className="form-group mb-5">
            <h6>Re-type Password</h6>
            <input type="text" className="form-control" placeholder={account.password} onChange={(e) => setPasswordCheck(e.target.value)}/>
            <div className="float-end mt-2">
                <button className="btn" onClick={() => goHome()}>Cancel</button>
                <button className="btn btn-primary" onClick={() => createAccount()}>Register</button>
            </div>
            </div>
            
            
        </div>
    );
}
export default Register;