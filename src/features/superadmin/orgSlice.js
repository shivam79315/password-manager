// src/store/orgSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const fetchOrganizations = createAsyncThunk(
    "organizations/fetchOrganizations",
    async (_, thunkAPI) => {
        try{
            const querySnapShot = await getDocs(collection(db, "organizations"));
            const orgs = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return orgs;
        } catch(err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteOrganization = createAsyncThunk(
    "organizations/deleteOrganization",
    async (id, thunkAPI) => {
        try {
            alert(`${id} deleted`)
            await deleteDoc(doc(db, "organizations", id));
            return id;
        } catch (error) {
            alert('error')
            return thunkAPI.rejectWithValue(error.message);
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
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteOrganization.fulfilled, (state, action) => {
                state.items = state.items.filter((org) => org.id !== action.payload);
            })
            .addCase(deleteOrganization.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default orgSlice.reducer;