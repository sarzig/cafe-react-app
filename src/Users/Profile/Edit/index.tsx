import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../reducer";
import React, { useEffect, useState } from "react";
import { WebsiteState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { User } from "../../client";
import * as client from "../../client";
import { FaTimes, FaXRay } from "react-icons/fa";

export default function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User>({ _id: "", full_name: "", image: "",
    email: "", password: "", hometown: "", bio: "", interests: [], favorite_cafe_days: [],
    favorite_drinks: [], favorite_menu_items: [], favorite_recipes: [], role: "guest"});
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    }
    const handleSave = async () => {
        await client.signout();
        await client.updateUser(profile);
        await client.signin(profile);
        navigate(`/Profile`);
    };
    const showPassword = () => {
        var x = document.getElementById("password_box") as HTMLInputElement;
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    };
    const deleteInterest = (interest: any) => {
        const newInterests = profile.interests.filter((item) => item !== interest);
        setProfile({...profile, interests: newInterests});
    };
    const deleteCafeDays = (day: any) => {
        const newDays = profile.favorite_cafe_days.filter((item) => item !== day);
        setProfile({...profile, favorite_cafe_days: newDays});
    };
    const deleteDrinks = (drink: any) => {
        const newDrinks = profile.favorite_drinks.filter((item) => item !== drink);
        setProfile({...profile, favorite_drinks: newDrinks});
    };
    const deleteMenuItems= (menuItem: any) => {
        const newMenu = profile.favorite_menu_items.filter((item) => item !== menuItem);
        setProfile({...profile, favorite_menu_items: newMenu});
    };
    const deleteRecipes = (recipe: any) => {
        const newRecipes = profile.favorite_recipes.filter((item) => item !== recipe);
        setProfile({...profile, favorite_recipes: newRecipes});
    };
    const [field, setField] = useState("interests");
    const [text, setText] = useState("");
    
    const addData = () => {
        if (field === "interests") {
            const array = profile.interests;
            array.push(text);
            setProfile({...profile, interests: array});
        }
        else if (field === "days") {
            const array = profile.favorite_cafe_days;
            array.push(text);
            setProfile({...profile, favorite_cafe_days: array});
        }
        else if (field === "drinks") {
            const array = profile.favorite_drinks;
            array.push(text);
            setProfile({...profile, favorite_drinks: array});
        }
        else if (field === "menu_items") {
            const array = profile.favorite_menu_items;
            array.push(text);
            setProfile({...profile, favorite_menu_items: array});
        }
    }
    
    
    useEffect(() => {
        fetchProfile();
      }, []);
    return (
        <div className="flex-container form-control mx-2">
            <h3>Profile</h3>
            <div className="row">
                <div className="col-sm text-center">
                <span>
                    <img src={`/images/profiles_pages/${profile.image}`} className="rounded-circle shadow-4-strong"/>
                </span>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-10">
                        <h6>Name:</h6>
                        <input type="text" className="form-control" onChange={(e) => setProfile({...profile, full_name: e.target.value})} defaultValue={profile.full_name} />
                        <br />
                        <h6>Hometown</h6>
                        <input type="text" className="form-control" onChange={(e) => setProfile({...profile, hometown: e.target.value})} defaultValue={profile.hometown} />
                        <br />
                        <h6>Bio:</h6>
                        <textarea className="form-control" onChange={(e) => setProfile({...profile, bio: e.target.value})} defaultValue={profile.bio}></textarea>
                        <br />
                        <h6>Email:</h6>
                        <input type="text" className="form-control" onChange={(e) => setProfile({...profile, email: e.target.value})} defaultValue={profile.email}/>
                        <br />
                        <h6>Password:</h6>
                        <input type="password" id="password_box" className="form-control" onChange={(e) => setProfile({...profile, password: e.target.value})} defaultValue={profile.password} />
                        <input type="checkbox" id="show_password" onChange={showPassword}/> &nbsp;
                        <label htmlFor="show_password">Show password</label>
                        <br />
                        <h6 className="mt-3">Add user data:</h6>
                        <select className="form-control" onChange={(e) => setField(e.target.value)}>
                            <option value="interests">Interests</option>
                            <option value="days">Days</option>
                            <option value="drinks">Drinks</option>
                            <option value="menu_items">Menu Items</option>
                        </select>
                        <input type="text" className="form-control mt-1" onChange={(e) => setText(e.target.value)}/>
                        <button className="mt-1 w-100 btn btn-success" onClick={() => addData()}>Add</button>
                        <br />
                        <h6 className="mt-2">Interests:</h6>
                        {profile?.interests.map((interest) => (
                            <button key={interest} className="btn btn-light text-center" onClick={() => deleteInterest(interest)}>{interest} <FaTimes /></button>
                        ))}
                        <br />
                        <h6 className="mt-2">Favorite cafe days:</h6>
                        {profile?.favorite_cafe_days.map((day) => (
                            <button key={day} className="btn btn-light text-center" onClick={() => deleteCafeDays(day)}>{day} <FaTimes/></button>
                        ))}
                        <br />
                        <h6 className="mt-2">Favorite drinks:</h6>
                        {profile?.favorite_drinks.map((drink) => (
                            <button key={drink} className="btn btn-light text-center" onClick={() => deleteDrinks(drink)}>{drink} <FaTimes/></button>
                        ))}
                        <br />
                        <h6 className="mt-2">Favorite menu items:</h6>
                        {profile?.favorite_menu_items.map((menuItem) => (
                            <button key={menuItem} className="btn btn-light text-center" onClick={() => deleteMenuItems(menuItem)}>{menuItem} <FaTimes /></button>
                        ))}
                        <br />
                        <h6 className="mt-2">Favorite recipes:</h6>
                        {profile?.favorite_recipes.map((recipe) => (
                            <button key={recipe} className="btn btn-light text-center" onClick={() => deleteRecipes(recipe)}>{recipe} <FaTimes/></button>
                        ))}
                        </div>
                    </div>
                <br />
                </div> 
                <span className="">
                    <button className="btn btn-primary float-end" onClick={handleSave}>Save</button> &nbsp;
                    <a href="#/Profile" className="btn btn-light float-end">Cancel</a>
                </span>
                <br /><br />
            </div>
        </div>
    );
};
