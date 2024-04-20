import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../Login/reducer";
import recipesReducer from "../Search/reducer";

export interface WebsiteState {
    accountsReducer: {
        accounts: any[];
        account: any;
    }

    recipesReducer: {
        recipes: any[];
        recipe: any;
    }
}

const store = configureStore({
    reducer: {
        accountsReducer,
        recipesReducer,
    },
});

export default store;