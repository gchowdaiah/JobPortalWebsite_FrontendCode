import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateAdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/home" />;
  }

  // User is admin
  return children;
}

export default PrivateAdminRoute;
