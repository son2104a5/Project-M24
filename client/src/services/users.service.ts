import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../interface";

export const getAllUsers: any = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    const res = await axios.get("http://localhost:8080/users");
    return res.data;
  }
);

export const getLockedUser: any = createAsyncThunk(
  "users/getLockedUser",
  async (user: User) => {
    const res = await axios.patch(`http://localhost:8080/users/${user.id}`, {
      ...user,
      status: !user.status
    });
    return res.data;
  }
)