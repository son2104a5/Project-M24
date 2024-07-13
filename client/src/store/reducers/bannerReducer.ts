import { createSlice } from "@reduxjs/toolkit"
import { getBanners } from "../../services/banners.service"

const initialState: any = []

const bannersSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.fulfilled, (state, action)=>{
                return state = action.payload
            })
            
    }
})

export default bannersSlice.reducer;