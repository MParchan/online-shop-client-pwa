import { Product } from "@/types/models/product.types";
import { api } from "../api";
import { BrandCount } from "@/types/brandCount.types";
import { PropertyCount } from "@/types/propertyCount.types";
import { Opinion } from "@/types/models/opinion.types";

interface GetProductsResponse {
    products: Product[];
    brands: BrandCount[];
    properties: PropertyCount[];
    productCount: number;
}

export const productsService = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, string | void>({
            query: (params) => {
                return `/products?${params}`;
            },
            providesTags: ["Products"]
        }),
        getProductById: builder.query<Product, { id: string }>({
            query: ({ id }) => `/products/${id}`
        }),
        createProduct: builder.mutation<Product, { name: string }>({
            query: ({ name }) => ({
                url: "/products",
                method: "POST",
                body: { name }
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation<Product, { id: string; name: string }>({
            query: ({ id, name }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: { name }
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"]
        }),
        getProductOpinions: builder.query<Opinion[], { id: string }>({
            query: ({ id }) => `/products/${id}/opinions`,
            providesTags: (result, error, { id }) => [{ type: "Opinions", id }]
        })
    }),
    overrideExisting: false
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useLazyGetProductsQuery,
    useGetProductOpinionsQuery
} = productsService;
