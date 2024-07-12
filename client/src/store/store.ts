import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
