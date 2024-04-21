import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as client from "../client";

function Register({onSignIn}: any) {
    const [credentials, setCredentials] = useState({ full_name: "",
    email: "", password: "", role: "customer"});
    const [thisPassword, setThisPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const navigate = useNavigate();
    
    async function signUp(user: any) {
        try {
            await client.signup(user);
            await client.signin({...credentials, _id: "", image: "", hometown: "", bio: "", 
            interests: [], favorite_cafe_days: [], favorite_drinks: [], favorite_menu_items: [], favorite_recipes: []});
            alert("Success! Account created.");
            onSignIn();
            navigate(`/Home`);
        } catch (error) {
            if (window.confirm("This email is already in use. Login instead?")) {
                navigate(`/Login-~-Signup`);
            }
        }
    };
    function createAccount() {
        if (credentials.email === "") {
            alert("Email cannot be blank. Try again.");
            return;
        }
        if (thisPassword == passwordCheck && thisPassword != "") {
            setCredentials({...credentials, password: thisPassword})
        }
        else if (thisPassword == "") {
            alert("Password cannot be blank. Try again.");
            return;
        }
            else {
                alert("Passwords do not match. Try again.");
                return;
            }
            signUp(credentials);
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
            <div className="form-group mb-1">
            <h6>Name:</h6>
            <input type="text" className="form-control" placeholder="John Smith" onChange={(e) => setCredentials({...credentials, full_name: e.target.value})}/>
            </div>
            <div className="form-group mb-1">
            <h6>Email address</h6>
            <input type="text" className="form-control" placeholder="email@domain.com" onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
            </div>
            <div className="form-group mb-1">
            <h6>Password</h6>
            <input type="text" className="form-control" placeholder="Password"onChange={(e) => setThisPassword(e.target.value)}/>
            </div>
            <div className="form-group mb-5">
            <h6>Re-type Password</h6>
            <input type="text" className="form-control" placeholder="Password" onChange={(e) => setPasswordCheck(e.target.value)}/>
            <div className="float-end mt-2">
                <button className="btn" onClick={() => goHome()}>Cancel</button>
                <button className="btn btn-primary" onClick={() => createAccount()}>Register</button>
            </div>
            </div>
        </div>
    );
}
export default Register;