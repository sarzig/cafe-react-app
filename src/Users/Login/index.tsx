import { useState } from "react";
import { Link } from "react-router-dom";
import { users } from "../../Database";
import { User } from "../client";
import * as client from "../client";
import { WebsiteState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../App.css";


export default function Login({ onSignIn }: any) {
    const [credentials, setCredentials] = useState<User>({
        _id: "", full_name: "", image: "",
        email: "", password: "", hometown: "", bio: "", interests: [], favorite_cafe_days: [],
        favorite_drinks: [], favorite_menu_items: [], favorite_recipes: [], role: "guest"
    });
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
            navigate(`/Login-~-Signup/Register`);
        }
    }
    const showPassword = () => {
        var x = document.getElementById("password_box") as HTMLInputElement;
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    };
    function goHome() {
        navigate(`/Home`);
    }
    const signin = async () => {
        try {
            await client.signin(credentials);
            onSignIn();
            navigate(`/Home`);
        } catch (error) {
            alert("Sign-in failed. Please check your email address and password and try again. If you do not have an account, register at the link below.");
        }
    }

    return (
        <>
            <div className="heading-div">
                <h1>Login</h1>
            </div>
            <div className="login-register-box">
            <div className="">
                    <div className="mb-2">
                        Don't have an account? Register <Link to={`/Login-~-Signup/Register`}>here</Link>.
                    </div>

                    <br />

                    <div className="form-group mb-1">
                        <h6>Email address</h6>
                        <input type="text" className="form-control" placeholder="email@domain.com" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                    </div>

                    <br />

                    <div className="mb-5">
                        <h6>Password</h6>
                        <input type="password" id="password_box" className="form-control mb-2" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                        
                        <br />

                        <input type="checkbox" id="show_password" onChange={showPassword} /> &nbsp;
                        
                        <label htmlFor="show_password">Show password</label>
                        <div className="float-end">
                            <button className="btn cancel-button-important" onClick={() => goHome()}>Cancel</button>
                            <button className="btn btn-primary register-button-important" onClick={signin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};