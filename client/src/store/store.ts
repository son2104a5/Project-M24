import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import bannerReducer from "./reducers/bannerReducer";
import orderReducer from "./reducers/orderReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
    products: productReducer,
    banners: bannerReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
