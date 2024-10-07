import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: persistedCartReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ["persist/PERSIST"],
                    ignoredPaths: ["register"]
                }
            })
    });
};

export const persistor = persistStore(makeStore());
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
