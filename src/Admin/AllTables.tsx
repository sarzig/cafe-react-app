import { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Users/client";
import { User } from "../Users/client";
import { Link } from "react-router-dom";
import { MdInsertLink } from "react-icons/md";
import CollapsibleSection from "./CollapsibleSection";
import "./index.css";

// xxx todo: user table doesn't auto update when interests or visit days are updated

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AllTables = ({ userType }: { userType: string }) => {

    const [filterRole, setFilterRole] = useState("customer");


    const fetchUsersByRole = async (filterRole: string) => {
        const users = await client.findUsersByRole(filterRole);
        setFilterRole(filterRole);
        setUsers(users);
    };
    const [users, setUsers] = useState<User[]>([]);
    const [stringCafeDays, setStringCafeDays] = useState("");
    const [stringInterests, setStringInterests] = useState("");

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const [user, setUser] = useState<User>({
        _id: "",
        full_name: "",
        email: "",
        password: "",
        image: "",
        hometown: "",
        bio: "",
        interests: [],
        favorite_cafe_days: [],
        favorite_drinks: [],
        favorite_menu_items: [],
        favorite_recipes: [],
        role: "customer",
    });

    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
            setStringCafeDays(u.favorite_cafe_days.join(", "));
            setStringInterests(u.interests.join(", "));

            console.log("Selected user:", user.email);

        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            // Parse stringCafeDays into an array of days
            //const parsedCafeDays = stringCafeDays.split(",").map((day) => day.trim());
            //const parsedInterests = stringInterests.split(",").map((day) => day.trim());

            // Update user object with parsed favorite_cafe_days
            //const updatedUser = { ...user, favorite_cafe_days: parsedCafeDays, interests: parsedInterests };
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteRecipeForSingleUser = (recipeName: string, email: string): void => {

        console.log("email", email);


        const targetUser = users.find((user) => user.email === email);
        if (targetUser) {
            selectUser(targetUser);
        }
        const updatedFavoriteRecipes = targetUser?.favorite_recipes?.filter((recipe) => recipe !== recipeName);
        console.log("updatedFavoriteRecipes", updatedFavoriteRecipes);
        console.log("targetUser", targetUser);
        console.log("email", email);
        console.log("user", user);
        setUser({
            ...user,
            hometown: "poopville",
        });

        updateUser();

        console.log("user", user);


    };

    const handleDeleteRecipeForAllUsers = (recipeName: string): void => {
        for (const user of users) {
            if (Array.isArray(user.favorite_recipes)) {
                if (user.favorite_recipes.includes(recipeName)) {
                    console.log(`User: ${user.full_name}`);
                    console.log("Favorite Recipes:", user.favorite_recipes);
                    const newFavoriteRecipes = user.favorite_recipes.filter((recipe) => recipe !== recipeName);
                    selectUser(user);
                    setUser({ ...user, favorite_recipes: newFavoriteRecipes });

                    console.log("user", user);
                    console.log("newFavoriteRecipes", newFavoriteRecipes);
                    updateUser();
                }
            }
        }
    }

    useEffect(() => { fetchUsers(); }, []);

    const userTable =
        <div>
            <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                User Table
                <select
                    onChange={(e) => fetchUsersByRole(e.target.value)}
                    value={filterRole}
                    className="form-control w-25 float-end">
                    <option value="all">Select user role</option> {/* Default placeholder option */}
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                </select>
                <Link to="/All-Profiles" className="btn btn-info">
                    See all profiles in card view
                </Link>
            </h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Username / Email</th>
                        <th>Full Name</th>
                        <th>Hometown</th>
                        <th>Visit Days</th>
                        <th>Interests</th>
                        <th>Role</th>
                        <th>Delete</th>
                        <th>Modify</th>
                        <th>Link</th>
                    </tr>
                    <tr>
                        <td className="text-nowrap">
                            <input
                                className="form-control"
                                value={user.email}
                                placeholder="Username / email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            <input
                                className="form-control"
                                value={user.password}
                                placeholder="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.full_name}
                                placeholder="Full Name"
                                onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={user.hometown}
                                placeholder="hometown"
                                onChange={(e) => setUser({ ...user, hometown: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={stringCafeDays}
                                placeholder="Visit Days"
                                onChange={(e) => setStringCafeDays(e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={stringInterests}
                                placeholder="Interests"
                                onChange={(e) => setStringInterests(e.target.value)}
                            />
                        </td>
                        <td>
                            <select className="form-control"
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value.toLowerCase() })}
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                                <option value="owner">Owner</option>
                            </select>
                        </td>
                        <td>
                        </td>
                        <td>
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                className="me-2 text-success fs-1 text"
                                title="Modify the Selected user with these attributes"
                            />
                            <BsPlusCircleFill
                                onClick={createUser}
                                className="me-2 text-success fs-1 text"
                                title="Add NEW user with these attributes"
                            />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>
                                {user.email}
                            </td>
                            <td>{user.full_name}</td>
                            <td>{user.hometown}</td>
                            <td>{user.favorite_cafe_days.join(', ')}</td>
                            <td>{user.interests.join(', ')}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-danger me-2"
                                    title="Delete this user"
                                    onClick={() => deleteUser(user)}
                                >
                                    <BsTrash3Fill />
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    title="Edit this user"
                                    onClick={() => selectUser(user)}
                                >
                                    <BsPencil />
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-info" title={`See ${user.email}'s profile`}>
                                    <Link
                                        to={`/profiles/${user._id}`}
                                        title={`See ${user.email}'s profile`}>
                                        <MdInsertLink />
                                    </Link>
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div >

    // Function to extract unique drinks and their likers
    const getuniqueRecipesAndLikers = () => {
        const drinkMap = new Map<string, string[]>(); // Map to store drinks and their likers

        // Loop through each user
        users.forEach((user: User) => {
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



    const likedRecipeTable =
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
                                <button
                                    className="btn btn-danger"
                                    title="Remove recipe from ALL users' likes"
                                    onClick={() => handleDeleteRecipeForAllUsers(recipe)}
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
                                                title="Remove recipe from SINGLE user's likes"
                                                onClick={() =>
                                                    handleDeleteRecipeForSingleUser(recipe, liker)
                                                }
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

    // Function to extract unique drinks and their likers
    const getuniqueDrinksAndLikers = () => {
        const drinkMap = new Map<string, string[]>(); // Map to store drinks and their likers

        // Loop through each user
        users.forEach((user: User) => {
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

    const likedDrinkTable =
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

    const adminText =
        <div>
            <h1>Admin Tools</h1>

            <div className="admin-section">
                <CollapsibleSection title="User Table">
                    {userTable}
                </CollapsibleSection>
            </div>

            <div className="admin-section">
                <CollapsibleSection title="Liked Recipe Table">
                    {likedRecipeTable}
                </CollapsibleSection>
            </div>

            <div className="admin-section">
                <CollapsibleSection title="Liked Drink Table">
                    {likedDrinkTable}
                </CollapsibleSection>
            </div>
        </div>

    const ownerText =
        <div>
            <h1>Admin Tools</h1>
            <h1>You are logged in as an Owner, not an Admin. Go to Login link to fix.</h1>
        </div>

    const customerText =
        <div>
            <h1>Admin Tools</h1>
            <h1>You are logged in as a Customer, not an Admin. Go to Login link to fix.</h1>
        </div>

    const guestText =
        <div>
            <h1>Admin Tools</h1>
            <h1>You are not logged in. Go to Login link to fix.</h1>
        </div>

    // Conditionally select which text to render based on the userType passed as argument
    let displayText;
    const roleLowercase = userType.toLowerCase();

    switch (roleLowercase) {
        case "admin":
            displayText = adminText;
            break;
        case "owner":
            displayText = ownerText;
            break;
        case "customer":
            displayText = customerText;
            break;
        default:
            displayText = guestText;
            break;
    }

    return (
        <div className="container">
            {displayText}
        </div>
    );
};

export default AllTables;