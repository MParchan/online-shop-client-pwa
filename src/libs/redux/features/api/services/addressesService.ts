import { Address } from "@/types/models/address.types";
import { api } from "../api";

interface CreateAddress {
    name: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
}

interface UpdateAddress {
    id: string;
    name: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
}

export const addressesService = api.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query<Address[], string | void>({
            query: (params) => {
                return `/addresses?${params}`;
            },
            providesTags: ["UserAddresses"]
        }),
        getAddressById: builder.query<Address, { id: string }>({
            query: ({ id }) => `/addresses/${id}`
        }),
        createAddress: builder.mutation<Address, CreateAddress>({
            query: ({ name, country, city, zipcode, street }) => ({
                url: "/addresses",
                method: "POST",
                body: { name, country, city, zipcode, street }
            }),
            invalidatesTags: ["UserAddresses"]
        }),
        updateAddress: builder.mutation<Address, UpdateAddress>({
            query: ({ id, name, country, city, zipcode, street }) => ({
                url: `/addresses/${id}`,
                method: "PUT",
                body: { name, country, city, zipcode, street }
            }),
            invalidatesTags: ["UserAddresses"]
        }),
        deleteAddress: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/addresses/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["UserAddresses"]
        })
    }),
    overrideExisting: false
});

export const {
    useGetAddressesQuery,
    useGetAddressByIdQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation
} = addressesService;
