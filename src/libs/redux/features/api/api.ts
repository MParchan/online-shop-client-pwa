import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: getApiBaseUrl(),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Auth", "Categories", "Products", "Opinions", "UserOpinions", "UserAddresses"],
    endpoints: () => ({})
});
