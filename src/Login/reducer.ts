import { createSlice } from "@reduxjs/toolkit";
import { accounts } from "../Database";

const initialState = {
    accounts: accounts,
    account: { 
        _id: "email@domain.com", 
        firstName: "First Name", 
        lastName: "Last Name",
        password: "Password",
        userRole: "guest",
        history: []
    }
};

const accountSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        addAccount: (state, action) => { //may need addtl refactoring with id ... check for errors when functionality is more present
          state.accounts = [
              { ...action.payload },
                ...state.accounts,
            ];
        },
        deleteAccount: (state, action) => {
          state.accounts = state.accounts.filter(
              (account) => account._id !== action.payload
          );
        },
        updateAccount: (state, action) => {
            state.accounts = state.accounts.map((account) => {
                if (account._id === action.payload._id) {
                  return action.payload;
                } else {
                  return account;
                }
              });
        },
        setAccount: (state, action) => {
            state.account = action.payload;
        },
    }
});

export const { addAccount, deleteAccount, updateAccount, setAccount } = accountSlice.actions;
export default accountSlice.reducer;