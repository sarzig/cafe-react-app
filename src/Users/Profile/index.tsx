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
            <div className="col-md-1"></div>
            <div className="col-md-2 text-center">
            <h3>Profile</h3>
                <span>
                    <img src={`/images/profiles_pages/${profile.image}`} alt="sleek headshot" className="rounded-circle shadow-4-strong"/>
                </span>
            <div>
                <br />
                <a className="btn btn-light w-100" href="#/Profile/Edit">Edit Profile</a>
                <button className="btn btn-light w-100 mt-2" onClick={signout}>Sign Out</button>
                <br /><br />
            </div>
            </div>
            <div className="col-1"></div>
            <div className="col-8">
                <span className="px-5 fs-3">
                    {profile.full_name}
                    <br />
                </span>
                <div className="px-5">
                    <i>{profile.hometown}</i> <br />
                    {profile.bio} <br /><br />
                </div>
                <div className="px-5 row">
                    <div className="col">
                    <div className="row">
                        <div className="col">Email:</div>
                        <div className="col">{profile.email}</div>
                    </div>
                    <div className="row">
                        <div className="col">Interests:</div>
                        <div className="col">{profile.interests?.join(", ")}</div>
                    </div>
                    <div className="row">
                        <div className="col">Favorite cafe days:</div>
                        <div className="col">{profile.favorite_cafe_days?.join(", ")}</div>
                    </div>
                    <div className="row">
                        <div className="col">Favorite drinks:</div>
                        <div className="col">{profile.favorite_drinks?.join(", ")}</div>
                    </div>
                    <div className="row">
                        <div className="col">Favorite menu items:</div>
                        <div className="col">{profile.favorite_menu_items?.join(", ")} </div>
                    </div>
                    <div className="row">
                        <div className="col">Favorite recipes:</div>
                        <div className="col">{profile.favorite_recipes.map((recipe) => 
                            <a key={recipe} href={`${recipe}`}>{recipe} <br /></a>
                        )}</div>
                    </div>
                    </div>
                    
                </div>
            </div>
            </table>
        </div>
    );
};