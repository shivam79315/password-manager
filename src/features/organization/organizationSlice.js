// features/organization/organizationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const storedOrgData = localStorage.getItem("orgAuth");
const orgData = storedOrgData ? JSON.parse(storedOrgData) : null;

const organizationSlice = createSlice({
    name : "organization",
    initialState : {
        users : [],
        orgData: {
            orgId: "xxxxxx",            // default ID
            orgEmail: "test@gmail.com", // default email
        },
    },
    reducers : {
        getOrganization : (state) => {
            state.orgData
        },
        saveOrganization : (state, action) => {
            state.orgData = action.payload;
            localStorage.setItem("orgAuth", JSON.stringify(action.payload));
        }
    },
})

export const { getOrganization, saveOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;