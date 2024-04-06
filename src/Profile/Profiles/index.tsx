import React from "react";
import { Link } from "react-router-dom";
// import { profiles } from "../Database";
import "./index.css";
import profiles from "./profiles.json";

function Profiles() {



    return (
        <div>
            <h1>Profiles</h1>
            <hr />

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-200">
                    {profiles.map((profile) => (
                        <div key={profile.id} className="col" style={{ width: 300 }}>
                            <div className="card flex-shrink-0">

                                <Link className="card-title" to={`/Kanbas/profiles/${profile.id}/Home`}>
                                    <img src={`/images/${profile.image}`} alt="alt_text" className="card-img-top" />
                                </Link>

                                <Link className="card-title" to={`/Kanbas/profiles/${profile.id}/Home`} title={`${profile.full_name} - Homepage`}>

                                    <div className="card-body">

                                        <Link className="card-title underline-target-text" to={`/Kanbas/profiles/${profile.id}/Home`}>
                                            {profile.full_name}

                                            <br />


                                        </Link>

                                        <div className="card-code">
                                            put some details here
                                        </div>

                                        <div className="card-details">
                                            put some details here
                                        </div>

                                        <br />

                                        <div className="card-buttons">
                                            <Link to={`/Kanbas/profiles/${profile.id}/Assignments`} title={`${profile.full_name} - Assignments`}
                                                className="btn btn-primary">
                                                Go
                                            </Link>

                                            <div className="card-button-group">
                                                <div className="btn btn-primary">
                                                    Edit
                                                </div>

                                                <div className="btn btn-primary red-button">
                                                    Delete
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
export default Profiles;
