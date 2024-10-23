import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import authReducer from "../redux/features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storageEngine from "./storageEngine";
import { api } from "./features/api/api";

const authPersistConfig = {
    key: "auth",
    storage: storageEngine
};
const cartPersistConfig = {
    key: "cart",
    storage: storageEngine
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: persistedAuthReducer,
            cart: persistedCartReducer,
            [api.reducerPath]: api.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ["persist/PERSIST"],
                    ignoredPaths: ["register"]
                }
            }).concat(api.middleware)
    });
};

export const persistor = persistStore(makeStore());
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
