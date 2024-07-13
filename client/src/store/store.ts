import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import bannerReducer from "./reducers/bannerReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
    products: productReducer,
    banners: bannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
