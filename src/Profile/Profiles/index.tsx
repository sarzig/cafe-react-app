import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import "./index.css";
import * as client from "../../Users/client";
import { User } from "../../Users/client";
import nameGenerator from "./Functions/nameGenerator";
import imageGenerator from "./Functions/imageGenerator";
import { BsTrash3Fill, BsPencil, BsPerson } from "react-icons/bs";


const Profiles = ({ userType }: { userType: string }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>();

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteProfile = (user: User) => {
        setUser(user);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        setShowConfirmation(false);

        if (user) {
            deleteUser(user);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleEditProfile = (user: User) => {
        navigate(`/Profile/Edit/${user._id}`);
    };

    const handleSeeUserProfile = (user: User) => {
        navigate(`/Profile/${user._id}`);
    };

    const buttonRow = (user: User) => (
        <div className="row">
            {(userType === "admin") && (
                <>
                    <div
                        className="col text-center reactive-col green-reactive-col"
                        title="See user"
                        onClick={() => handleSeeUserProfile(user)}
                    >
                        <BsPerson className="icon see" />
                    </div>
                    <div
                        className="col text-center reactive-col red-reactive-col"
                        title="Delete user"
                        onClick={() => handleDeleteProfile(user)}
                    >
                        <BsTrash3Fill className="icon delete" />
                    </div>
                    <div
                        className="col text-center reactive-col gray-reactive-col"
                        title="Edit user"
                        onClick={() => handleEditProfile(user)}
                    >
                        <BsPencil className="icon edit" />
                    </div>
                </>
            )}
            {(userType === "owner") && (
                <>
                    <div
                        className="col text-center reactive-col green-reactive-col"
                        title="See user"
                        onClick={() => handleSeeUserProfile(user)}
                    >
                        <BsPerson className="icon see" />
                    </div>
                    <div
                        className="col text-center reactive-col red-reactive-col"
                        title="Delete user"
                        onClick={() => handleDeleteProfile(user)}
                    >
                        <BsTrash3Fill className="icon delete" />
                    </div>
                </>
            )}
            {(userType === "guest" || userType === "customer") && (
                <>
                    <div className="col text-center reactive-col green-reactive-col"
                        title="See user"
                        onClick={() => handleSeeUserProfile(user)}>
                        <BsPerson className="icon see" />
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div>
            <div className="heading-div">
                <h1>All Profiles</h1>
            </div>

            <div>
                {showConfirmation && (
                    <div className="popup">
                        <div className="row">
                            <p>
                                Are you sure you want to delete user "{user?.full_name}"?<br /><br />This action cannot be undone.
                            </p>
                        </div>
                        <div className="button-container">
                            <div className="row justify-content-center">
                                <div className="col button-col">
                                    <button className="delete-button classy-button popup-button" onClick={handleConfirmDelete}>
                                        Confirm Delete
                                    </button>
                                    <button className="classy-button popup-button" onClick={handleCancelDelete}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="row row-cols-1 row-cols-md-5 justify-content-center">
                {users.map((user) => (
                    <div key={user._id} className="col" style={{ width: 350 }}>
                        <div className="card flex-shrink-0">
                            <Link className="card-image" to={`/profiles/${user._id}`}>
                                <img src={imageGenerator(userType, user)} alt="user" className="card-img-top" />
                            </Link>
                            {buttonRow(user)}
                            <div className="card-body">
                                <Link className="card-title" to={`/profiles/${user._id}`}>
                                    {nameGenerator(userType, user)}
                                </Link>
                                <div className="card-details">
                                    <span className="category">Hometown: </span>
                                    <span className="detail">{user.hometown}</span>
                                    <br />
                                    <span className="category">Favorite Drinks: </span>
                                    <span className="detail">{user.favorite_drinks?.join(", ")}</span>
                                    <br />
                                    <span className="category">Visits Sakivi on: </span>
                                    <span className="detail">{user.favorite_cafe_days?.join(", ")}</span>
                                    <br />
                                    <span className="category">Interests: </span>
                                    <span className="detail">{user.interests?.join(", ")}</span>
                                    <br />
                                    <span className="category">Bio: </span>
                                    <span className="detail">{user.bio}</span>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        </div >
    );
};

export default Profiles;
