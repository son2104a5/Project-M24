import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../interface";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/categories.service";

const initialState: Category[] = []

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action)=>{
                return state = action.payload
            })
            .addCase(createCategory.fulfilled, (state, action)=>{
                return [...state, action.payload]
            })
            .addCase(updateCategory.fulfilled, (state, action)=>{
                return state.map((category: Category) => category.id === action.payload.id? action.payload : category)
            })
            .addCase(deleteCategory.fulfilled, (state, action)=>{
                return state.map((category: Category) => category.id === action.payload.id? action.payload : category)
            })
    }
})

export default categoriesSlice.reducer