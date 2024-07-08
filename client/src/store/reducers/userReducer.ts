import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";
import { getAllUsers, getLockedUser } from "../../services/users.service";

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {})
      .addCase(getAllUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {})
      .addCase(getLockedUser.fulfilled, (state, action) => {
        return state.map((user: User) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
  },
});

export default usersSlice.reducer;
