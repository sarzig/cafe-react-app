import React from "react";
import { Link } from "react-router-dom";
import profiles from "./profiles.json";
import "../../index.css";
import "./index.css";

/*
Notes on User roles:

A guest can see this page, but cannot navigate to profiles. 
A guest cannot see real names or pictures.

A user can see this page, and can navigate to profiles. A user cannot see her own profile.

An admin/owner can see this page, and can also see edit/delete buttons.
*/

function Profiles() {


    // todo - replace currentUserId and userRole with state management
    const currentUserId = "a32988bc-873c-4f5a-94a7-91db454c624b";
    const userrole = "admin";

    function handleDeleteProfile(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <h1>Profiles</h1>
            <hr />

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-200">
                    {profiles.map((profile) => (
                        <div key={profile.id} className="col" style={{ width: 350 }}>
                            <div className="card flex-shrink-0">

                                <Link className="card-title" to={`/profiles/${profile.id}`}>
                                    <img
                                        src={`/images/profiles_pages/${profile.image || "anonymous.jpg"}`}
                                        alt="alt_text"
                                        className="card-img-top" />
                                </Link>



                                <div className="card-body">

                                    <Link className="card-title" to={`/profiles/${profile.id}`}>
                                        {profile.full_name}
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
                                                <span className="category">Favorite Days to Visit: </span>
                                                <span className="detail">{profile.favorite_cafe_days.join(", ")}</span>
                                                <br />
                                            </>
                                        )}

                                        {profile.interests && ( // Conditionally render if favorite_cafe_days
                                            <>
                                                <span className="category">Favorite Days to Visit: </span>
                                                <span className="detail">{profile.interests.join(", ")}</span>
                                                <br />
                                            </>
                                        )}

                                    </div>

                                    <br />

                                </div>

                                <div className="card-buttons">

                                    <div className="card-button-group">
                                        <div className="btn edit-button classy-button">
                                            Edit
                                        </div>

                                        <div
                                            className="btn delete-button classy-button"
                                            onClick={handleDeleteProfile}>

                                            Delete
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
