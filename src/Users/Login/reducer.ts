import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../Database";

const initialState = {
    users: users,
    user: { 
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
          state.users = [
              { ...action.payload },
                ...state.users,
            ];
        },
        deleteAccount: (state, action) => {
          state.users = state.users.filter(
              (user) => user._id !== action.payload
          );
        },
        updateAccount: (state, action) => {
            state.users = state.users.map((user) => {
                if (user._id === action.payload._id) {
                  return action.payload;
                } else {
                  return user;
                }
              });
        },
        setAccount: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { addAccount, deleteAccount, updateAccount, setAccount } = accountSlice.actions;
export default accountSlice.reducer;