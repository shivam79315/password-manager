// src/store/orgSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const fetchOrganizations = createAsyncThunk(
    "organizations/fetchOrganizations",
    async (_, thunkAPI) => {
        try{
            const querySnapShot = await getDocs(collection(db, "organizations"));
            const orgs = querySnapShot.docs.map((doc) => ({
                orgId: doc.id,
                ...doc.data()
            }));
            return orgs;
        } catch(err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const orgSlice = createSlice({
    name : "organizations",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers : {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchOrganizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchOrganizations.rejected, (state) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default orgSlice.reducer;