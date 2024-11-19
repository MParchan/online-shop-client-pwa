import { api } from "../api";
import { Opinion } from "@/types/models/opinion.types";

export const opinionsService = api.injectEndpoints({
    endpoints: (builder) => ({
        getOpinions: builder.query<Opinion[], string | void>({
            query: (params) => {
                return `/opinions?${params}`;
            },
            providesTags: ["Opinions"]
        }),
        getOpinionById: builder.query<Opinion, { id: string }>({
            query: ({ id }) => `/opinions/${id}`
        }),
        createOpinion: builder.mutation<
            Opinion,
            { rating: number; description?: string; product: string }
        >({
            query: ({ rating, description, product }) => ({
                url: "/opinions",
                method: "POST",
                body: { rating, description, product }
            }),
            invalidatesTags: (result, error, { product }) => [
                "Opinions",
                { type: "Opinions", id: product }
            ]
        }),
        updateOpinion: builder.mutation<
            Opinion,
            { id: string; rating: number; description?: string; product: string }
        >({
            query: ({ id, rating, description, product }) => ({
                url: `/opinions/${id}`,
                method: "PUT",
                body: { rating, description, product }
            }),
            invalidatesTags: ["Opinions"]
        }),
        deleteOpinion: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/opinions/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Opinions"]
        })
    }),
    overrideExisting: false
});

export const {
    useGetOpinionsQuery,
    useGetOpinionByIdQuery,
    useCreateOpinionMutation,
    useUpdateOpinionMutation,
    useDeleteOpinionMutation
} = opinionsService;
