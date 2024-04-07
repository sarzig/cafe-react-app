import React, { useState } from "react";
import { Link } from "react-router-dom";
import profiles from "./profiles.json";
import "../../index.css";
import "./index.css";

type UserRole = "admin" | "owner" | "user" | "guest";

function Profiles() {
    const currentUserId = "a32988bc-873c-4f5a-94a7-91db454c624b";
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userRole, setUserRole] = useState<UserRole>("user"); // State to manage userRole

    const handleUserRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserRole(event.target.value as UserRole);
    };

    // Helper functions for generating content based on userRole
    const nameGenerator = (profile: any) => {
        if (userRole !== "guest") {
            return profile.full_name;
        } else if (profile.favorite_drinks && profile.favorite_drinks.length > 0) {
            return `Anonymous ${profile.favorite_drinks[0]} Drinker`;
        } else {
            const sillyNouns = ["Cafe Goer", "Awesome Friend", "Serious Goofball", "Hipster Wannabe", "Introvert", "Extrovert", "Public Universal Friend"];
            const randomIndex = Math.floor(Math.random() * sillyNouns.length);
            return `Anonymous ${sillyNouns[randomIndex]}`;
        }
    };

    const imageGenerator = (profile: any) => {
        if (profile.image && userRole !== "guest") {
            return `/images/profiles_pages/${profile.image}`;
        } else {
            const randomNumber = Math.floor(Math.random() * 9) + 1;
            return `/images/profiles_pages/anonymous${randomNumber}.jpg`;
        }
    };

    const renderButtonsBasedOnRole = () => {
        if (userRole === "admin") {
            return (
                <div className="card-button-group">
                    <div className="row">
                        <div className="col button-col">
                            <button className="edit-button classy-button" onClick={handleEditProfile}>
                                Edit
                            </button>
                        </div>
                        <div className="col button-col">
                            <button className="delete-button classy-button" onClick={handleDeleteProfile}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (userRole === "owner") {
            return (
                <div className="card-button-group">
                    <div className="row">
                        <div className="col button-col">
                            <button className="see-user-button classy-button" onClick={handleSeeUserProfile}>
                                See User
                            </button>
                        </div>
                        <div className="col button-col">
                            <button className="delete-button classy-button" onClick={handleDeleteProfile}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (userRole === "user" || userRole === "guest") {
            return (
                <div className="card-button-group">
                    <div className="row">
                        <div className="col button-col">
                            <button className="see-user-button classy-button" onClick={handleSeeUserProfile}>
                                See User
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    const handleDeleteProfile = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        // Perform delete operation
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleEditProfile = () => {
        // Handle edit profile action
    };

    const handleSeeUserProfile = () => {
        // Handle see user profile action
    };

    return (
        <div>
            <h1>Boston Profiles</h1>
            <hr />
            <div>
                {showConfirmation && (
                    <div className="popup">
                        <div className="row">
                            <p>Are you sure you want to delete this profile?<br />This action cannot be undone.</p>
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
            <div>
                <label htmlFor="userRole">Select User Role:</label>
                <select id="userRole" value={userRole} onChange={handleUserRoleChange}>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                </select>
            </div>
            <div className="row row-cols-1 row-cols-md-5 g-200 justify-content-center">
                {profiles.filter(profile => profile.id !== currentUserId).map((profile) => (
                    <div key={profile.id} className="col" style={{ width: 350 }}>
                        <div className="card flex-shrink-0">
                            <Link className="card-image" to={`/profiles/${profile.id}`}>
                                <img src={imageGenerator(profile)} alt="Profile" className="card-img-top" />
                            </Link>
                            <div className="card-body">
                                <Link className="card-title" to={`/profiles/${profile.id}`}>
                                    {nameGenerator(profile)}
                                </Link>
                                <div className="card-details">
                                    {profile.hometown && (
                                        <>
                                            <span className="category">Hometown: </span>
                                            <span className="detail">{profile.hometown}</span>
                                            <br />
                                        </>
                                    )}
                                    {profile.favorite_drinks && (
                                        <>
                                            <span className="category">Favorite Drinks: </span>
                                            <span className="detail">{profile.favorite_drinks.join(", ")}</span>
                                            <br />
                                        </>
                                    )}
                                    {profile.favorite_cafe_days && (
                                        <>
                                            <span className="category">Visits Sakivi on: </span>
                                            <span className="detail">{profile.favorite_cafe_days.join(", ")}</span>
                                            <br />
                                        </>
                                    )}
                                    {profile.interests && (
                                        <>
                                            <span className="category">Interests: </span>
                                            <span className="detail">{profile.interests.join(", ")}</span>
                                            <br />
                                        </>
                                    )}
                                </div>
                                {renderButtonsBasedOnRole()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profiles;
