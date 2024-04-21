import { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Users/client";
import { User } from "../Users/client";
import { Link } from "react-router-dom";
import { MdInsertLink } from "react-icons/md";

export default function UserTable(role: any) {

    const [filterRole, setFilterRole] = useState("CUSTOMER");

    const fetchUsersByRole = async (filterRole: string) => {
        const users = await client.findUsersByRole(filterRole);
        setFilterRole(role);
        setUsers(users);
    };
    const [users, setUsers] = useState<User[]>([]);
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
        role: "CUSTOMER",
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
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
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
                    value={role || "CUSTOMER"}
                    className="form-control w-25 float-end">
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                    <option value="OWNER">Owner</option>
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
                                value={user.hometown}
                                placeholder="Visit Days"
                                onChange={(e) => setUser({ ...user, hometown: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.interests}
                                placeholder="Interests"
                                onChange={(e) => setUser({ ...user, hometown: e.target.value })}
                            />
                        </td>
                        <td>
                            <select className="form-control"
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="ADMIN">Admin</option>
                                <option value="Owner">OWNER</option>
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