import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
