import React from "react";
import usersData from '../Database/users.json';
import { BsTrash3Fill } from "react-icons/bs";
import { MdInsertLink } from "react-icons/md";
import { Link } from "react-router-dom";
import "../App.css";

export default function LikedRecipeTable() {
    // Define the User type with optional fields
    type User = {
        _id?: string;
        full_name?: string;
        email: string;
        password?: string;
        image?: string;
        birthdate: string;
        hometown?: string;
        bio?: string;
        interests: string[];
        favorite_cafe_days?: string[]; // Optional field
        favorite_drinks?: string[]; // Optional field
        favorite_menu_items?: string[]; // Optional field
        favorite_recipes?: string[]; // Optional field
        role: string;
    };

    // Function to extract unique drinks and their likers
    const getuniqueRecipesAndLikers = () => {
        const drinkMap = new Map<string, string[]>(); // Map to store drinks and their likers

        // Loop through each user
        usersData.forEach((user: User) => {
            if (user.favorite_recipes && user.email) {
                // Ensure favorite_recipes and email are defined
                user.favorite_recipes.forEach((recipe: string) => {
                    if (recipe) {
                        // Ensure recipe is defined
                        if (!drinkMap.has(recipe)) {
                            drinkMap.set(recipe, [user.email]); // Initialize with the first liker
                        } else {
                            const currentLikers = drinkMap.get(recipe) || [];
                            if (!currentLikers.includes(user.email)) {
                                drinkMap.set(recipe, [...currentLikers, user.email]); // Add new liker
                            }
                        }
                    }
                });
            }
        });

        return drinkMap;
    };

    const uniqueRecipesAndLikers = getuniqueRecipesAndLikers();

    return (
        <div>
            <h2>Liked Recipe Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Recipe</th>
                        <th>Link</th>
                        <th>Delete Recipe</th>
                        <th>Likers of Recipe</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {Array.from(uniqueRecipesAndLikers.entries()).map(([recipe, likers]) => (
                        <tr key={recipe}>
                            <td>
                                {recipe}
                            </td>

                            <td>
                                <button className="btn btn-info" title="Go to recipe link">
                                    <a href={recipe}>
                                        <MdInsertLink />
                                    </a>
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger" title="Remove recipe from ALL users' likes"
                                >
                                    <BsTrash3Fill />
                                </button>
                            </td>
                            <td>
                                {likers.map((liker) => (
                                    <div key={liker} className="d-flex align-items-center mb-2">
                                        <div className="flex-grow-1">
                                            {liker}
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-danger"
                                                //onClick={() => removeLiker(recipe, liker)}  // xxx todo update
                                                title="Remove recipe from SINGLE user's likes"
                                            >
                                                <BsTrash3Fill />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
