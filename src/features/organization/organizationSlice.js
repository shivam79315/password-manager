import { createSlice } from "@reduxjs/toolkit";

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    users: [],
    currentOrganization: null,
    loading: false,
    error: null
  },
  reducers: {
    setOrganization: (state, action) => {
      state.currentOrganization = action.payload;
    },
    clearOrganization: (state) => {
      state.currentOrganization = null;
    }
  }
});

export const { setOrganization, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
