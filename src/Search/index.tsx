import React, { JSXElementConstructor, Key, ReactElement, ReactNode, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css"
import e from 'express';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setRecipes,
} from './reducer';
import ResultList from './ResultList';
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

    // const [recipe, setRecipe] = useState<Recipe | undefined>();
    // const [recipes, setRecipes] = useState<Recipe[] | undefined>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    // const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipes, setRecipes] = useState([]);
    //const [recipes] = useState<Recipe[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getRecipes();
        // dispatch(setRecipes(recipes));
    //}, [recipes]);
    }, []);

        // const handleChange = (e: Recipe[]) => {
        //     setRecipes(e);
        // }

        // Link to Spoonacular Search API Documentation: https://spoonacular.com/food-api/docs#Get-Random-Recipes
        async function getRecipes() {
            try {
                // Victoria's temp free key
                // const apiKey = 'dcc4423567f24887b8e3d245061312f5';
                // const apiKey = '';
                const numberOfRecipes = 10;

                if (!searchTerm.trim()) return; // Check if search term is empty then do nothing if so

                //making spoonacular api call to get a random recipe
                // TODO: can we make this a random coffee recipe specifically?
                // let resp = await axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${numberOfRecipes}&query=${searchTerm}`);
                // console.log(resp.data);

                // //store the random recipe into the recipe variable
                // // setRecipes([]);
                // console.log(resp.data.results)
                // handleChange(resp.data.results); // TODO:This is where the problem is
                // // setRecipes(resp.data.results); // TODO:This is where the problem is
                // console.log(recipes); 

                // axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${numberOfRecipes}&query=${searchTerm}`)
                // .then(resp=> {
                //     console.log(resp.data);
                //     console.log(resp.data.results)
                //     // handleChange(resp.data.results); // TODO:This is where the problem is
                //     setRecipes(resp.data.results); // TODO:This is where the problem is
                //     console.log(recipes); 
                // })

                console.log("searchTerm:", searchTerm);

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
                console.log(resp.data);

                // let resp = await axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${numberOfRecipes}&query=${searchTerm}`);
                // let resp = await axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${searchTerm}`);
                console.log("resp.data:", resp.data);
                console.log("resp.data.results:", resp.data.results);
    
                //store the random recipe into the recipe variable
                setRecipes(resp.data.results);
                console.log("recipes:", recipes);
                } catch (e) {
                    console.log(e);
                }                

        }

    return (
        <>
        <div className="d-flex flex-column align-items-center justify-content-center">

            {/* Search bar and stuff  */}
            <div className="d-flex flex-row">
                <h3>Search Recipes</h3>
            </div>
            <div className="d-flex flex-row" id="search-bar">
                <form className="form-outline my-2 my-lg-6">
                    <input 
                        className="form-control my-2 my-sm-0 custom-search-input" 
                        type="search" 
                        placeholder="Latte Art" 
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
            {   recipes && recipes?.map((recipe: Recipe, key: any) => ( 
                    <div className="card mb-3" key={recipe.id.toString()}>
                        <img src={recipe?.image} className="card-img-top" alt="current recipe image"/>
                        <div className="card-body">
                            <h5 className="card-title recipe-text">Name: {recipe?.title} </h5>
                            {/* TODO: update to description or some such? */}
                            {/* <p className="card-text recipe-text">Ingredients needed: </p> */}
                            <p className="card-text">
                                {/* {recipe?.extendedIngredients.map((ingredient: 
                                                                    { name: string;}, 
                                                                    index: Key | null | undefined) => (
                                    <span key={index}> {index != recipe?.extendedIngredients.length - 1 ? ingredient.name 
                                        + ", " : ingredient.name} 
                                    </span>
                                ))} */}

                            </p>
                            <p>{recipe?.summary}</p>
                        </div>
                        <div className="card-body">
                            {/* TODO: link to details page */}
                            <Link to="/Details" ><button className="btn btn-light p card-link" >Details..</button> </Link>
                        </div>
                    </div>
                ))}
    </div>
    </>

    );
};