import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Product } from "../interface";

export const getAllProducts: any = createAsyncThunk(
    'products/getAllProducts', async () => {
        const res = await axios.get("http://localhost:8080/products")
        return res.data
    }
)

export const getProductByCategory: any = createAsyncThunk(
    'products/getProductByCategory', async (categoryId: string) => {
        const res = await axios.get(`http://localhost:8080/products?categoryId=${categoryId}`)
        return res.data
    }
)

export const getProductById: any = createAsyncThunk(
    'products/getProductById', async (productId: number) => {
        const res = await axios.get(`http://localhost:8080/products/${productId}`)
        return res.data
    }
)

export const addProduct: any = createAsyncThunk(
    'products/addProduct', async (product: Product) => {
        const res = await axios.post("http://localhost:8080/products", product)
        return res.data
    }
)

export const updateProduct: any = createAsyncThunk(
    'products/updateProduct', async (updatedProduct: Product) => {
        const res = await axios.patch(`http://localhost:8080/products/${updatedProduct.id}`, updatedProduct)
        return res.data
    }
)

export const deleteProduct: any = createAsyncThunk(
    'products/deleteProduct', async (productId: number) => {
        await axios.delete(`http://localhost:8080/products/${productId}`)
        const res: AxiosResponse = await axios.get(`http://localhost:8080/products`)
        return res.data
    }
)