import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // modules: modules,
    recipes: [],
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes: (state, action) => {
          state.recipes = action.payload;
          console.log("printing from the reducer");
        },
      },
    });
    
    export const { setRecipes } = recipesSlice.actions;
    export default recipesSlice.reducer;