import React, { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Import Outlet
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children?: ReactNode; // Opsional jika pakai structure element={<ProtectedRoute>{children}</ProtectedRoute>
  allowedRoles?: ("admin" | "asesi" | "asesor")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.status_approval === "pending") {
    return <Navigate to="/waiting-approval" replace />;
  }

  if (user.status_approval === "rejected") {
    return <Navigate to="/unauthorized" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render Outlet untuk sibling routes di App.tsx
  return <Outlet />;
};

export default ProtectedRoute;