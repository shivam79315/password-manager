import { Navigate } from "react-router-dom";

export default function OrgProtectedRoute({ children }) {
  const orgAuth = localStorage.getItem("orgAuth");

  if (!orgAuth) {
    return <Navigate to="/org/auth" replace />;
  }

  // optionally parse and check values
  const parsedAuth = JSON.parse(orgAuth);
  if (!parsedAuth?.orgId || !parsedAuth?.orgEmail) {
    return <Navigate to="/org/auth" replace />;
  }

  return children;
}