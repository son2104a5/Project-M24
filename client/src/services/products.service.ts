import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts: any = createAsyncThunk(
    'products/getAllProducts', async () => {
        const res = await axios.get("http://localhost:8080/products")
        return res.data
    }
)