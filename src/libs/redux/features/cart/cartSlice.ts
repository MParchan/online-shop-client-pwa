import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    _id: string;
    name: string;
    image: string | undefined;
    price: number;
    quantity: number;
};

export type CartState = {
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
        updateQuantity(state, action: PayloadAction<{ _id: string; quantity: number }>) {
            const { _id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item._id === _id);

            if (existingItem && quantity > 0) {
                const quantityDifference = quantity - existingItem.quantity;
                state.totalQuantity += quantityDifference;
                state.totalPrice += quantityDifference * existingItem.price;
                existingItem.quantity = quantity;
            } else if (existingItem && quantity === 0) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter((item) => item._id !== _id);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
