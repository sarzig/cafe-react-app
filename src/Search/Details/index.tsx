import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { setRecipe } from "../reducer";
import { useSelector } from "react-redux";
import axios from 'axios';
import { WebsiteState } from "../../store";
import "../index.css"
import * as client from "../../Users/client";
import { User } from "../../Users/client";
import nameGenerator from "../../Profile/Profiles/Functions/nameGenerator";
import { MdInsertLink } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

interface RecipeInfoType {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: {
        id: number;
        aisle: string;
        image: string;
        consistency: string;
        name: string;
        nameClean: string;
        original: string;
        originalName: string;
        amount: number;
        unit: string;
        meta: string[];
        measures: {
            us: {
                amount: number;
                unitShort: string;
                unitLong: string;
            };
            metric: {
                amount: number;
                unitShort: string;
                unitLong: string;
            };
        };
    }[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    taste: {
        sweetness: number;
        saltiness: number;
        sourness: number;
        bitterness: number;
        savoriness: number;
        fattiness: number;
        spiciness: number;
    };
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: string[];
    winePairing: {
        pairedWines: string[];
        pairingText: string;
        productMatches: {
            id: number;
            title: string;
            description: string;
            price: string;
            imageUrl: string;
            averageRating: number;
            ratingCount: number;
            score: number;
            link: string;
        }[];
    };
    instructions: string;
    analyzedInstructions: {
        name: string;
        steps: {
            number: number;
            step: string;
            ingredients: any[];
            equipment: {
                id: number;
                name: string;
                localizedName: string;
                image: string;
            }[];
            length?: {
                number: number;
                unit: string;
            };
        }[];
    }[];
    originalId: number | null;
    spoonacularScore: number;
}

export default function Details() {

    const { rid } = useParams();
    const recipe = useSelector((state: WebsiteState) => state.recipesReducer.recipe);
    const [recipeInfo, setRecipeInfo] = useState<RecipeInfoType>();
    const [users, setUsers] = useState<User[]>([]);
    const [currentUserType, setCurrentUserType] = useState("guest");

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
    const [reserveUser, setReserveUser] = useState<User>({
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
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setUser(account);
            setReserveUser(account);
            setCurrentUserType("customer");
        } catch (err) {
            setCurrentUserType("guest");
            console.log("User is not logged in.");
        }
    }

    const updateUser = async () => {
        try {
            await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // getIngredients()
        fetchProfile();
        // console.log("current user:", user);
        getRecipeInfo()
    }, []);

    async function getRecipeInfo() {
        try {
            const options = {
                method: 'GET',
                url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${rid}/information`,
                headers: {
                    'X-RapidAPI-Key': '7a2a0058b9msh9b1cd6e240d6fbep1cbc4fjsn82e3f8b8474a',
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
            };

            const resp = await axios.request(options);
            setRecipeInfo(resp.data);
            // console.log("recipeInfo:", recipeInfo);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => { fetchUsers(); }, []);

    const getuniqueRecipesAndLikers = () => {
        const recipeMap = new Map<string, User[]>(); // Map to store drinks and their likers

        // Loop through each user
        users.forEach((user: User) => {
            if (user.favorite_recipes && user.email && user._id && user.full_name) {
                // Ensure favorite_recipes, email, _id, full_name, and favorite_drinks are defined
                user.favorite_recipes.forEach((recipe_id: string) => {
                    if (recipe_id) {
                        // Ensure drink_id is defined
                        if (!recipeMap.has(recipe_id)) {
                            recipeMap.set(recipe_id, [user]); // Initialize with the first liker
                        } else {
                            const currentLikers = recipeMap.get(recipe_id) || [];
                            const userExists = currentLikers.some(like => like.email === user.email); // Check if user already liked the drink
                            if (!userExists) {
                                recipeMap.set(recipe_id, [...currentLikers, user]); // Add new liker
                            }
                        }
                    }
                });
            }
        });
        // console.log("recipeMap:", recipeMap);
        return recipeMap;
    };

    const handleSave = async (updatedUser: User) => {
        await client.updateUser(updatedUser);
        await client.signout();
        await client.signin(reserveUser);
    };

    const uniqueRecipesAndLikers = getuniqueRecipesAndLikers();
    const likedRecipes = Array.from(uniqueRecipesAndLikers.entries());
    // console.log("liked Recipes:", likedRecipes);
    const filteredLikedRecipes = likedRecipes.filter(([recipe_id]) => recipeInfo && String(recipe_id) === String(recipeInfo.sourceUrl));
    const likers = filteredLikedRecipes.map(([recipe_id, likers]) => likers);
    // console.log("likers:", likers);

    const buttonRow = (recipeInfo: any) => (
        <div className="button-row row height-50">

            <Link to={`/Search`}
                className="col text-center reactive-col red-reactive-col height-50"
                title="Back to Search Results"
            >
                <IoMdArrowBack className="big-icon" />
            </Link>

            <Link to={recipeInfo.sourceUrl || ""}
                className="col text-center reactive-col blue-reactive-col height-50"
                title="Go to Recipe Link"
            >
                <MdInsertLink className="big-icon" />
            </Link>

            {(currentUserType !== "guest") && (
                <>
                    <div
                        className="col text-center reactive-col green-reactive-col height-50"
                        onClick={() =>
                            handleAddRecipeForSingleUser(String(recipeInfo.sourceUrl))
                        } >
                        + Favorite
                    </div>
                </>
            )}
        </div>
    );

    async function handleAddRecipeForSingleUser(recipeName: string): Promise<void> {
        try {

            if (user) {
                setUser(user);
                setReserveUser(user);
                // Filter out the recipe from the target user's favorite recipes
                const updatedFavoriteRecipes = Array.from(new Set([...(user.favorite_recipes || []), recipeName]));

                // Update the target user with the new favorite recipes
                const updatedUser = { ...user, favorite_recipes: updatedFavoriteRecipes };
                // console.log("updated user..", updatedUser);

                // Update the users state with the modified user
                const updatedUsers = users.map((iuser) => (iuser._id === updatedUser._id ? updatedUser : iuser));
                await setUsers(updatedUsers);

                // console.log("updated users from handle add..:", updatedUsers);

                // Perform additional operations here, such as updating the user in the backend
                // const res = await client.updateUser(updatedUser);
                handleSave(updatedUser);

                console.log(`Recipe '${recipeName}' added to user '${user.email}' successfully.`);

                const userConf = await client.profile();
                // console.log("server confirmation ofuser update to favorite recipes: ", userConf.favorite_recipes);
            } else {
                console.log(`User not logged in or email not found.`);
            }
        } catch (err) {
            console.log("Error adding recipe for single user:", err);
        }
    };

    return (
        <>
            {recipeInfo && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="card recipe-details-card">
                        <Link to={recipeInfo.sourceUrl || ""}>
                            <img src={recipe.image} className="card-img-top" alt="current recipe image" title="Click to go to recipe link" />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title recipe-text bold">{recipe.title} </h5>
                            <h5> Ingredients needed: </h5>
                            <p className="card-text recipe-text">
                                {recipeInfo.extendedIngredients.map((ingredient: any, index: any) => (
                                    <span key={index}> {ingredient.name} - </span>
                                ))}
                                love
                            </p>
                        </div>
                        <div className="card-body">
                            <h5> Recipe Fans: </h5>
                            <p className="card-text recipe-text recipe-fans">
                                {likers.map((likersArray: any[], index: any) => (
                                    likersArray.map((liker: any, innerIndex: any) => (
                                        <div key={`${index}-${innerIndex}`} title={`See ${nameGenerator(currentUserType, liker)}'s profile`}>
                                            <Link to={`/Profile/${liker._id}`}>{nameGenerator(currentUserType, liker)}</Link>
                                        </div>
                                    ))
                                ))}
                            </p>
                            {/* <p>Your mom <br/></p> */}
                        </div>

                        {buttonRow(recipeInfo)}
                    </div>
                </div>
            )}
        </>
    );
};