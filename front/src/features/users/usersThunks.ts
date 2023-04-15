import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginMutation, User, UserResponse} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";


export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<UserResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw (e);
        }
    }
);

export const googleLogin = createAsyncThunk<User, string, {rejectValue: GlobalError}>(
    'users/googleLogin',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('users/google', {credential});
            return response.data.user;

        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw (e);
        }
    }
);

