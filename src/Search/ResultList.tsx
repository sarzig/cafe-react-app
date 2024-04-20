import { Key, useState } from "react";
import { setRecipes } from "./reducer";

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

function ResultList() {

    const [recipes] = useState<Recipe[]>([]);

    return (
        <>
            {recipes && recipes?.map((recipe: Recipe, index: any) => ( 
                <div className="card mb-3">
                    <img src={recipe?.image} className="card-img-top" alt="current recipe image"/>
                    <div className="card-body">
                        <h5 className="card-title recipe-text">Name: {recipe?.title} </h5>
                        {/* TODO: update to description or some such? */}
                        <p className="card-text recipe-text">Ingredients needed: </p>
                        <p className="card-text">
                            {recipe?.extendedIngredients.map((ingredient: 
                                                                { name: string;}, 
                                                                index: Key | null | undefined) => (
                                <span key={index}> {index != recipe?.extendedIngredients.length - 1 ? ingredient.name 
                                    + ", " : ingredient.name} 
                                </span>
                            ))}

                            {/* <p>{recipe?.summary}</p> */}
                        </p>
                    </div>
                    <div className="card-body">
                        {/* TODO: link to details page */}
                        <a href="#" className="card-link">Details..</a>
                    </div>
                </div>
            ))}
        </>
    );
}
export default ResultList;