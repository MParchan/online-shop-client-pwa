import { Order } from "@/types/models/order.types";
import { api } from "../api";

interface CreateOrder {
    paymentMethod: string;
    customerName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    orderProducts: [{ product: string; quantity: number }];
}

export const ordersService = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], string | void>({
            query: (params) => {
                return `/orders?${params}`;
            },
            providesTags: ["UserOrders"]
        }),
        getOrderById: builder.query<Order, { id: string }>({
            query: ({ id }) => `/orders/${id}`
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: ({
                paymentMethod,
                customerName,
                email,
                phoneNumber,
                country,
                city,
                zipcode,
                street,
                orderProducts
            }) => ({
                url: "/orders",
                method: "POST",
                body: {
                    paymentMethod,
                    customerName,
                    email,
                    phoneNumber,
                    country,
                    city,
                    zipcode,
                    street,
                    orderProducts
                }
            }),
            invalidatesTags: ["UserOrders"]
        })
    })
});

export const { useGetOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation } = ordersService;
