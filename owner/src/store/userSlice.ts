import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import AuthService from '#services/AuthService';
import axios from 'axios';


import IUser from '#interfaces/IUser';
import { AuthResponse } from '#interfaces/response/AuthResponse';

import { API_URL } from '../http';

interface UserState {
    data: IUser;
    isAuth: boolean;
    isLoading: boolean;
}

const initialState: UserState = {
    data: {} as IUser,
    isAuth: false,
    isLoading: false,
};

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await AuthService.Login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const registration = createAsyncThunk(
    'user/registration',
    async ({ name, email, password }: { name: string, email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await AuthService.Registration(name, email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        await AuthService.Logout();
        localStorage.removeItem('token');
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.data = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.data = action.payload.user;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuth = true;
                state.data = action.payload.user;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.data = {} as IUser;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.data = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setAuth, setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
