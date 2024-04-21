import * as client from "../../Users/client";
import { useNavigate } from "react-router-dom";
import { User } from "../client";
import { useEffect, useState } from "react";

export default function Profile({ onSignOut }: any) {
    const [profile, setProfile] = useState<User>({ _id: "", full_name: "", image: "",
    email: "", password: "", hometown: "", bio: "", interests: [], favorite_cafe_days: [],
    favorite_drinks: [], favorite_menu_items: [], favorite_recipes: [], role: "guest"});
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    }
    const navigate = useNavigate();
    const signout = async () => {
        await client.signout();
        onSignOut();
        navigate(`/Home`);
    }
    useEffect(() => {
        fetchProfile();
      }, []);
    return (
        <div className="mt-2 pt-3 form-control">
            <table className="row">
            <h3>Profile</h3>
            <div className="col" style={{width: 50}}>
                <span>
                    <img src={`/images/profiles_pages/${profile.image}`} alt="Profile photo." className="rounded-circle shadow-4-strong"/>
                </span>
            <div>
                <br />
                <a className="btn btn-light" href="#/My-Profile/Edit">Edit Profile</a> &nbsp;
                <button className="btn btn-light" onClick={signout}>Sign Out</button>
            </div>
                
                
            </div>
            <div className="col-9">
            <span className="px-5 fs-3">
                {profile.full_name}
            </span>
            <span>
                {profile.bio}
            </span>
            </div>
            </table>
        </div>
    );
};