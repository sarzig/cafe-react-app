import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../Database";

const initialState = {
    users: users,
    user: { 
      _id: "",
      full_name: "",
      image: "",
      email: "",
      password: "",
      hometown: "",
      bio: "",
      interests: [],
      favorite_cafe_days: [],
      favorite_drinks: [],
      favorite_menu_items: [],
      favorite_recipes: [],
      role: "guest"
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