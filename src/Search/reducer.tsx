import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    recipes: [],
    recipe: {},
    st: "",
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes: (state, action) => {
          state.recipes = action.payload;
          // console.log("printing from the reducer - recipes");
        },
        setRecipe: (state, action) => {
          state.recipe = action.payload;
          // console.log("printing from the reducer - recipe");
        },
        setST: (state, action) => {
          state.st = action.payload;
          // console.log("printing from the reducer - recipe");
        },
      },
    });
    
    export const { setRecipes, setRecipe, setST } = recipesSlice.actions;
    export default recipesSlice.reducer;

// const params = {

//     recipes: [],
// };

// const recipesReducer = (state = params, action: any) => {
//     switch (action.type) {
//         case 'SET_RECIPES':
//             return {
//                 ...state,
//                 recipes: action.payload
//             }
//         default:
//             return state;
//     }
// }
// export default recipesReducer;