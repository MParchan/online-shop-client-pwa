"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/libs/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor, persistStore } from "redux-persist";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<{ store: AppStore; persistor: Persistor }>();

  if (!storeRef.current) {
    const store = makeStore();
    const persistor = persistStore(store);
    storeRef.current = { store, persistor };
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
