import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isSuperAdmin") === "true";

  return isLoggedIn ? children : <Navigate to="/superadmin/login" replace />;
}