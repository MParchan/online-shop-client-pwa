import { api } from "../api";

export const authService = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            })
        }),
        register: builder.mutation<
            void,
            { email: string; password: string; confirmPassword: string }
        >({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials
            })
        })
    }),
    overrideExisting: false
});

export const { useRegisterMutation } = authService;
