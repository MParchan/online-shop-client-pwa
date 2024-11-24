import { Middleware } from "@reduxjs/toolkit";
import { api } from "../features/api/api";
import { logout } from "../features/auth/authSlice";

export const invalidateTagsMiddleware: Middleware = (store) => (next) => (action) => {
    if (logout.match(action)) {
        store.dispatch(api.util.invalidateTags(["UserOpinions"]));
    }
    return next(action);
};
