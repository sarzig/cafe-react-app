import { setAccount } from "../reducer";

export default function EditProfile() {
    const userId = "admin@coffeehouse.org"
    const account = setAccount(userId);
    return (
        <div className="mt-5 pt-5 form-control">
            <h3>Profile</h3>
            <div>
                <span>
                    <img src="logo192.png" alt="Profile photo." className="rounded-circle shadow-4-strong"/>
                </span>
                <span className="px-5 fs-3">
                    Coffee Admin
                </span>
                <span>
                <a className="btn btn-light" href="#/Profile/Edit">Edit Profile</a>
                </span>
                <hr />
                <span className="">
                    <button className="btn btn-primary float-end">Save</button>
                    <button className="btn btn-light float-end">Cancel</button>
                </span>
                <hr className="mt-5 pt-3" />
            </div>
        </div>
    );
};