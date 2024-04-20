import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
//import * as client from "./client";
//import { User } from "./client";

import usersData from '../Database/users.json'; // xxx delete this later

export default function UserTable() {
    // xxx - temporary for creation of page, delete later
    // create User type:
    type User = {
        _id: string;
        full_name: string;
        email: string;
        password: string;
        image: string;
        birthdate: string;
        hometown: string;
        bio: string;
        interests: [];
        favorite_cafe_days: [];
        favorite_cafe_drinks: [];
        favorite_menu_items: [];
        favorite_recipes: [];
        role: string;
    };
    const [users, setUsers] = useState(usersData); // Initialize users state with data from users.json
    const [user, setUser] = useState<User>({
        _id: "",
        full_name: "",
        email: "",
        password: "",
        image: "",
        birthdate: "",
        hometown: "",
        bio: "",
        interests: [],
        favorite_cafe_days: [],
        favorite_cafe_drinks: [],
        favorite_menu_items: [],
        favorite_recipes: [],
        role: "CUSTOMER",
    });


    // from kiersten's code - keep
    const [role, setRole] = useState("CUSTOMER");

    // xxx un-comment this:
    /*

    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
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
        _id: "", email: "", password: "", firstName: "",
        lastName: "", role: "CUSTOMER"
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
    */

    return (
        <div>
            <select
                //onChange={(e) => fetchUsersByRole(e.target.value)}
                value={role || "CUSTOMER"}
                className="form-control w-25 float-end">
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
            </select>
            <h3>User Table</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username / Email</th>
                        <th>Full Name</th>
                        <th>Hometown</th>
                        <th>Visit Days</th>
                        <th>Interests</th>
                        <th>Role</th>
                        <th>Modify</th>
                    </tr>
                    <tr>
                        <td className="text-nowrap">
                            <input
                                className="form-control"
                                value={user.email}
                                placeholder="email / email"
                            //onChange={(e) => setUser({ ...user, email: e.target.value })} 
                            />
                            <input
                                className="form-control"
                                value={user.password}
                                placeholder="password"
                            //onChange={(e) => setUser({ ...user, password: e.target.value })} 
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.full_name}
                                placeholder="Full Name"
                            //onChange={(e) => setUser({ ...user, full_name: e.target.value })} 
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.hometown}
                                placeholder="hometown"
                            //onChange={(e) => setUser({ ...user, hometown: e.target.value })} 
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.hometown}
                                placeholder="Visit Days"
                            //onChange={(e) => setUser({ ...user, hometown: e.target.value })} 
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.interests}
                                placeholder="Interests"
                            //onChange={(e) => setUser({ ...user, hometown: e.target.value })} 
                            />
                        </td>

                        <td>
                            <select className="form-control"
                                value={user.role}
                            //onChange={(e) => setUser({ ...user, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td>
                            <BsFillCheckCircleFill
                                //onClick={updateUser}
                                className="me-2 text-success fs-1 text"
                            />
                            <BsPlusCircleFill
                                //onClick={createUser}
                                className="me-2 text-success fs-1 text" />

                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.full_name}</td>
                            <td>{user.hometown}</td>
                            <td>{user.favorite_cafe_days.join(', ')}</td>
                            <td>{user.interests.join(', ')}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-danger me-2"
                                //onClick={() => deleteUser(user)}
                                >
                                    <BsTrash3Fill />
                                </button>
                                <button
                                    className="btn btn-warning me-2"
                                //onClick={() => selectUser(user)}
                                >
                                    <BsPencil />
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}