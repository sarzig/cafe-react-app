import usersData from '../Database/users.json'; // xxx delete this later


export default function likedDrinkTable() {
    // xxx - temporary for creation of page, delete later
    // create User type:
    type User = {
        _id: string;
        full_name: string;
        email: string;
        password: string;
        image: string;
        birthdate: string;
        hometown: string;
        bio: string;
        interests: [];
        favorite_cafe_days: [];
        favorite_cafe_drinks: [];
        favorite_menu_items: [];
        favorite_recipes: [];
        role: string;
    };

    return (
        <div>
        </div>
    );
}