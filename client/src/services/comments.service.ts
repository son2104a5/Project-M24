import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllComments: any = createAsyncThunk(
    'comments/getAllComments', async () => {
        const res = await axios.get("http://localhost:8080/comments")
        return res.data
    }
)