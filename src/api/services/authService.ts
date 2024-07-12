import { axiosInstance, setAuthToken } from "../axiosInstane";

const authService = {
    register: async (credentials: { email: string; password: string; confirmPassword: string }) => {
        try {
            const response = await axiosInstance.post("/auth/register", credentials);
            return response.data;
        } catch (error) {
            console.error("Error registration:", error);
            throw error;
        }
    },

    login: async (credentials: { email: string; password: string }) => {
        try {
            const response = await axiosInstance.post("/auth/login", credentials);
            const token = response.data;
            localStorage.setItem("accessToken", token);
            setAuthToken(token);
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
};

export default authService;
