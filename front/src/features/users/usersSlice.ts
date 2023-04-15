import {createSlice} from "@reduxjs/toolkit";
import {GlobalError, User} from "../../../types";
import {googleLogin, login} from "./usersThunks";
import {RootState} from "../../../store";

interface UserState {
    user: User | null,
    loginLoading: boolean,
    loginError: GlobalError | null
}

const initialState: UserState = {
    user: null,
    loginLoading: false,
    loginError: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });

        builder.addCase(googleLogin.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    }
});

export const usersReducer = usersSlice.reducer;

export const {unsetUser} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
