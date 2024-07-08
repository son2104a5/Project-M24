import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
