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
            })
        }),
        register: builder.mutation<void, RegisterBody>({
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
