import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { setRecipe } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { WebsiteState } from "../../store";
import "../index.css"

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
    // const { recipeId } = useParams();
    // const { recipe } = "";
    const dispatch = useDispatch();
    // const recipe = getRecipe();
    const recipe = useSelector((state: WebsiteState) => state.recipesReducer.recipe);
    // console.log("recipe:", recipe);
    // const [ingredients, setIngredients] = useState([]);
    const [recipeInfo, setRecipeInfo] = useState<RecipeInfoType>();

    useEffect(() => {
        // getIngredients()
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
            console.log("recipeInfo:", recipeInfo);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <> 
            {recipeInfo && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="card">
                    {/* <div className="card"> */}
                        <img src={recipe.image} className="card-img-top" alt="current recipe image"/>
                        <div className="card-body">
                            <h5 className="card-title recipe-text">Title: {recipe.title} </h5>
                            {/* <h5> Summary: </h5> <p> {recipeInfo && recipeInfo.summary || ""} </p> */}
                            <h5> Ingredients needed: </h5>
                            <p className="card-text recipe-text">
                                {/* {ingredients.map((ingredient: any, index: any) => (
                                    <span key={index}> {ingredient.name} - </span>
                                ))} */}
                                {recipeInfo.extendedIngredients.map((ingredient: any, index: any) => (
                                    <span key={index}> {ingredient.name} - </span>
                                ))}
                            </p>
                        </div>
                        <div className="card-body">
                            <h5> Recipe Fans: </h5>
                            <p className="card-text recipe-text">
                                placeholder..
                                {/* {ingredients.map((ingredient: any, index: any) => (
                                    <span key={index}> {ingredient.name} - </span>
                                ))} */}
                            </p>
                        </div>
                        <div className="card-footer bg-transparent">
                            <button className="btn btn-light p card-link" >
                                <Link to={`/Search`} className="button-link">Return</Link>
                            </button>
                            <button className="btn btn-light p card-link" >
                                <Link to={recipeInfo.sourceUrl || ""} className="button-link">Source</Link>
                            </button>
                            <button className="btn btn-light p card-link" >
                                <Link to={recipe.sourceUrl} className="button-link">+ Favorite</Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};