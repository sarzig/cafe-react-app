import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../reducer";
import React, { useState } from "react";
import { WebsiteState } from "../../../store";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = {
        _id: "admin@coffeehouse.org",
        firstName: "Coffee",
        lastName: "Admin",
        password: "admin",
        userRole: "admin",
        history: []
    };
    const [thisFirstName, setThisFirstName] = useState(user.firstName);
    const [thisLastName, setThisLastName] = useState(user.lastName);
    const [thisEmail, setThisEmail] = useState(user._id);
    const [thisPassword, setThisPassword] = useState(user.password);
    const handleSave = () => {
        const updatedAccount = {_id: thisEmail, firstName: thisFirstName, lastName: thisLastName, }
        dispatch(updateAccount(updatedAccount));
        navigate(`#/My-Profile`);
    };
    const showPassword = () => {
        var x = document.getElementById("password_box") as HTMLInputElement;
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    };
    
    return (
        <div className="flex-container form-control">
            <h3>Profile</h3>
            <div className="row">
                <div className="col-sm">
                <span>
                    <img src="logo192.png" className="rounded-circle shadow-4-strong"/>
                </span>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-5">
                        <h6>First Name:</h6>
                        <input type="text" className="form-control" onChange={(e) => setThisFirstName(e.target.value)} defaultValue={user.firstName} />
                        </div>
                        <div className="col-md-5">
                        <h6>Last Name:</h6>
                        <input type="text" className="form-control" onChange={(e) => setThisLastName(e.target.value)} defaultValue={user.lastName} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-10">
                        <h6>Email:</h6>
                        <input type="text" className="form-control" onChange={(e) => setThisEmail(e.target.value)} defaultValue={user._id}/>
                        <br />
                        <h6>Password:</h6>
                        <input type="password" id="password_box" className="form-control" defaultValue={user.password} />
                        <input type="checkbox" id="show_password" onChange={showPassword}/> &nbsp;
                        <label htmlFor="show_password">Show password</label>
                        </div>
                    </div>
                <br />
                
                </div> 
                <span className="">
                    <button className="btn btn-primary float-end" onClick={handleSave}>Save</button> &nbsp;
                    <a href="#/My-Profile" className="btn btn-light float-end">Cancel</a>
                </span>
                <br /><br />
            </div>
        </div>
    );
};
