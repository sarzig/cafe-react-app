import React from "react";
import usersData from '../Database/users.json';
import { BsTrash3Fill } from "react-icons/bs";
import { MdInsertLink } from "react-icons/md";
import { Link } from "react-router-dom";
import "../App.css";

export default function LikedDrinkTable() {
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
        favorite_recipes?: string[]; // Optional field
        favorite_menu_items?: string[]; // Optional field
        favorite_drinks?: string[]; // Optional field
        role: string;
    };

    // Function to extract unique drinks and their likers
    const getuniqueDrinksAndLikers = () => {
        const drinkMap = new Map<string, string[]>(); // Map to store drinks and their likers

        // Loop through each user
        usersData.forEach((user: User) => {
            if (user.favorite_drinks && user.email) {
                // Ensure favorite_drinks and email are defined
                user.favorite_drinks.forEach((drink: string) => {
                    if (drink) {
                        // Ensure drink is defined
                        if (!drinkMap.has(drink)) {
                            drinkMap.set(drink, [user.email]); // Initialize with the first liker
                        } else {
                            const currentLikers = drinkMap.get(drink) || [];
                            if (!currentLikers.includes(user.email)) {
                                drinkMap.set(drink, [...currentLikers, user.email]); // Add new liker
                            }
                        }
                    }
                });
            }
        });

        return drinkMap;
    };

    const uniqueDrinksAndLikers = getuniqueDrinksAndLikers();

    return (
        <div>
            <h2>Liked Drink Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Drink</th>
                        <th>Delete Drink</th>
                        <th>Likers of Drink</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(uniqueDrinksAndLikers.entries()).map(([drink, likers]) => (
                        <tr key={drink}>
                            <td>
                                {drink}
                            </td>

                            <td>
                                <button className="btn btn-danger" title="Remove drink from ALL users' likes"
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
                                                //onClick={() => removeLiker(drink, liker)}  // xxx todo update
                                                title="Remove drink from SINGLE user's likes"
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
