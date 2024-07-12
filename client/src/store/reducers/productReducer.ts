import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interface";
import { addProduct, deleteProduct, getAllProducts, getProductByCategory, updateProduct } from "../../services/products.service";

const initialState: Product[] = []

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                return [...state, action.payload];
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                return state.map((product: Product) => product.id === action.payload.id? action.payload : product)
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                return state.filter((product: Product) => product.id!== action.payload.id);
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export default productsSlice.reducer