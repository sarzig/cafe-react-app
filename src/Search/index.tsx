import { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css"

// REF for initial code format/idea: https://www.youtube.com/watch?v=y68g_vYskGs but modified to fit our project

export default function Search() {

    const [recipe, setRecipe] = useState<Recipe | undefined>();

        // Link to Spoonacular Search API Documentation: https://spoonacular.com/food-api/docs#Get-Random-Recipes
        async function getRandomRecipe() {
            try {
            // Victoria's temp free key
            // const apiKey = 'dcc4423567f24887b8e3d245061312f5';
            const apiKey = '';

            //making spoonacular api call to get a random recipe
            // TODO: can we make this a random coffee recipe specifically?
            let resp = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
            console.log(21, resp.data);

            //store the random recipe into the recipe variable
            setRecipe(resp.data.recipes[0]);
            } catch (e) {
            console.log(e);
            }

        }

        useEffect(() => {
            getRandomRecipe();
        }, []);

        interface Recipe {
            title: string;
            sourceUrl: string;
            image: string;
            extendedIngredients: {
                name: string;
            }[];
            analyzedInstructions: {
                steps: {
                    step: string;
                }[];
            }[];
            summary: string;
        }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">

        {/* Search bar and stuff  */}
        <div className="d-flex flex-row">
            <h3>Search Recipies</h3>
        </div>
        <div className="d-flex flex-row" id="search-bar">
            <form className="form-outline my-2 my-lg-6">
                <input className="form-control my-2 my-sm-0 custom-search-input" type="search" placeholder="Latte Art" aria-label="Search"/>
                {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            </form>
            <button className="btn btn-light" onClick={getRandomRecipe}> Search </button>
        </div>
        {/* TODO: Make same width as search bar(?) */}
        <div className="d-flex flex-row" id="search-bar">
            <button className="btn btn-light p" onClick={getRandomRecipe}> Generate New Random Recipe </button>
        </div>

        {/* Cards  */}
        <div className="card mb-3">
            <img src={recipe?.image} className="card-img-top" alt="current recipe image"/>
            <div className="card-body">
                <h5 className="card-title recipe-text">Name: {recipe?.title} </h5>
                {/* TODO: update to description or some such? */}
                <p className="card-text recipe-text">Ingredients needed: </p>
                <p className="card-text">
                    {recipe?.extendedIngredients.map((ingredient, index) =>
                        <span key={index}> {index != recipe?.extendedIngredients.length - 1 ? ingredient.name + ", " : ingredient.name} </span>
                    )}

                    {/* <p>{recipe?.summary}</p> */}
                </p>
            </div>
            <div className="card-body">
                {/* TODO: link to details page */}
                <a href="#" className="card-link">Details..</a>
            </div>
        </div>
    </div>

    );
};