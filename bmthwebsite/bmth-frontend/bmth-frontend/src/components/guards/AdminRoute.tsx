import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/store/user/AuthContext";

type AdminRouteProps = {
  children: React.ReactElement;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { auth } = useAuth();

  if (auth.loading) return null;
  if (!auth.user) return <Navigate to="/login" replace />;
  if (auth.user.role !== "Admin") return <Navigate to="/account" replace />;

  return children;
}
