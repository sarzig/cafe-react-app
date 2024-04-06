import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../reducer";
import React, { useState } from "react";
import { WebsiteState } from "../../../store";

export default function EditProfile() {
    const dispatch = useDispatch();
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
                        <input type="text" className="form-control" defaultValue={user.firstName} />
                        </div>
                        <div className="col-md-5">
                        <h6>Last Name:</h6>
                        <input type="text" className="form-control" defaultValue={user.lastName} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-10">
                        <h6>Email:</h6>
                        <input type="text" className="form-control" defaultValue={user._id}/>
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
