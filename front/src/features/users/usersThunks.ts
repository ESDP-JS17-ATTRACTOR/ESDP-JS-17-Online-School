import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, User} from "../../../types";
import axiosApi from "../../../axiosApi";
import {RootState} from "../../../store";
import {unsetUser} from "@/features/users/usersSlice";

export const register = createAsyncThunk<User, RegisterMutation, {}>(
  'users/create',
  async (registerData) => {
    try {
      const response = await axiosApi.post('users/register', registerData);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
)

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/deleteSession',
  async (_, {dispatch}) => {
    await axiosApi.delete('/users/session');
    dispatch(unsetUser());
  }
)