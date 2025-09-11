import { configureStore } from "@reduxjs/toolkit";
import orgReducer from '../features/superadmin/orgSlice';
import organizationReducer from '../features/organization/organizationSlice';

export const store = configureStore({
    reducer: {
        organizations: orgReducer,
        organization: organizationReducer
    }
})