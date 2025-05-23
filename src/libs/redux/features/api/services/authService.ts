import { User } from "@/types/models/user.types";
import { api } from "../api";

interface RegisterBody {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const authService = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["Auth"]
        }),
        register: builder.mutation<void, RegisterBody>({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials
            })
        }),
        getUserInfo: builder.query<User, void>({
            query: () => "/auth/user",
            providesTags: ["Auth"]
        })
    }),
    overrideExisting: false
});

export const { useLoginMutation, useRegisterMutation, useGetUserInfoQuery } = authService;
