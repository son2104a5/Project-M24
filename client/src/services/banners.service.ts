import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBanners: any = createAsyncThunk(
    'banners/getBanners', async () => {
        const res = await axios.get('http://localhost:8080/banners')
        return res.data;
    }
)