import { createSlice } from "@reduxjs/toolkit"
import { Order } from "../../interface"
import { addProductToOrder, getAllOrders, updateOrderStatus } from "../../services/orders.service"

const initialState: Order[] = []

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.fulfilled, (state, action) => {
                return state = action.payload;
            })
            .addCase(addProductToOrder.fulfilled, (state, action) => {
                return [...state, action.payload];
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                return state.map((order: Order) =>
                    order.id === action.payload.id? action.payload : order
                );
            })
    }
})

export default ordersSlice.reducer;