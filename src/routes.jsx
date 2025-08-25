import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminLogin from "./pages/superadmin/Login";
import SuperAdminDashboard from "@/pages/superadmin/Dashboard";
import OrgUserLogin from "./pages/orgUser/Login";
import ProtectedRoute from "./pages/superadmin/ProtectedRoute";
import ViewOrganizations from "./pages/superadmin/ViewOrganizations";
import { store } from "./store/store";
import { Provider } from "react-redux";

// You can add more imports for other pages as needed

const AppRoutes = () => (
  <>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<OrgUserLogin />} />
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />

          <Route path="/superadmin/dashboard" element={
            <ProtectedRoute>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/superadmin/organizations" element={
            <ProtectedRoute>
              <Provider store={store}>
              <ViewOrganizations />
              </Provider>
            </ProtectedRoute>
          }
        />
    </Routes>
  </BrowserRouter> 
  </>
);

export default AppRoutes;
