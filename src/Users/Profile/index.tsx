export default function Profile() {
    const user = {
        "_id": "admin@coffeehouse.org",
        "firstName": "Coffee",
        "lastName": "Admin",
        "password": "admin",
        "userRole": "admin",
        "history": []
    };
    return (
        <div className="mt-5 pt-5 form-control">
            <h3>Profile</h3>
            <div>
                <span>
                    <img src="logo192.png" alt="Profile photo." className="rounded-circle shadow-4-strong"/>
                </span>
                <span className="px-5 fs-3">
                     {user.firstName} {user.lastName}
                </span>
                <span>
                <a className="btn btn-light" href="#/My-Profile/Edit">Edit Profile</a>
                </span>
                <hr />
            </div>
        </div>
    );
};