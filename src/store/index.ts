import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Users/Login/reducer";
import recipesReducer from "../Search/reducer";

export interface WebsiteState {
    usersReducer: {
        users: any[];
        user: any;
    }

    recipesReducer: {
        st: string;
        recipes: any[];
        recipe: any;
    }
}

const store = configureStore({
    reducer: {
        usersReducer,
        recipesReducer,
    },
});

export default store;