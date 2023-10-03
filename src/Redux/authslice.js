import { createSlice } from "@reduxjs/toolkit";
const authslice = createSlice({
    name: "authslice",
    initialState: {
        status: false,
        UserData: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.UserData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.UserData = null;
        }

    }


});

export const { login, logout } = authslice.actions;
export default authslice.reducer;