import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories: any = createAsyncThunk(
    'categories/getAllcategories', async () => {
        const res = await axios.get("http://localhost:8080/categories")
        return res.data
    }
)