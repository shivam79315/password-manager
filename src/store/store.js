import { configureStore } from "@reduxjs/toolkit";
import orgReducer from '../features/superadmin/orgSlice';

export const store = configureStore({
    reducer: {
        organizations: orgReducer
    }
})