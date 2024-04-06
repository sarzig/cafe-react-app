import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Users/Login/reducer";

export interface WebsiteState {
    usersReducer: {
        users: any[];
        user: any;
    }
}

const store = configureStore({
    reducer: {
        usersReducer,
    },
});

export default store;