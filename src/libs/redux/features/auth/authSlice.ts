import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const token = "";
            const decodedToken: { email: string } = jwtDecode(token);
            const userEmail = decodedToken.email;
            return { token, userEmail };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (
        credentials: { email: string; password: string; confirmPassword: string },
        { rejectWithValue }
    ) => {
        try {
            const data = null;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    token: null as string | null,
    userEmail: null as string | null,
    status: "idle",
    error: null as string | null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.userEmail = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.userEmail = action.payload.userEmail;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
