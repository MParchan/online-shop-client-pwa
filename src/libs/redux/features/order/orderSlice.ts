import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderData = {
    customerName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipcode: string;
    street: string;
    paymentMethod: string;
};

const initialState: OrderData = {
    customerName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    zipcode: "",
    street: "",
    paymentMethod: ""
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderData(_, action: PayloadAction<OrderData>) {
            return action.payload;
        },
        clearOrderData(state) {
            state.customerName = "";
            state.email = "";
            state.phoneNumber = "";
            state.country = "";
            state.city = "";
            state.zipcode = "";
            state.street = "";
            state.paymentMethod = "";
        }
    }
});

export const { setOrderData, clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
