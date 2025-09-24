// features/organization/organizationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase/firebase';

const storedOrgData = localStorage.getItem("orgAuth");
const orgData = storedOrgData ? JSON.parse(storedOrgData) : null;

// Fetch existing users
export const fetchUsers = createAsyncThunk(
    "organization/fetchUsers",
    async (orgId, thunkAPI) => {
        try {
            const userRef = collection(db, "organizations", orgId, "users");
            const snapshot = await getDocs(userRef);

            const users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            return users;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Add a new user
export const addOrgUser = createAsyncThunk(
    "organization/addOrgUser",
    async ({ orgId, userData }, thunkAPI) => {
        try {
            const hashedPassword = userData.password; // TODO: hash if needed
            const userRef = await addDoc(collection(db, "organizations", orgId, "users"), {
                ...userData,
                password: hashedPassword,
                createdAt: serverTimestamp(),
            });

            // Return user object with ID
            return { id: userRef.id, ...userData };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const organizationSlice = createSlice({
    name: "organization",
    initialState: {
        users: [],
        orgData: {
            orgId: "xxxxxx",            // default ID
            orgEmail: "test@gmail.com", // default email
        },
        loading: false,
        error: null,
    },
    reducers: {
        getOrganization: (state) => {
            state.orgData;
        },
        saveOrganization: (state, action) => {
            state.orgData = action.payload;
            localStorage.setItem("orgAuth", JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchUsers
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // addOrgUser
            .addCase(addOrgUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrgUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.unshift(action.payload);
            })
            .addCase(addOrgUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { getOrganization, saveOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;