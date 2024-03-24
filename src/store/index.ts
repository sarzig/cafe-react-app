import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../Login/reducer";

export interface WebsiteState {
    accountsReducer: {
        accounts: any[];
        account: any;
    }
}

const store = configureStore({
    reducer: {
        accountsReducer,
    },
});

export default store;