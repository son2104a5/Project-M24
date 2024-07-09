import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../interface";

export const getAllCategories: any = createAsyncThunk(
    'categories/getAllcategories', async () => {
        const res = await axios.get("http://localhost:8080/categories")
        return res.data
    }
)

export const createCategory: any = createAsyncThunk(
    'categories/createCategory', async (category: Category) => {
        const res = await axios.post("http://localhost:8080/categories", category)
        return res.data
    }
)

export const updateCategory: any = createAsyncThunk(
    'categories/updateCategory', async (updatedCategory: Category) => {
        const res = await axios.put(`http://localhost:8080/categories/${updatedCategory.id}`, {
            ...updatedCategory,
            name: updatedCategory.name,
            updatedAt: new Date(),
        })
        return res.data
    }
)

export const deleteCategory: any = createAsyncThunk(
    'categories/deleteCategory', async (categoryId: number) => {
        const res = await axios.delete(`http://localhost:8080/categories/${categoryId}`)
        return res.data
    }
)