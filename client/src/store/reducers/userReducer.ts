import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";
import { getAllUsers, getHasLoginUser, getLockedUser, updateCartItem, updatedUser } from "../../services/users.service";

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        return state = action.payload;
      })
      .addCase(getLockedUser.fulfilled, (state, action) => {
        return state.map((user: User) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updatedUser.fulfilled, (state, action) => {
        return state.map((user: User) => user.id === action.payload.id? action.payload : user);
      })
      .addCase(getHasLoginUser.fulfilled, (state, action) => {
        return state.map((user: User) => user.id === action.payload.id? action.payload : user);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        return state.map((user: User) => user.id === action.payload.id? action.payload : user);
      })
  },
});

export default usersSlice.reducer;
