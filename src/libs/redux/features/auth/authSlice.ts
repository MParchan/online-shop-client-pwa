import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { authService } from "../api/services/authService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, { rejectWithValue, dispatch }) => {
        try {
            const { login } = authService.endpoints;
            const result = await dispatch(login.initiate(credentials)).unwrap();
            const token = result.accessToken;
            const decodedToken: { user: { email: string } } = jwtDecode(token);
            const userEmail = decodedToken.user.email;
            return { token, userEmail };
        } catch (error) {
            console.log(error);
            if (typeof error === "object" && error !== null && "data" in error) {
                const fetchError = error as FetchBaseQueryError;
                const errorMessage =
                    fetchError.data &&
                    typeof fetchError.data === "object" &&
                    "message" in fetchError.data
                        ? (fetchError.data as { message: string }).message
                        : "Login error";
                return rejectWithValue(errorMessage);
            }
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("Login error");
            }
        }
    }
);

const initialState = {
    token: undefined as string | undefined,
    userEmail: undefined as string | undefined,
    isLogged: false,
    status: "logged out",
    error: undefined as string | undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = undefined;
            state.userEmail = undefined;
            state.isLogged = false;
            state.status = "logged out";
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.token = undefined;
                state.userEmail = undefined;
                state.isLogged = false;
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.userEmail = action.payload.userEmail;
                state.isLogged = true;
                state.status = "succeeded";
                state.error = undefined;
            })
            .addCase(login.rejected, (state, action) => {
                state.token = undefined;
                state.userEmail = undefined;
                state.isLogged = false;
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
