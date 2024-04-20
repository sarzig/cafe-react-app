import React from "react";
import usersData from '../Database/users.json';

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
        favorite_drinks?: string[]; // Optional field
        favorite_menu_items?: string[]; // Optional field
        favorite_recipes?: string[]; // Optional field
        role: string;
    };

    // Function to extract unique drinks and their likers
    const getUniqueDrinksAndLikers = () => {
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

    const uniqueDrinksAndLikers = getUniqueDrinksAndLikers();

    return (
        <div>
            <h2>Liked Drink Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Drinks</th>
                        <th>Likers of Drink</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(uniqueDrinksAndLikers.entries()).map(([drink, likers]) => (
                        <tr key={drink}>
                            <td>
                                {drink}
                            </td>
                            <td>{likers.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
