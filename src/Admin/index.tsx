import { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Users/client";
import { User } from "../Users/client";
import { Link } from "react-router-dom";
import { MdInsertLink } from "react-icons/md";
import CollapsibleSection from "./CollapsibleSection";
import "./index.css";

// xxx todo: user table doesn't auto update when interests or visit days are updated

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
            await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteRecipeForSingleUser = async (recipeName: string, email: string): Promise<void> => {
        try {
            // Find the target user based on the provided email
            const targetUser = users.find((user) => user.email === email);

            if (targetUser) {
                // Filter out the recipe from the target user's favorite recipes
                const updatedFavoriteRecipes = (targetUser.favorite_recipes || []).filter((recipe) => recipe !== recipeName);

                // Update the target user with the new favorite recipes
                const updatedUser = { ...targetUser, favorite_recipes: updatedFavoriteRecipes };

                // Update the users state with the modified user
                const updatedUsers = users.map((user) => (user._id === updatedUser._id ? updatedUser : user));
                await setUsers(updatedUsers);

                // Perform additional operations here, such as updating the user in the backend
                await client.updateUser(updatedUser);

                console.log(`Recipe '${recipeName}' removed from user '${email}' successfully.`);
            } else {
                console.log(`User with email '${email}' not found.`);
            }
        } catch (err) {
            console.log("Error deleting recipe for single user:", err);
        }
    };

    const handleDeleteRecipeForAllUsers = async (recipeName: string): Promise<void> => {
        console.log("in HandleDeleteRecipeForAllUsers");
        try {
            const updatedUsers = users.map((user) => {
                if (Array.isArray(user.favorite_recipes) && user.favorite_recipes.includes(recipeName)) {
                    const newFavoriteRecipes = user.favorite_recipes.filter((recipe) => recipe !== recipeName);
                    return { ...user, favorite_recipes: newFavoriteRecipes };
                }
                return user;
            });

            // Update the state after mapping through all users
            await setUsers(updatedUsers);

            // Now you can perform additional operations after the state update
            console.log("Users after deleting recipe:", updatedUsers);

            // Example: Perform an API update for each user
            for (const user of updatedUsers) {
                await client.updateUser(user);
            }

            console.log("All users updated after deleting recipe.");
        } catch (err) {
            console.log("Error deleting recipe for all users:", err);
        }
    };

    const handleDeleteDrinkForSingleUser = async (drinkName: string, email: string): Promise<void> => {
        try {
            // Find the target user based on the provided email
            const targetUser = users.find((user) => user.email === email);

            if (targetUser) {
                // Filter out the drink from the target user's favorite drinks
                const updatedFavoriteDrinks = (targetUser.favorite_drinks || []).filter((drink) => drink !== drinkName);

                // Update the target user with the new favorite drinks
                const updatedUser = { ...targetUser, favorite_drinks: updatedFavoriteDrinks };

                // Update the users state with the modified user
                const updatedUsers = users.map((user) => (user._id === updatedUser._id ? updatedUser : user));
                setUsers(updatedUsers);

                // Perform additional operations here, such as updating the user in the backend
                await client.updateUser(updatedUser);

                console.log(`Drink '${drinkName}' removed from user '${email}' successfully.`);
            } else {
                console.log(`User with email '${email}' not found.`);
            }
        } catch (err) {
            console.log("Error deleting drink for single user:", err);
        }
    };

    const handleDeleteDrinkForAllUsers = async (drinkName: string): Promise<void> => {
        console.log("in HandleDeleteDrinkForAllUsers");
        try {
            const updatedUsers = users.map((user) => {
                if (Array.isArray(user.favorite_drinks) && user.favorite_drinks.includes(drinkName)) {
                    const newFavoriteDrinks = user.favorite_drinks.filter((drink) => drink !== drinkName);
                    return { ...user, favorite_drinks: newFavoriteDrinks };
                }
                return user;
            });

            // Update the state after mapping through all users
            setUsers(updatedUsers);

            // Now you can perform additional operations after the state update
            console.log("Users after deleting drink:", updatedUsers);

            // Example: Perform an API update for each user
            for (const user of updatedUsers) {
                await client.updateUser(user);
            }

            console.log("All users updated after deleting drink.");
        } catch (err) {
            console.log("Error deleting drink for all users:", err);
        }
    };


    useEffect(() => { fetchUsers(); }, []);

    const userTable =
        <div>
            <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th className="col-2">Username / Email</th>
                        <th className="col-2">Full Name</th>
                        <th className="col-2">Hometown</th>
                        <th className="col-2">Visit Days</th>
                        <th className="col-2">Interests</th>
                        <th className="width-120">Role</th>
                        <th className="width-70">Delete</th>
                        <th className="width-70">Modify</th>
                        <th className="width-70">Link</th>
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
                        <td>
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
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="col-5">Recipe</th>
                        <th className="width-70">Link</th>
                        <th className="width-70">Delete Recipe</th>
                        <th className="col-5">Likers of Recipe</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.from(uniqueRecipesAndLikers.entries()).map(([recipe, likers]) => (
                        <tr key={recipe}>
                            <td>
                                {recipe}
                            </td>

                            <td>
                                <a href={recipe}>
                                    <button className="btn btn-info" title="Go to recipe link">
                                        <MdInsertLink />
                                    </button>
                                </a>
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
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="col-6">Drink</th>
                        <th className="col-1 width-70">Delete Drink</th>
                        <th className="col-6">Likers of Drink</th>
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
                                    onClick={() =>
                                        handleDeleteDrinkForAllUsers(drink)
                                    }>
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
                                                onClick={() =>
                                                    handleDeleteDrinkForSingleUser(drink, liker)
                                                }>
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
            <h1>You are logged in as an Owner, not an Admin. Go to Login link to fix.</h1>
        </div>

    const customerText =
        <div>
            <h1>You are logged in as a Customer, not an Admin. Go to Login link to fix.</h1>
        </div>

    const guestText =
        <div>
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
        <div className="container-fluid">
            <div className="heading-div">
                <h1>Admin Tools</h1>
            </div>
            <br/>


            {displayText}
        </div>
    );
};

export default AllTables;