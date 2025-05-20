import { Order } from "@/types/models/order.types";
import { api } from "../api";

interface GetOrdersResponse {
    orders: Order[];
    orderCount: number;
}

interface CreateOrder {
    paymentMethod: string;
    customerName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    orderProducts: { product: string; quantity: number }[];
}

export const ordersService = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<GetOrdersResponse, string | void>({
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
        }),
        getAllOrders: builder.query<GetOrdersResponse, string | void>({
            query: (params) => {
                return `/orders/admin/all?${params}`;
            },
            providesTags: ["UserOrders"]
        }),
        getOrderDetails: builder.query<Order, { id: string }>({
            query: ({ id }) => `/orders/admin/${id}/details`,
            providesTags: (result, error, { id }) => [{ type: "UserOrders", id }]
        }),
        changeOrderStatus: builder.mutation<Order, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/orders/admin/${id}/status`,
                method: "PATCH",
                body: { status: status }
            }),
            invalidatesTags: (result, error, { id }) => [
                "UserOrders",
                { type: "UserOrders", id: id }
            ]
        })
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useGetOrderDetailsQuery,
    useChangeOrderStatusMutation
} = ordersService;
