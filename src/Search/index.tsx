import { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css"
import { useDispatch, useSelector } from 'react-redux';
import {
    setRecipes,
    setRecipe,
} from './reducer';
import { WebsiteState } from '../store';
// import ResultList from './ResultList';
import { Link } from 'react-router-dom';
// import reducer from './reducer';

// REF for initial code format/idea: https://www.youtube.com/watch?v=y68g_vYskGs but modified to fit our project

export default function Search() {

    interface Recipe {
        id: Number;
        image: string;
        servings: Number;
        sourceUrl: string;
        readyInMinutes: Number;
        title: string;
        extendedIngredients: {
            name: string;
        }[];
        summary: string;

    }

    useEffect(() => {
        getRecipes()
    }, []);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const recipes = useSelector((state: WebsiteState) => state.recipesReducer.recipes);
    // const [recipes] = useState<Recipe[]>([]);
    const dispatch = useDispatch();

    // Link to Spoonacular Search API Documentation: https://spoonacular.com/food-api/docs#Get-Random-Recipes
    async function getRecipes() {
        try {
            // Victoria's temp free key
            // const apiKey = 'dcc4423567f24887b8e3d245061312f5';
            // const apiKey = '';
            const numberOfRecipes = 10;

                if (!searchTerm.trim()) return; // Check if search term is empty then do nothing if so

            const options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
                params: {
                    query: searchTerm,
                    //   cuisine: 'italian',
                    //   excludeCuisine: 'greek',
                    //   diet: 'vegetarian',
                    //   intolerances: 'gluten',
                    //   equipment: 'pan',
                    //   includeIngredients: 'tomato,cheese',
                    //   excludeIngredients: 'eggs',
                    //   type: 'main course',
                    //   instructionsRequired: 'true',
                    //   fillIngredients: 'false',
                    //   addRecipeInformation: 'false',
                    //   titleMatch: 'Crock Pot',
                    //   maxReadyTime: '20',
                    //   ignorePantry: 'true',
                    //   sort: 'calories',
                    //   sortDirection: 'asc',
                    //   minCarbs: '10',
                    //   maxCarbs: '100',
                    //   minProtein: '10',
                    //   maxProtein: '100',
                    //   minCalories: '50',
                    //   maxCalories: '800',
                    //   minFat: '10',
                    //   maxFat: '100',
                    //   minAlcohol: '0',
                    //   maxAlcohol: '100',
                    //   minCaffeine: '0',
                    //   maxCaffeine: '100',
                    number: '10',
                    //   limitLicense: 'false',
                    //   ranking: '2'
                },
                headers: {
                    // Kiersten student account API key
                    'X-RapidAPI-Key': '7a2a0058b9msh9b1cd6e240d6fbep1cbc4fjsn82e3f8b8474a',
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
            };

                const resp = await axios.request(options);

                if (resp.data.results) {
                    // console.log("recipes:", recipes);
                    // client.setRecipes(resp.data.results).then((status) => {
                    //     dispatch(setRecipes(resp.data.results));
                    // }
                    dispatch(setRecipes(resp.data.results));
                    console.log("recipes:", recipes);
                }
            } catch (e) {
                console.log(e);
            }                

    }

    return (
        <>
            <div className="heading-div">
                <h1>Search Recipes</h1>
            </div>
            {/* SARAH ADDED THIS Hero image visible only on large screens (lg and up) */}
            <div className="d-none d-lg-block">
                <div className="text-center">

                    <p> Recipes @ Sakivi: Search, Like, Share, Repeat. Find a new favorite recipe and "Like" to keep for later.</p>

                    {/* Use a wrapper div to control width */}
                    <div style={{ maxWidth: "100%" }}>
                        <img src={`/images/recipes/recipe_hero_no_text.jpg`} alt="A lucious capuccino with a foam heart sits on a dark blue background with scattered candied fruit." style={{ width: "100%" }} />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">

            {/* <div className="heading">
                <h3>Search</h3>
            </div> */}
            <div className="d-flex flex-row" id="search-bar">
                <form className="form-outline my-2 my-lg-6">
                    <input 
                        className="form-control my-2 my-sm-0 custom-search-input" 
                        type="search" 
                        placeholder="Latte Mug Cake" 
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                </form>
                <button className="btn btn-light" onClick={getRecipes}> Search </button>
            </div>
            {/* TODO: Make same width as search bar(?) */}
            <div className="d-flex flex-row" id="search-bar">
                {/* <button className="btn btn-light p" onClick={getRecipes}> Generate New Random Recipe </button> */}
            </div>

                {/* Cards  */}
                {/* First confirm recipies exists, then map  */}
                {/* <ResultList /> */}
                {recipes && recipes?.map((recipe: Recipe, key: any) => (
                    <div className="card mb-3" key={recipe.id.toString()}>
                        <img src={recipe?.image} className="card-img-top" alt="current recipe image" />
                        <div className="card-body">
                            <h5 className="card-title recipe-text">Title: {recipe?.title} </h5>
                            {/* <p>{recipe?.summary}</p> */}
                        </div>
                        <div className="card-body">
                            {/* TODO: link to details page */}
                            <button className="btn btn-light p card-link" onClick={() => dispatch(setRecipe(recipe))}>
                                <Link to={`/Search/Details/${recipe?.id}`} className="button-link" >Details..</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
};