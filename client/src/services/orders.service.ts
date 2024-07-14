import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "../interface";

export const getAllOrders: any = createAsyncThunk(
    'orders/getAllOrders', async () => {
        const res = await axios.get("http://localhost:8080/orders")
        return res.data
    }
)

export const addProductToOrder: any = createAsyncThunk(
    'orders/addProductToOrder', async (order: Order) => {
        const res = await axios.post(`http://localhost:8080/orders/`, order)
        return res.data
    }
)

export const updateOrderStatus: any = createAsyncThunk(
    'orders/updateOrderStatus', async (data: Order) => {
        const res = await axios.put(`http://localhost:8080/orders/${data.id}`, data)
        return res.data
    }
)