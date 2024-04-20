import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { setRecipe } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { WebsiteState } from "../../store";
import "../index.css"

export default function Details() {

    const { rid } = useParams();
    const { recipeId } = useParams();
    // const { recipe } = "";
    const dispatch = useDispatch();
    // const recipe = getRecipe();
    const recipe = useSelector((state: WebsiteState) => state.recipesReducer.recipe);
    console.log("recipe:", recipe);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
    }, []);

    async function getIngredients() {
        try {

            const options = {
                method: 'GET',
                url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${rid}/ingredientWidget.json`,
                headers: {
                    'X-RapidAPI-Key': '7a2a0058b9msh9b1cd6e240d6fbep1cbc4fjsn82e3f8b8474a',
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
            };

            const resp = await axios.request(options);
            console.log("ingredients data:", resp.data);
            setIngredients(resp.data.ingredients);
        } catch (e) {
            console.log(e);
        }                

    }

    return (
        <> 
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-100">
                    <img src={recipe.image} className="card-img-top" alt="current recipe image"/>
                        <div className="card-body">
                            <h5 className="card-title recipe-text">Title: {recipe.title} </h5>
                        {/* <p> Servings: {recipe.servings} </p>
                        <p> Ready in Minutes: {recipe.readyInMinutes} </p> */}
                        {/* <p> Ingredients: {recipe} </p> */}
                            {/* TODO: update to description or some such? */}
                            {/* <p className="card-text recipe-text">Ingredients needed: </p> */}
                            <h5> Ingredients needed: </h5>
                            <p className="card-text">
                                {ingredients.map((ingredient: any, index: any) => (
                                    <span key={index}> {ingredient.name} - </span>
                                ))}
                            </p>
                            {/* <p>{recipe?.summary}</p> */}
                            <h5> Recipe Fans: </h5>
                            <p className="card-text">
                                {ingredients.map((ingredient: any, index: any) => (
                                    <span key={index}> {ingredient.name} - </span>
                                ))}
                            </p>
                            <button className="btn btn-light p card-link" >
                                <Link to={`/Search`} >Return</Link>
                            </button>
                            <button className="btn btn-light p card-link" >
                                <Link to={recipe.sourceUrl} >Source</Link>
                            </button>
                            <button className="btn btn-light p card-link" >
                                <Link to={recipe.sourceUrl} >+ Favorite</Link>
                            </button>
                        </div>
                </div>
            </div>
        </>
    );
};