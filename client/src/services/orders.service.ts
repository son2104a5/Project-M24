import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders: any = createAsyncThunk(
    'orders/getAllOrders', async () => {
        const res = await axios.get("http://localhost:8080/orders")
        return res.data
    }
)