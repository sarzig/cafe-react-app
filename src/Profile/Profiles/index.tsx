import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import "./index.css";
import * as client from "../../Users/client";
import { User } from "../../Users/client";

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
        navigate(`/Profiles/Edit/${user._id}`);
    };

    const handleSeeUserProfile = (user: User) => {
        navigate(`/Profiles/${user._id}`);
    };

    function nameGenerator(profile: any) {

        if (userType !== "guest") {
            // If user isn't guest, then just show real names
            return profile.full_name;
        }

        else if (profile.favorite_drinks && profile.favorite_drinks.length > 0) {
            // If user is guest, then show anonymous name based on favorite drink
            return "Anonymous " + profile.favorite_drinks[0] + " Drinker";


        } else {
            // If there are no favorite drinks, generate a silly noun
            const sillyNouns = ["Cafe Goer", "Awesome Friend", "Serious Goofball", "Hipster Wannabe", "Introvert", "Extrovert", "Public Universal Friend"]
            // Generate a random index to select a silly noun
            const randomIndex = Math.floor(Math.random() * sillyNouns.length);
            // Return "Anonymous" followed by the selected silly noun
            return `Anonymous ${sillyNouns[randomIndex]}`;
        }
    }

    function imageGenerator(profile: any) {

        // Check if profile.favorite_drink exists and is not empty
        if (profile.image && userType !== "guest") {
            // Return the first element of the favorite_drink array
            return `/images/profiles_pages/${profile.image}`;

        } else {

            const minNumber = 1;
            const maxNumber = 9;

            const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
            const anonymousImages = [`anonymous${randomNumber}.jpg`];
            return `/images/profiles_pages/${anonymousImages[0]}`;
        }
    }

    return (
        <div>
            <h1>Boston Profiles</h1>
            <hr />
            <div>
                {showConfirmation && (
                    <div className="popup">
                        <div className="row">
                            <p>
                                Are you sure you want to delete this user?<br />This action cannot be undone.
                            </p>
                        </div>
                        <div className="button-container">
                            <div className="row">
                                <div className="col button-col">
                                    <button className="delete-button classy-button popup-button" onClick={handleConfirmDelete}>
                                        Confirm Delete
                                    </button>
                                </div>
                                <div className="col button-col">
                                    <button className="classy-button popup-button" onClick={handleCancelDelete}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="row row-cols-1 row-cols-md-5 g-200 justify-content-center">
                {users.map((user) => (
                    <div key={user._id} className="col" style={{ width: 350 }}>
                        <div className="card flex-shrink-0">
                            <Link className="card-image" to={`/profiles/${user._id}`}>
                                <img src={imageGenerator(user)} alt="user" className="card-img-top" />
                            </Link>
                            <div className="card-body">
                                <Link className="card-title" to={`/profiles/${user._id}`}>
                                    {nameGenerator(user)}
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
                                </div>
                                {userType === "admin" || userType === "owner" || userType === "user" || userType === "guest" ? (
                                    <div className="card-button-group">
                                        <div className="row">
                                            <div className="col button-col">
                                                <button className="see-user-button classy-button" onClick={() => handleSeeUserProfile(user)}>
                                                    See User
                                                </button>
                                            </div>
                                            {(userType === "admin" || userType === "owner") && (
                                                <div className="col button-col">
                                                    <button className="delete-button classy-button" onClick={() => handleDeleteProfile(user)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                            {userType === "admin" && (
                                                <div className="col button-col">
                                                    <button className="edit-button classy-button" onClick={() => handleEditProfile(user)}>
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profiles;
