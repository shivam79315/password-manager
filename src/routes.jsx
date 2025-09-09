import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminLogin from "./pages/superadmin/Login";
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import OrgUserLogin from "./pages/orgUser/Login";
import ProtectedRoute from "./pages/superadmin/ProtectedRoute";
import OrgProtectedRoute from "./pages/organization/Auth/ProtectedRoute";
import Auth from "./pages/organization/Auth/Auth";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Dashboard from "./pages/organization/Front/Dashboard";

const NotFound = () => <h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>;

const AppRoutes = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrgUserLogin />} />

        {/* Admin routes */}
        <Route path="/sa/login" element={<SuperAdminLogin />} />
        <Route
          path="/sa/dashboard"
          element={
            <ProtectedRoute>
              <Provider store={store}>
                <SuperAdminDashboard />
              </Provider>
            </ProtectedRoute>
          }
        />

        {/* Organization routes */}
        <Route path="/org/auth" element={<Auth />} />
        <Route
          path="/org/dashboard"
          element={
            <OrgProtectedRoute>
              <Dashboard />
            </OrgProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default AppRoutes;
