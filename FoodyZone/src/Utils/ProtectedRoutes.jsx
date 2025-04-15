import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); // Check if user is authenticated
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes
