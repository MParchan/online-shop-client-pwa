import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    _id: string;
    name: string;
    image: string | undefined;
    price: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
};

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item._id === newItem._id);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }

            state.totalQuantity += newItem.quantity;
            state.totalPrice += newItem.price * newItem.quantity;
        },
        removeFromCart(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            const existingItem = state.items.find((item) => item._id === itemId);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter((item) => item._id !== itemId);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
