import React from "react";
import { Link } from "react-router-dom";
import profiles from "./profiles.json";
import "../../index.css";
import "./index.css";
import * as client from "../../Users/client";

/*
Notes on User roles:

A guest can see this page, but cannot navigate to profiles. 
A guest cannot see real names or pictures.

A user can see this page, and can navigate to profiles. A user cannot see her own profile.

An admin/owner can see this page, and can also see edit/delete buttons.

To-do / Wishlist:
If userRole is guest, don't do the hover shadow or any linking. 
I feel that linkGenerator is weak/bad implementation and it's better to not link at ALL if user is guest.
*/

function Profiles() {


    // todo - replace currentUserId and userRole with state management
    const currentUserId = "a32988bc-873c-4f5a-94a7-91db454c624b";
    type UserRole = "admin" | "user" | "guest";
    const userRole: UserRole = "guest";
    // end todo

    function handleDeleteProfile(): void {
        throw new Error("Function not implemented.");
    }

    function nameGenerator(profile: any) {

        if (userRole !== "guest") {
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
        if (profile.image && userRole !== "guest") {
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

    function linkGenerator(profile: any) {

    }

    return (
        <div>
            <h1>Boston Profiles</h1>
            <hr />

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-200">
                    {profiles.filter(profile => profile.id !== currentUserId).map((profile) => (
                        <div key={profile.id} className="col" style={{ width: 350 }}>
                            <div className="card flex-shrink-0">

                                <Link className="card-image" to={`/profiles/${profile.id}`}>
                                    <img
                                        src={imageGenerator(profile)}
                                        alt="alt_text"
                                        className="card-img-top" />
                                </Link>

                                <div className="card-body">

                                    <Link className="card-title" to={`/profiles/${profile.id}`}>
                                        {nameGenerator(profile)}
                                    </Link>

                                    <div className="card-details">

                                        {profile.hometown && ( // Conditionally render if favorite_drinks exists
                                            <>
                                                <span className="category">Hometown: </span>
                                                <span className="detail">{profile.hometown}</span>
                                                <br />
                                            </>
                                        )}

                                        {profile.favorite_drinks && ( // Conditionally render if favorite_drinks exists
                                            <>

                                                <span className="category">Favorite Drinks: </span>
                                                <span className="detail">{profile.favorite_drinks.join(", ")}</span>
                                                <br />
                                            </>
                                        )}

                                        {profile.favorite_cafe_days && ( // Conditionally render if favorite_cafe_days
                                            <>
                                                <span className="category">Visits Sakivi on: </span>
                                                <span className="detail">{profile.favorite_cafe_days.join(", ")}</span>
                                                <br />
                                            </>
                                        )}

                                        {profile.interests && ( // Conditionally render if favorite_cafe_days
                                            <>
                                                <span className="category">Interests: </span>
                                                <span className="detail">{profile.interests.join(", ")}</span>
                                                <br />
                                            </>
                                        )}

                                    </div>

                                    <br />

                                </div>

                                <div className="card-buttons">

                                    <div className="card-button-group">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="btn edit-button classy-button">
                                                    Edit
                                                </div>
                                            </div>

                                            <div className="col-6">

                                                <div
                                                    className="btn delete-button classy-button"
                                                    onClick={handleDeleteProfile}>

                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
export default Profiles;
