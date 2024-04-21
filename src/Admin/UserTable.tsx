import { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Users/client";
import { User } from "../Users/client";
import { Link } from "react-router-dom";
import { MdInsertLink } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

// xxx todo: user table doesn't auto update when interests or visit days are updated

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function UserTable() {

    const [filterRole, setFilterRole] = useState("customer");


    const fetchUsersByRole = async (filterRole: string) => {
        const users = await client.findUsersByRole(filterRole);
        setFilterRole(filterRole);
        setUsers(users);
    };
    const [users, setUsers] = useState<User[]>([]);
    const [stringCafeDays, setStringCafeDays] = useState("");
    const [stringInterests, setStringInterests] = useState("");

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const [user, setUser] = useState<User>({
        _id: "",
        full_name: "",
        email: "",
        password: "",
        image: "",
        hometown: "",
        bio: "",
        interests: [],
        favorite_cafe_days: [],
        favorite_drinks: [],
        favorite_menu_items: [],
        favorite_recipes: [],
        role: "customer",
    });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
            setStringCafeDays(u.favorite_cafe_days.join(", "));
            setStringInterests(u.interests.join(", "));

        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            // Parse stringCafeDays into an array of days
            const parsedCafeDays = stringCafeDays.split(",").map((day) => day.trim());
            const parsedInterests = stringInterests.split(",").map((day) => day.trim());

            // Update user object with parsed favorite_cafe_days
            const updatedUser = { ...user, favorite_cafe_days: parsedCafeDays, interests: parsedInterests};
            const status = await client.updateUser(updatedUser);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);


    return (
        <div>
            <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                User Table
                <select
                    onChange={(e) => fetchUsersByRole(e.target.value)}
                    value={filterRole}
                    className="form-control w-25 float-end">
                    <option value="all">Select user role</option> {/* Default placeholder option */}
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                </select>
                <Link to="/All-Profiles" className="btn btn-info">
                    See all profiles in card view
                </Link>
            </h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Username / Email</th>
                        <th>Full Name</th>
                        <th>Hometown</th>
                        <th>Visit Days</th>
                        <th>Interests</th>
                        <th>Role</th>
                        <th>Delete</th>
                        <th>Modify</th>
                        <th>Link</th>
                    </tr>
                    <tr>
                        <td className="text-nowrap">
                            <input
                                className="form-control"
                                value={user.email}
                                placeholder="Username / email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            <input
                                className="form-control"
                                value={user.password}
                                placeholder="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.full_name}
                                placeholder="Full Name"
                                onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.hometown}
                                placeholder="hometown"
                                onChange={(e) => setUser({ ...user, hometown: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={stringCafeDays}
                                placeholder="Visit Days"
                                onChange={(e) => setStringCafeDays(e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={stringInterests}
                                placeholder="Interests"
                                onChange={(e) => setStringInterests(e.target.value)}
                            />
                        </td>
                        <td>
                            <select className="form-control"
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value.toLowerCase() })}
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                                <option value="owner">Owner</option>
                            </select>
                        </td>
                        <td>
                        </td>
                        <td>
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                className="me-2 text-success fs-1 text"
                                title="Modify the Selected user with these attributes"
                            />
                            <BsPlusCircleFill
                                onClick={createUser}
                                className="me-2 text-success fs-1 text"
                                title="Add NEW user with these attributes"
                            />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>
                                {user.email}
                            </td>
                            <td>{user.full_name}</td>
                            <td>{user.hometown}</td>
                            <td>{user.favorite_cafe_days.join(', ')}</td>
                            <td>{user.interests.join(', ')}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-danger me-2"
                                    title="Delete this user"
                                    onClick={() => deleteUser(user)}
                                >
                                    <BsTrash3Fill />
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    title="Edit this user"
                                    onClick={() => selectUser(user)}
                                >
                                    <BsPencil />
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-info" title={`See ${user.email}'s profile`}>
                                    <Link
                                        to={`/profiles/${user._id}`}
                                        title={`See ${user.email}'s profile`}>
                                        <MdInsertLink />
                                    </Link>
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div >
    );
}