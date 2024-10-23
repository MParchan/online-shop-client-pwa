import { Category } from "@/types/models/category.types";
import { api } from "../api";

export const categoriesService = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/categories",
            providesTags: ["Categories"]
        }),
        getCategoryById: builder.query<Category, { id: string }>({
            query: ({ id }) => `/categories/${id}`
        }),
        createCategory: builder.mutation<Category, { name: string }>({
            query: ({ name }) => ({
                url: "/categories",
                method: "POST",
                body: { name }
            }),
            invalidatesTags: ["Categories"]
        }),
        updateCategory: builder.mutation<Category, { id: string; name: string }>({
            query: ({ id, name }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body: { name }
            }),
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/categories/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        })
    }),
    overrideExisting: false
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesService;
